import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Heart } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export const EventSection = () => {
  const t = useTranslation();

  const details = [
    { icon: Calendar, label: t.event.date, value: t.event.dateValue },
    { icon: Clock, label: t.event.time, value: t.event.timeValue },
    { icon: MapPin, label: t.event.venue, value: t.event.venueValue },
  ];

  return (
    <section id="event" className="py-20 bg-blue-50">
      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{t.event.header}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {t.event.description}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {details.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-gradient rounded-xl border border-border p-8 shadow-elegant text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <d.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{d.label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
