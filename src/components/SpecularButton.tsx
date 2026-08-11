import React, { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle, Color } from "ogl";
import "./SpecularButton.css";

const PAD = 20;

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uThickness;
uniform float uBaseWidth;

out vec4 fragColor;

float sdRoundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float shapeSDF(vec2 p) { return sdRoundedRect(p, uHalfSize, uRadius); }

float gaussianLine(float d, float sigma) {
  float x = d / (sigma + 1e-6);
  float k = mix(1.0, 1.6, smoothstep(0.0, 1.5, x));
  return exp(-k * x * x);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = shapeSDF(p);

  // Light direction vector
  vec2 L = vec2(cos(uAngle), sin(uAngle));

  // Base ambient stroke
  float base = (1.0 - smoothstep(0.0, uBaseWidth * 2.0, abs(d))) * 0.35;

  // Normalized direction vector from center
  vec2 dir = normalize(p + 1e-6);

  // Sharp rotating neon spotlight streak
  float cosDiff = dot(dir, L);
  float streak = pow(max(0.0, cosDiff), 3.5);

  // Border SDF line
  float line = gaussianLine(d, uThickness * 1.5);
  float edgeClamp = 1.0 - smoothstep(0.0, 5.0 * uPx, abs(d));

  // Neon beam highlight (scales with uIntensity)
  float hi = line * streak * edgeClamp * uIntensity * 2.5;

  // Ambient outer neon halo
  float halo = (1.0 - smoothstep(0.0, 15.0 * uPx, abs(d))) * streak * uIntensity * 0.5;

  vec3 col = uBaseColor * base + uLineColor * (hi + halo);
  float alpha = clamp(base + hi + halo, 0.0, 1.0);

  fragColor = vec4(col * alpha, alpha);
}
`;

export interface SpecularButtonProps {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  id?: string;
}

export default function SpecularButton({
  children = "Get Started",
  size = "lg",
  radius = 18,
  tint = "#ffffff",
  tintOpacity = 0,
  blur = 0,
  textColor = "#ffffff",
  lineColor = "#89AACC",
  baseColor = "#4E85BF",
  intensity = 2,
  thickness = 1.5,
  speed = 0.5,
  followMouse = true,
  autoAnimate = false,
  disabled = false,
  onClick,
  className = "",
  type = "button",
  id,
}: SpecularButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const fxRef = useRef<HTMLSpanElement>(null);
  const propsRef = useRef({
    radius,
    lineColor,
    baseColor,
    intensity,
    thickness,
    speed,
    followMouse,
    autoAnimate,
  });

  propsRef.current = {
    radius,
    lineColor,
    baseColor,
    intensity,
    thickness,
    speed,
    followMouse,
    autoAnimate,
  };

  useEffect(() => {
    const btn = btnRef.current;
    const fx = fxRef.current;
    if (!btn || !fx) return;

    const dpr = window.devicePixelRatio || 1;
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true, dpr });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const geometry = new Triangle(gl);
    if ((geometry.attributes as Record<string, unknown>).uv) {
      delete (geometry.attributes as Record<string, unknown>).uv;
    }

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uCenter: { value: [0, 0] },
        uHalfSize: { value: [1, 1] },
        uRadius: { value: 0 },
        uAngle: { value: 2.4 },
        uPx: { value: dpr },
        uLineColor: { value: [0.53, 0.66, 0.8] },
        uBaseColor: { value: [0.3, 0.52, 0.75] },
        uIntensity: { value: 0 },
        uThickness: { value: 1.5 },
        uBaseWidth: { value: dpr },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    fx.appendChild(gl.canvas);

    const sizeRef = { w: 1, h: 1 };
    const resize = () => {
      const rect = btn.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      sizeRef.w = w;
      sizeRef.h = h;
      renderer.setSize(w + PAD * 2, h + PAD * 2);
      program.uniforms.uCenter.value = [(PAD + w / 2) * dpr, (PAD + h / 2) * dpr];
      program.uniforms.uHalfSize.value = [(w / 2) * dpr, (h / 2) * dpr];
    };
    const ro = new ResizeObserver(resize);
    ro.observe(btn);
    resize();

    let pointerAngle: number | null = null;
    let isDirectlyHovered = false;

    // Track pointer ONLY when cursor is DIRECTLY inside button bounds
    const onPointerMove = (e: PointerEvent) => {
      const rect = btn.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        isDirectlyHovered = true;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const nx = (e.clientX - cx) / (rect.width / 2);
        const ny = (cy - e.clientY) / (rect.height / 2);
        pointerAngle = Math.atan2(2 / rect.height, -2 / rect.width) + nx * 0.4 + ny * 0.2;
      } else {
        isDirectlyHovered = false;
        pointerAngle = null;
      }
    };

    const onPointerLeave = () => {
      isDirectlyHovered = false;
      pointerAngle = null;
    };

    window.addEventListener("pointermove", onPointerMove);
    btn.addEventListener("pointerleave", onPointerLeave);
    btn.addEventListener("mouseleave", onPointerLeave);

    let angle = 2.4;
    let idleAngle = 2.4;
    let currentIntensity = 0;
    let last = performance.now();
    let raf = 0;

    const lineC = new Color();
    const baseC = new Color();

    const update = (now: number) => {
      raf = requestAnimationFrame(update);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const p = propsRef.current;

      // Only animate angle when hovered or autoAnimate
      if (isDirectlyHovered || p.autoAnimate) {
        idleAngle += p.speed * dt * 2;
      }
      const steer = p.followMouse && pointerAngle != null && isDirectlyHovered;
      const target = steer ? (pointerAngle ?? idleAngle) : idleAngle;
      const diff = ((target - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      angle += diff * (1 - Math.exp(-dt * 12));

      // Light beam ONLY activates when directly hovered or autoAnimate!
      const targetIntensity = isDirectlyHovered || p.autoAnimate ? p.intensity : 0;
      currentIntensity += (targetIntensity - currentIntensity) * (1 - Math.exp(-dt * 10));

      lineC.set(p.lineColor);
      baseC.set(p.baseColor);
      program.uniforms.uAngle.value = angle;
      program.uniforms.uRadius.value = Math.min(p.radius, Math.min(sizeRef.w, sizeRef.h) / 2) * dpr;
      program.uniforms.uLineColor.value = [lineC.r, lineC.g, lineC.b];
      program.uniforms.uBaseColor.value = [baseC.r, baseC.g, baseC.b];
      program.uniforms.uIntensity.value = currentIntensity;
      program.uniforms.uThickness.value = p.thickness * dpr;
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      btn.removeEventListener("pointerleave", onPointerLeave);
      btn.removeEventListener("mouseleave", onPointerLeave);
      if (gl.canvas.parentNode === fx) fx.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <button
      ref={btnRef}
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`specular-button specular-button--${size}${className ? ` ${className}` : ""}`}
      style={
        {
          "--sb-radius": `${radius}px`,
          "--sb-tint": tint,
          "--sb-tint-opacity": tintOpacity,
          "--sb-blur": `${blur}px`,
          "--sb-text-color": textColor,
        } as React.CSSProperties
      }
    >
      <span ref={fxRef} className="specular-button__fx" aria-hidden="true" />
      <span className="specular-button__label">{children}</span>
    </button>
  );
}
