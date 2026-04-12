import { motion } from "framer-motion";
import { Megaphone, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useState, useEffect } from "react";

export const AnnouncementSection = () => {
  const t = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const announcements = [
    {
      title: t.announcement.header,
      message: t.announcement.message,
    },
    {
      title: "গুরুত্বপূর্ণ ঘোষণা",
      message: "সকল প্রাক্তন শিক্ষার্থীকে নিজ নিজ ব্যাচ প্রতিনিধির সাথে দ্রুত যোগাযোগ করে রেজিস্ট্রেশন সম্পন্ন করার জন্য অনুরোধ করা যাচ্ছে।",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % announcements.length);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, [announcements.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? announcements.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % announcements.length);
  };

  return (
    <section id="announcement" className="py-8 sm:py-16 bg-gradient-to-r from-[hsl(152,45%,28%)]/5 to-[hsl(43,72%,55%)]/5">
      <div className="container px-2 sm:px-4">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className={`rounded-xl sm:rounded-2xl border-0 p-4 sm:p-8 text-center shadow-elegant overflow-hidden relative ${
                currentSlide === 0
                  ? "bg-gradient-to-br from-[hsl(152,45%,28%)] to-[hsl(152,45%,18%)]"
                  : "bg-gradient-to-br from-[hsl(43,72%,55%)] to-[hsl(38,80%,45%)]"
              }`}
            >
              <div className={`absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 rounded-full -mr-10 sm:-mr-16 -mt-10 sm:-mt-16 ${
                currentSlide === 0
                  ? "bg-[hsl(43,72%,55%)]/10"
                  : "bg-[hsl(152,45%,28%)]/10"
              }`}></div>
              <div className={`absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 rounded-full -ml-8 sm:-ml-12 -mb-8 sm:-mb-12 ${
                currentSlide === 0
                  ? "bg-[hsl(43,72%,55%)]/10"
                  : "bg-[hsl(152,45%,28%)]/10"
              }`}></div>

              <div className="relative z-10">
                <Megaphone className={`mx-auto h-8 w-8 sm:h-10 sm:w-10 ${
                  currentSlide === 0 ? "text-[hsl(43,72%,55%)]" : "text-[hsl(152,45%,28%)]"
                }`} />
                <h3 className="mt-3 sm:mt-4 font-display text-xl sm:text-3xl md:text-4xl font-bold text-white">
                  {announcements[currentSlide].title}
                </h3>
                <div className="mt-4 sm:mt-6 whitespace-pre-wrap text-left text-xs sm:text-sm md:text-base text-white/95 leading-relaxed bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-6 backdrop-blur-sm border border-white/20">
                  {announcements[currentSlide].message}
                </div>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              aria-label="Previous announcement"
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 sm:-translate-x-16 md:-translate-x-20 z-20 text-white p-1 sm:p-2 rounded-full transition-all shadow-lg ${
                currentSlide === 0
                  ? "bg-gradient-to-br from-[hsl(152,45%,28%)] to-[hsl(152,45%,18%)] hover:from-[hsl(152,45%,18%)] hover:to-[hsl(152,45%,8%)]"
                  : "bg-gradient-to-br from-[hsl(43,72%,55%)] to-[hsl(38,80%,45%)] hover:from-[hsl(38,80%,45%)] hover:to-[hsl(38,70%,35%)]"
              }`}
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              onClick={goToNext}
              aria-label="Next announcement"
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-16 md:translate-x-20 z-20 text-white p-1 sm:p-2 rounded-full transition-all shadow-lg ${
                currentSlide === 0
                  ? "bg-gradient-to-br from-[hsl(152,45%,28%)] to-[hsl(152,45%,18%)] hover:from-[hsl(152,45%,18%)] hover:to-[hsl(152,45%,8%)]"
                  : "bg-gradient-to-br from-[hsl(43,72%,55%)] to-[hsl(38,80%,45%)] hover:from-[hsl(38,80%,45%)] hover:to-[hsl(38,70%,35%)]"
              }`}
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-1 sm:gap-2 mt-4 sm:mt-6">
              {announcements.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to announcement ${idx + 1}`}
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    idx === currentSlide
                      ? `w-6 sm:w-8 ${idx === 0 ? "bg-[hsl(152,45%,28%)]" : "bg-[hsl(43,72%,55%)]"}`
                      : `w-1.5 sm:w-2 ${idx === 0 ? "bg-[hsl(152,45%,28%)]/40 hover:bg-[hsl(152,45%,28%)]/60" : "bg-[hsl(43,72%,55%)]/40 hover:bg-[hsl(43,72%,55%)]/60"}`
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
