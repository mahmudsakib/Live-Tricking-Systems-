import { motion } from "framer-motion";
import { Menu, X, Star } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslation();

  const links = [
    { label: t.navbar.home, href: "#hero" },
    { label: t.navbar.event, href: "#event" },
    { label: "Announcement", href: "#announcement" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#hero" className="flex items-center gap-2 font-display text-lg font-bold text-primary">
          <Star className="h-5 w-5 text-secondary" />
          {t.navbar.logo}
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {l.label}
            </a>
          ))}
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button type="button" onClick={() => setOpen(!open)} className="text-foreground">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col gap-2 px-4 py-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary">
                {l.label}
              </a>
            ))}
            <div className="border-t border-border my-2 pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
