import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const stats = [
  {
    id: "stat-sizes",
    value: 36,
    prefix: "16-",
    suffix: "",
    label: "Размерный ряд обуви",
  },
  {
    id: "stat-models",
    value: 1000,
    prefix: "",
    suffix: "+",
    label: "Моделей в наличии",
  },
  {
    id: "stat-dispatch",
    value: 24,
    prefix: "",
    suffix: "ч",
    label: "Отгрузка со склада",
  },
];

function AnimatedStat({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (inView) {
      motionValue.set(0);
      setTimeout(() => {
        motionValue.set(value);
      }, 50);
    } else {
      motionValue.set(0);
    }
  }, [inView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}0{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="flex items-center gap-3 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">
            В цифрах
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stroke">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              id={stat.id}
              className="bg-bg p-10 md:p-14 flex flex-col gap-3 group hover:bg-surface/30 transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: "easeOut",
              }}
            >
              <div className="text-5xl md:text-7xl font-display italic text-text-primary leading-none group-hover:scale-105 transition-transform duration-300 origin-left">
                <AnimatedStat
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-sm text-muted uppercase tracking-[0.15em] mt-1">
                {stat.label}
              </p>
              {/* Accent bar with hover expansion */}
              <div className="w-12 group-hover:w-24 h-[2px] accent-gradient mt-2 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
