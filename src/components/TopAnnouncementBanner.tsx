import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export const TopAnnouncementBanner = () => {
  const t = useTranslation();

  return (
    <div className="fixed top-20 sm:top-24 left-0 right-0 z-40 bg-yellow-600 text-white py-2 sm:py-3 overflow-hidden border-b border-yellow-700">
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="whitespace-nowrap text-center font-semibold text-xs sm:text-sm py-1"
      >
        {t.topBanner?.message || "🎊 " + t.topBanner?.message}
      </motion.div>
    </div>
  );
};
