import { Star } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export const Footer = () => {
  const t = useTranslation();

  return (
    <footer className="border-t border-border bg-muted/30 py-10">
      <div className="container px-4 text-center">
        <div className="flex items-center justify-center gap-2 font-display text-lg font-bold text-primary">
          <Star className="h-5 w-5 text-secondary" />
          {t.footer.schoolName}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{t.footer.tagline}</p>
        <p className="mt-4 text-xs text-muted-foreground">{t.footer.copyright}</p>
      </div>
    </footer>
  );
};
