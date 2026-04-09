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
          className="mx-auto max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center"
        >
          <Megaphone className="mx-auto h-8 w-8 text-amber-600" />
          <h3 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">{t.announcement.header}</h3>
          <div className="mt-4 whitespace-pre-wrap text-left text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.announcement.message}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
