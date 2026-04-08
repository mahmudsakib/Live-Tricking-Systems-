import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="px-3 font-medium"
      >
        English
      </Button>
      <Button
        variant={language === "bn" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("bn")}
        className="px-3 font-medium"
      >
        বাংলা
      </Button>
    </div>
  );
};
