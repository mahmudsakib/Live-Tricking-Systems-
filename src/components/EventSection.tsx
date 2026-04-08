import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Heart } from "lucide-react";

const details = [
  { icon: Calendar, label: "Date", value: "April 15, 2026 (Wednesday)" },
  { icon: Clock, label: "Time", value: "10:00 AM – 6:00 PM" },
  { icon: MapPin, label: "Venue", value: "Balihari Madhyamik Vidyalay Campus" },
  { icon: Heart, label: "Purpose", value: "Celebrate bonds, share memories & grow together" },
];

export const EventSection = () => (
  <section id="event" className="py-20">
    <div className="container px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Event Details</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Join us for a day filled with joy, nostalgia, and celebration as we reunite under the banner of our beloved school.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {details.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card-gradient rounded-xl border border-border p-6 shadow-elegant text-center"
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
