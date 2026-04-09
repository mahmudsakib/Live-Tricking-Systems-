import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export const TopAnnouncementBanner = () => {
  const t = useTranslation();

  return (
    <div className="bg-yellow-600 text-white py-5 mt-14 overflow-hidden">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="whitespace-nowrap text-center font-semibold text-sm sm:text-base"
      >
        {t.topBanner?.message || "🎊 " + t.topBanner?.message}
      </motion.div>
    </div>
  );
};
