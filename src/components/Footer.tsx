import { Star } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border bg-muted/30 py-10">
    <div className="container px-4 text-center">
      <div className="flex items-center justify-center gap-2 font-display text-lg font-bold text-primary">
        <Star className="h-5 w-5 text-secondary" />
        Balihari Madhyamik Vidyalay
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Eid Reunion 2026 – Reconnect, Celebrate, Grow</p>
      <p className="mt-4 text-xs text-muted-foreground">© 2026 Balihari Madhyamik Vidyalay. All rights reserved.</p>
    </div>
  </footer>
);
