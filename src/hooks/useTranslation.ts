import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

export const useTranslation = () => {
  const { language } = useLanguage();
  return translations[language];
};
