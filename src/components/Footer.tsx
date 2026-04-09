import { Star } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export const Footer = () => {
  const t = useTranslation();

  return (
    <footer className="border-t border-green-300 bg-gradient-to-r from-green-600 to-emerald-600 py-10">
      <div className="container px-4 text-center">
        <div className="flex items-center justify-center gap-2 font-display text-lg font-bold text-white">
          <Star className="h-5 w-5 text-yellow-300" />
          {t.footer.schoolName}
        </div>
        <p className="mt-2 text-sm text-white/90">{t.footer.tagline}</p>
        <p className="mt-4 text-xs text-white/80">{t.footer.copyright}</p>
      </div>
    </footer>
  );
};
