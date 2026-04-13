import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Users, Layers, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRegistration } from "@/context/RegistrationContext";
import { useTranslation } from "@/hooks/useTranslation";
import { STATS_VALUES } from "@/lib/statsConstants";
import heroBanner from "@/assets/hero-banner.jpg";
import schoolLogo from "@/assets/school-logo.png";

const EVENT_DATE = new Date("2026-04-30T10:00:00");

const useCountdown = (target: Date) => {
  const calc = () => {
    const diff = target.getTime() - Date.now();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(calc());
    }, 1000);

    return () => clearInterval(id);
  }, [target]);

  return time;
};

export const HeroSection = () => {
  const countdown = useCountdown(EVENT_DATE);
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, 300]);
  const t = useTranslation();

  const floatDelay = [0, 0.5, 1, 1.5];

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-40 sm:pt-48">
      <motion.img src={heroBanner} alt="Students group photo" width={1920} height={768} className="absolute inset-0 h-[120%] w-full object-cover" style={{ y: imgY }} />
      <div className="absolute inset-0 hero-gradient opacity-85" />
      <div className="absolute inset-0 geometric-pattern opacity-40" />
      <div className="container relative z-10 px-4 py-32 text-center">
        {/* <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
            <CalendarDays className="h-4 w-4" /> April 15, 2026
          </span>
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0 }}
          className="flex justify-center -mt-24 mb-0"
        >
          <img src={schoolLogo} alt="School Logo" className="h-48 w-48 object-contain drop-shadow-lg" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-0 font-display text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          বালিহারী মাধ্যমিক বিদ্যালয়
          <br />
          <span className="text-gradient-gold">ঈদ পুনর্মিলনী - ২০২৬</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80"
        >        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {(["days", "hours", "minutes", "seconds"] as const).map((unit, i) => (
            <motion.div
              key={unit}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: floatDelay[i] }}
              className="flex flex-col items-center rounded-xl border border-primary-foreground/10 bg-primary-foreground/10 px-5 py-3 backdrop-blur-sm"
            >
              <span className="font-display text-3xl font-bold text-primary-foreground">{countdown[unit]}</span>
              <span className="text-xs uppercase tracking-wider text-primary-foreground/60">{t.hero.countdown[unit]}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Registration Stats in Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-8 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 px-10 py-10 backdrop-blur-md"
        >
          {[
            { icon: Users, label: t.hero.stats.registered, value: STATS_VALUES.totalRegistered },
            { icon: Layers, label: t.hero.stats.batches, value: STATS_VALUES.batchesParticipating },
            { icon: UserCheck, label: t.hero.stats.paid, value: STATS_VALUES.paidMembers },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-3">
              <s.icon className="h-10 w-10 text-secondary" />
              <div className="text-center">
                <div className="font-display text-5xl font-bold leading-none text-primary-foreground">{s.value}</div>
                <div className="text-sm text-primary-foreground/60">{s.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}>
          <Button asChild size="lg" className="mt-10 gold-gradient border-0 text-foreground font-semibold shadow-gold hover:opacity-90 transition-opacity text-base px-8 py-6">
            <a href="#register">
              {t.hero.registerButton} <ArrowDown className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
