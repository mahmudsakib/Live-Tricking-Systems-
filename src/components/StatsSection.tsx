import { motion } from "framer-motion";
import { Users, Layers, UserCheck } from "lucide-react";
import { useRegistration } from "@/context/RegistrationContext";
import { useTranslation } from "@/hooks/useTranslation";

export const StatsSection = () => {
  const { registrations } = useRegistration();
  const t = useTranslation();

  const totalBatches = new Set(registrations.map((r) => r.batch)).size;
  const recent = registrations.slice(0, 5);

  const stats = [
    { icon: Users, label: t.stats.totalRegistered, value: registrations.length },
    { icon: Layers, label: t.stats.batchesParticipating, value: totalBatches },
    { icon: UserCheck, label: t.stats.paidMembers, value: registrations.filter((r) => r.paymentStatus === "paid").length },
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{t.stats.header}</h2>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-gradient rounded-xl border border-border p-8 text-center shadow-elegant"
            >
              <s.icon className="mx-auto h-8 w-8 text-secondary" />
              <div className="mt-3 font-display text-4xl font-bold text-foreground">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {recent.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10">
            <h3 className="mb-4 text-center font-display text-xl font-semibold text-foreground">{t.stats.recentlyRegistered}</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {recent.map((r) => (
                <span key={r.id} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground">
                  {r.image ? (
                    <img src={r.image} alt={r.name} className="h-6 w-6 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">{r.name[0]}</span>
                  )}
                  {r.name} <span className="text-muted-foreground">({r.batch})</span>
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {registrations.length === 0 && (
          <p className="mt-8 text-center text-muted-foreground">{t.stats.noRegistrations}</p>
        )}
      </div>
    </section>
  );
};
