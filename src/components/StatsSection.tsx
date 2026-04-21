import { motion } from "framer-motion";
import { Users, Layers, UserCheck, Crown } from "lucide-react";
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
  { name: "Mst Sharifa Akter Niru", batch: "2014" },
  { name: "Sakib Mahmud", batch: "2016" },
  { name: "MAINUL ISLAM", batch: "2007" },
  { name: "Md. Mahmud", batch: "2016" },
  { name: "Mohammad Yousuf", batch: "2011" },
  { name: "Md Shamim", batch: "2017" },
  { name: "MD.Yeasin", batch: "2017" },
  { name: "SIRAZUL ISLAM", batch: "2021" },
  { name: "Munira", batch: "2025" },
  { name: "Md Ahidul Islam", batch: "2021" },
  { name: "Sadia Akter", batch: "2021" },
  { name: "MAHIN", batch: "2025" },
  { name: "Md. Abidur Rahman", batch: "2015" },
  { name: "AbuSaim", batch: "2021" },
  { name: "MD.Faysal Hosen", batch: "2020" },
  { name: "MD.Shariful Islam", batch: "2022" },
  { name: "Md. Sakib Hasan", batch: "2016" },
  { name: "Emon Hasan", batch: "2021" },
  { name: "Mahfujur Rahman", batch: "2021" },
  { name: "Sinthiya Amin", batch: "2018" },
  { name: "Sagor Bahadur Nayeem", batch: "2016" },
  { name: "Rabiul Islam", batch: "2021" },
  { name: "Sonali Shikder Rakhi", batch: "2017" },
  { name: "Bayezid Bostami", batch: "2021" },
  { name: "MD. YEASIN", batch: "2019" },
  { name: "Rifat", batch: "2021" },
  { name: "Mehadhe", batch: "2019" },
  { name: "Mst-Farjana", batch: "2017" },
  { name: "Mst- Sanjida", batch: "2017" },
  { name: "Sabbir Hossen", batch: "2013" },
  { name: "Maruf", batch: "2013" },
  { name: "Hasib", batch: "2021" },
  { name: "MD.Samim Hosen", batch: "2020" },
  { name: "Tuhin Bahadur", batch: "2021" },
  { name: "Alamin", batch: "2021" },
  { name: "Mst. Lima Akter", batch: "2021" },
  { name: "MD. Abu Talha", batch: "2020" },
  { name: "Jasial kabir Apu", batch: "2011" },
  { name: "Airin Akter", batch: "2021" },
  { name: "Musfiqa Rahman", batch: "2021" },
  { name: "Md Rifatul Islam", batch: "2021" },
  { name: "Mst:- Tamima Hawlader", batch: "2017" },
  { name: "MD. NASIR", batch: "2017" },
  { name: "RESHMA AKTER", batch: "2017" },
  { name: "Md:ARiFUL HAQE", batch: "2021" },
  { name: "Md Baizid Bostami", batch: "2021" },
  { name: "Md. Nishat", batch: "2016" },
  { name: "SHARMIN AKTER", batch: "2006" },
  { name: "SOWROV AHMAD", batch: "2021" },
  { name: "Naiyem", batch: "2021" },
  { name: "Tanjilah Akther", batch: "2021" },
  { name: "Mst- Sudipta salim muna", batch: "2017" },
  { name: "Lamia Akhter Habiba", batch: "2020" },
  { name: "Md. Sabbir Ahmed", batch: "2019" },
  { name: "Tajnur Tamanna", batch: "2018" },
  { name: "Md.Mahtab hosen Riaz", batch: "2018" },
  { name: "Rokon", batch: "2021" },
  { name: "MST Marjia Akter", batch: "2021" },
  { name: "SAKIB HOSSEN", batch: "2021" },
  { name: "MD. SAGOR", batch: "2019" },
  { name: "Sha-Jamil", batch: "2021" },
  { name: "Md. Shawan", batch: "2019" },
  { name: "Tasnim Tahia", batch: "2021" },
  { name: "A.B ARIF BILLAH", batch: "2016" },
  { name: "Sumaiya Afroz Sathi", batch: "2021" },
  { name: "Zarin", batch: "2019" },
  { name: "Md Emdadaul Hasan", batch: "2018" },
  { name: "Umme Habiba", batch: "2018" },
  { name: "Israt Jahan", batch: "2014" },
  { name: "Tahira Jahan Mim", batch: "2017" },
  { name: "Md. Mahfujur Rahman", batch: "2020" },
  { name: "Rimon Ahamed", batch: "2016" },
  { name: "Sagor Ahamed", batch: "2016" }
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
  }, [addRegistration]); // Only run on mount

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
          {stats.map((s, i) => {
            const gradients = [
              "bg-gradient-to-br from-[hsl(152,45%,28%)] to-[hsl(152,45%,18%)]",
              "bg-gradient-to-br from-[hsl(43,72%,55%)] to-[hsl(38,80%,45%)]",
              "bg-gradient-to-br from-[hsl(152,45%,28%)] to-[hsl(152,45%,18%)]"
            ];
            return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${gradients[i]} rounded-xl border-0 p-8 text-center shadow-elegant`}
            >
              <s.icon className="mx-auto h-8 w-8 text-white" />
              <div className="mt-3 font-display text-4xl font-bold text-white">{s.value}</div>
              <div className="mt-1 text-sm text-white/90">{s.label}</div>
            </motion.div>
            );
          })}
        </div>

        {registrations.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
            <h3 className="mb-6 text-center font-display text-xl sm:text-2xl font-bold text-[hsl(152,45%,28%)]">{t.stats.allRegistrationsTitle}</h3>
            
            <div className="-mx-4 sm:mx-0 rounded-none sm:rounded-lg border border-border shadow-none sm:shadow-md overflow-hidden">
              <div className="max-h-[550px] overflow-y-auto overflow-x-auto">
                <table className="w-full bg-white min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[hsl(152,45%,28%)] to-[hsl(152,45%,18%)] border-b-2 border-border">
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-white">{t.stats.slNo}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-white">{t.stats.name}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-white">{t.stats.batch}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-bold text-white">{t.stats.registration}</th>
                  </tr>
                </thead>
                <tbody>
                  {[...registrations].reverse().map((reg, idx) => (
                    <tr key={reg.id} className="border-b border-border hover:bg-slate-50 transition-colors">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-foreground">{registrations.length - idx}</td>
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
            </div>

            {registrations.length > 0 && (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Total: {registrations.length} registrations
              </p>
            )}

            {/* Batch-wise Registration Count Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
              <h3 className="mb-6 text-center font-display text-xl sm:text-2xl font-bold text-[hsl(43,72%,55%)]">{t.stats.registrationByBatchTitle}</h3>
              
              <div className="-mx-4 sm:mx-0 overflow-x-auto rounded-none sm:rounded-lg border border-border shadow-none sm:shadow-md">
                <table className="w-full bg-white min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-[hsl(43,72%,55%)] to-[hsl(38,80%,45%)] border-b-2 border-border">
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-white">{t.stats.batch}</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-bold text-white">{t.stats.totalRegistrations}</th>
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
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between">
                            <span>{item.batch}</span>
                            {idx === 0 && <Crown className="h-5 w-5 text-yellow-500" />}
                          </td>
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
