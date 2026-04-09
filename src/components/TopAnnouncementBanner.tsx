import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export const TopAnnouncementBanner = () => {
  const t = useTranslation();

  return (
    <div className="fixed top-16 sm:top-20 left-0 right-0 z-40 bg-yellow-600 text-white py-3 sm:py-4 overflow-hidden border-b border-yellow-700">
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="whitespace-nowrap text-center font-semibold text-sm sm:text-base py-1"
      >
        {t.topBanner?.message || "🎊 " + t.topBanner?.message}
      </motion.div>
    </div>
  );
};
