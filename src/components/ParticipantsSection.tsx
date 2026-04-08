import { motion } from "framer-motion";
import { Search, ChevronDown, ChevronUp, Users, BadgeCheck } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRegistration } from "@/context/RegistrationContext";

export const ParticipantsSection = () => {
  const { filteredRegistrations, searchQuery, setSearchQuery } = useRegistration();
  const [expandedBatch, setExpandedBatch] = useState<string | null>(null);

  const grouped: Record<string, typeof filteredRegistrations> = {};
  filteredRegistrations.forEach((r) => {
    if (!grouped[r.batch]) grouped[r.batch] = [];
    grouped[r.batch].push(r);
  });

  const sortedBatches = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <section id="participants" className="py-20 bg-muted/50">
      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Registered Participants</h2>
          <p className="mt-3 text-muted-foreground">Browse batch-wise registrations.</p>
        </motion.div>

        <div className="mx-auto mt-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or batch…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {sortedBatches.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No participants found.</p>
          )}

          {sortedBatches.map((batch) => {
            const members = grouped[batch];
            const isOpen = expandedBatch === batch;
            return (
              <motion.div
                key={batch}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card-gradient rounded-xl border border-border shadow-elegant overflow-hidden"
              >
                <button
                  onClick={() => setExpandedBatch(isOpen ? null : batch)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-display text-lg font-semibold text-foreground">Batch {batch}</span>
                      <span className="ml-2 text-sm text-muted-foreground">({members.length} members)</span>
                    </div>
                  </div>
                  {isOpen ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                </button>

                {isOpen && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="border-t border-border">
                    <div className="divide-y divide-border">
                      {members.map((m) => (
                        <div key={m.id} className="flex items-center gap-3 px-6 py-3">
                          {m.image ? (
                            <img src={m.image} alt={m.name} className="h-8 w-8 rounded-full object-cover" />
                          ) : (
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">{m.name[0]}</span>
                          )}
                          <div className="flex-1 min-w-0">
                            <span className="font-medium text-foreground">{m.name}</span>
                            {m.profession && <span className="ml-2 text-sm text-muted-foreground">· {m.profession}</span>}
                          </div>
                          {m.paymentStatus === "paid" && (
                            <BadgeCheck className="h-5 w-5 text-secondary flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
