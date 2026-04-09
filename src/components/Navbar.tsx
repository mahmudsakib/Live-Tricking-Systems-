import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import schoolLogo from "@/assets/school-logo.png";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslation();

  const links = [
    { label: t.navbar.home, href: "#hero" },
    { label: t.navbar.event, href: "#event" },
    { label: t.navbar.announcement, href: "#announcement" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b-4 border-white bg-green-600/95 backdrop-blur-lg transition-all duration-300 hover:bg-green-700/95"
    >
      <div className="container mx-auto flex items-stretch justify-between px-3 sm:px-4">
        <a href="#hero" className="flex items-center hover:opacity-90 transition-opacity">
          <img 
            src={schoolLogo} 
            alt="Balihari High School" 
            className="h-auto max-h-20 sm:max-h-24 w-auto object-contain drop-shadow-lg" 
          />
        </a>

        <div className="hidden items-center gap-6 sm:gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm sm:text-base font-medium text-white transition-all hover:text-yellow-300 hover:scale-105 pb-1 border-b-2 border-transparent hover:border-yellow-300">
              {l.label}
            </a>
          ))}
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button type="button" onClick={() => setOpen(!open)} className="text-white hover:text-yellow-300 transition-colors">
            {open ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border-t border-green-700/30 bg-green-700/90 md:hidden">
          <div className="flex flex-col gap-2 px-4 py-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-base font-medium text-white transition-all hover:bg-green-600/50 hover:text-yellow-300 hover:scale-105">
                {l.label}
              </a>
            ))}
            <div className="border-t border-green-700/30 my-2 pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
