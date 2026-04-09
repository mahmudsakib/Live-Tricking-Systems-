import { Star } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export const Footer = () => {
  const t = useTranslation();

  return (
    <footer className="border-t border-slate-300 bg-gradient-to-r from-slate-700 to-blue-800 py-10">
      <div className="container px-4 text-center">
        <div className="flex items-center justify-center gap-2 font-display text-lg font-bold text-yellow-400">
          <Star className="h-5 w-5 text-yellow-400" />
          {t.footer.schoolName}
        </div>
        <p className="mt-2 text-sm text-slate-200">{t.footer.tagline}</p>
        <p className="mt-4 text-xs text-slate-300">{t.footer.copyright}</p>
      </div>
    </footer>
  );
};
