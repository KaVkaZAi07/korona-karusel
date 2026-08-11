import { useEffect, useRef } from "react";
import Hls from "hls.js";

export function useHls(src: string) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Mobile HTML5 video attributes
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.volume = 0;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("muted", "true");

    let hls: Hls | null = null;

    const startPlay = () => {
      if (video) {
        const p = video.play();
        if (p !== undefined) {
          p.catch((err) => {
            console.warn("Autoplay deferred:", err);
          });
        }
      }
    };

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: false, // CRITICAL FOR MOBILE: Prevents WebWorker CORS security errors on http local IP
        lowLatencyMode: false,
        backBufferLength: 90,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        startPlay();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // iOS Safari native HLS
      video.src = src;
      video.addEventListener("loadedmetadata", startPlay);
      startPlay();
    }

    // Interaction fallback for strict mobile devices
    const triggerPlay = () => {
      if (video && video.paused) {
        startPlay();
      }
    };

    window.addEventListener("touchstart", triggerPlay, { passive: true });
    window.addEventListener("pointerdown", triggerPlay, { passive: true });
    window.addEventListener("scroll", triggerPlay, { passive: true });
    window.addEventListener("click", triggerPlay, { passive: true });

    return () => {
      if (hls) {
        hls.destroy();
      }
      video.removeEventListener("loadedmetadata", startPlay);
      window.removeEventListener("touchstart", triggerPlay);
      window.removeEventListener("pointerdown", triggerPlay);
      window.removeEventListener("scroll", triggerPlay);
      window.removeEventListener("click", triggerPlay);
    };
  }, [src]);

  return videoRef;
}
