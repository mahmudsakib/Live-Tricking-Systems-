import { motion } from "framer-motion";
import { ArrowDown, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import heroBanner from "@/assets/hero-banner.jpg";

const EVENT_DATE = new Date("2026-04-15T10:00:00");

const useCountdown = (target: Date) => {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};

export const HeroSection = () => {
  const countdown = useCountdown(EVENT_DATE);
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, 300]);

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <motion.img src={heroBanner} alt="Students group photo" width={1920} height={768} className="absolute inset-0 h-[120%] w-full object-cover" style={{ y: imgY }} />
      <div className="absolute inset-0 hero-gradient opacity-85" />
      <div className="absolute inset-0 geometric-pattern opacity-40" />
      <div className="container relative z-10 px-4 py-32 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
            <CalendarDays className="h-4 w-4" /> April 15, 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-6 font-display text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Balihari Madhyamik Vidyalay
          <br />
          <span className="text-gradient-gold">Eid Reunion 2026</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80"
        >
          Reconnect with old friends, relive golden memories, and celebrate the spirit of togetherness this Eid. Your school family awaits!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
            <div key={unit} className="flex flex-col items-center rounded-xl bg-primary-foreground/10 px-5 py-3 backdrop-blur-sm">
              <span className="font-display text-3xl font-bold text-primary-foreground">{countdown[unit]}</span>
              <span className="text-xs uppercase tracking-wider text-primary-foreground/60">{unit}</span>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
          <Button asChild size="lg" className="mt-10 gold-gradient border-0 text-foreground font-semibold shadow-gold hover:opacity-90 transition-opacity text-base px-8 py-6">
            <a href="#register">
              Register Now <ArrowDown className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
