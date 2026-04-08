import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export const AnnouncementSection = () => {
  const t = useTranslation();

  return (
    <section id="announcement" className="py-16">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl rounded-2xl border border-secondary/30 bg-secondary/5 p-8 text-center"
        >
          <Megaphone className="mx-auto h-8 w-8 text-secondary" />
          <h3 className="mt-4 font-display text-xl font-bold text-foreground">{t.announcement.header}</h3>
          <p className="mt-3 text-muted-foreground">
            {t.announcement.message}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
