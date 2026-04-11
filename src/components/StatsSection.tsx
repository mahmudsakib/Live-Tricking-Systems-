import { motion } from "framer-motion";
import { Users, Layers, UserCheck } from "lucide-react";
import { useEffect } from "react";
import { useRegistration } from "@/context/RegistrationContext";
import { useTranslation } from "@/hooks/useTranslation";
import { STATS_VALUES } from "@/lib/statsConstants";

// Sample data - Edit here to change what appears in the table (Only Name and Batch are displayed)
const SAMPLE_REGISTRATIONS = [
  { name: "Mahfuzur Rahman jitu", batch: "2023" },
  { name: "MD:Alamin", batch: "2022" },
  { name: "MD Nayeem babu", batch: "2016" },
  { name: "Md Ariful Islam Akash ", batch: "2018" },
  { name: "Md Fahim Shahriar  ", batch: "2021" },
  { name: "Mehedi Hasan Fardin", batch: "2021" },
  { name: "Md Mostafijur Rahman Shawon", batch: "2012" },
  { name: "MD.MIRAJUL ISLAM", batch: "2012" },
  { name: "Parves", batch: "2021" },
  { name: "Mohammad Rashed", batch: "2021" } ,
  { name: "Mostakim", batch: "2021" },
  { name: "Mst Sharifa Akter Niru", batch: "2014" }
];

export const StatsSection = () => {
  const { registrations, addRegistration } = useRegistration();
  const t = useTranslation();
  
  // Initialize only with sample data - ignore all other data sources
  useEffect(() => {
    // Clear localStorage completely
    localStorage.removeItem("eid_reunion_registrations");
    
    // Small delay to ensure localStorage is cleared before adding new data
    setTimeout(() => {
      SAMPLE_REGISTRATIONS.forEach(reg => {
        addRegistration({ 
          ...reg, 
          phone: "", 
          email: "", 
          profession: "", 
          location: "", 
          paymentStatus: "paid", 
          registrationType: "student", 
          image: "" 
        });
      });
    }, 0);
  }, []); // Only run on mount

  const stats = [
    { icon: Users, label: t.stats.totalRegistered, value: STATS_VALUES.totalRegistered },
    { icon: Layers, label: t.stats.batchesParticipating, value: STATS_VALUES.batchesParticipating },
    { icon: UserCheck, label: t.stats.paidMembers, value: STATS_VALUES.paidMembers },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{t.stats.header}</h2>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-gradient rounded-xl border border-border p-8 text-center shadow-elegant"
            >
              <s.icon className="mx-auto h-8 w-8 text-secondary" />
              <div className="mt-3 font-display text-4xl font-bold text-foreground">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {registrations.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
            <h3 className="mb-6 text-center font-display text-xl sm:text-2xl font-semibold text-foreground">{t.stats.allRegistrationsTitle}</h3>
            
            <div className="-mx-4 sm:mx-0 overflow-x-auto rounded-none sm:rounded-lg border border-border shadow-none sm:shadow-md">
              <table className="w-full bg-white min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-100 to-slate-200 border-b-2 border-border">
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-foreground">{t.stats.slNo}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-foreground">{t.stats.name}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-foreground">{t.stats.batch}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-foreground">{t.stats.registration}</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.slice(0, 15).map((reg, idx) => (
                    <tr key={reg.id} className="border-b border-border hover:bg-slate-50 transition-colors">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-foreground">{idx + 1}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground font-semibold">{reg.name}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground">{reg.batch}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Confirm
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {registrations.length > 15 && (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Showing 15 of {registrations.length} registrations
              </p>
            )}

            {/* Batch-wise Registration Count Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
              <h3 className="mb-6 text-center font-display text-xl sm:text-2xl font-semibold text-foreground">{t.stats.registrationByBatchTitle}</h3>
              
              <div className="-mx-4 sm:mx-0 overflow-x-auto rounded-none sm:rounded-lg border border-border shadow-none sm:shadow-md">
                <table className="w-full bg-white min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-100 to-slate-200 border-b-2 border-border">
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-foreground">{t.stats.batch}</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-foreground">{t.stats.totalRegistrations}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      // Count registrations by batch
                      const batchCounts = registrations.reduce((acc, reg) => {
                        const batch = reg.batch;
                        acc[batch] = (acc[batch] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>);

                      // Sort batches by count (descending)
                      const sortedBatches = Object.entries(batchCounts)
                        .sort((a, b) => b[1] - a[1])
                        .map(([batch, count]) => ({ batch, count }));

                      return sortedBatches.map((item, idx) => (
                        <tr key={item.batch} className={idx % 2 === 0 ? "bg-white border-b border-border hover:bg-slate-50" : "bg-slate-50 border-b border-border hover:bg-slate-100"}>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-foreground">{item.batch}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-secondary text-white">
                              {item.count}
                            </span>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
