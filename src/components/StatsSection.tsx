import { motion } from "framer-motion";
import { Users, Layers, UserCheck, Crown } from "lucide-react";
import { useEffect } from "react";
import { useRegistration } from "@/context/RegistrationContext";
import { useTranslation } from "@/hooks/useTranslation";
import { STATS_VALUES } from "@/lib/statsConstants";

// Sample data - Edit here to change what appears in the table (Name, Batch, and T-shirt Size are displayed)
const SAMPLE_REGISTRATIONS = [
  { name: "MD:Alamin", batch: "2022", tshirtSize: "L", guests: 0 },
  { name: "MD Nayeem babu", batch: "2016", tshirtSize: "M", guests: 1 },
  { name: "Md Ariful Islam Akash ", batch: "2018", tshirtSize: "M", guests: 0 },
  { name: "Md Fahim Shahriar  ", batch: "2021", tshirtSize: "XL", guests: 0 },
  { name: "Mehedi Hasan Fardin", batch: "2021", tshirtSize: "L", guests: 0 },
  { name: "Md Mostafijur Rahman Shawon", batch: "2012", tshirtSize: "L", guests: 0 },
  { name: "MD.MIRAJUL ISLAM", batch: "2012", tshirtSize: "XL", guests: 0 },
  { name: "Parves", batch: "2021", tshirtSize: "L", guests: 1 },
  { name: "Mohammad Rashed", batch: "2021", tshirtSize: "XL", guests: 0 },
  { name: "Mostakim", batch: "2021", tshirtSize: "M", guests: 0 },
  { name: "Mst Sharifa Akter Niru", batch: "2014", tshirtSize: "S", guests: 1 },
  { name: "Sakib Mahmud", batch: "2016", tshirtSize: "XL", guests: 0 },
  { name: "MAINUL ISLAM", batch: "2007", tshirtSize: "L", guests: 2 },
  { name: "Md. Mahmud", batch: "2016", tshirtSize: "XL", guests: 0 },
  { name: "Mohammad Yousuf", batch: "2011", tshirtSize: "L", guests: 0 },
  { name: "Md Shamim", batch: "2017", tshirtSize: "L", guests: 0 },
  { name: "MD.Yeasin", batch: "2017", tshirtSize: "L", guests: 0 },
  { name: "SHIRAJUL ISLAM", batch: "2021", tshirtSize: "M", guests: 0 },
  { name: "Munira", batch: "2025", tshirtSize: "L", guests: 0 },
  { name: "Md Ahidul Islam", batch: "2021", tshirtSize: "L", guests: 1 },
  { name: "Sadia Akter", batch: "2021", tshirtSize: "L", guests: 0 },
  { name: "MAHIN", batch: "2025", tshirtSize: "L", guests: 0 },
  { name: "Md. Abidur Rahman", batch: "2015", tshirtSize: "XL", guests: 0 },
  { name: "AbuSaim", batch: "2021", tshirtSize: "L", guests: 0 },
  { name: "MD.Faysal Hosen", batch: "2020", tshirtSize: "L", guests: 0 },
  { name: "Md. Sakib Hasan", batch: "2016", tshirtSize: "L", guests: 0 },
  { name: "Emon Hasan", batch: "2021", tshirtSize: "M", guests: 0 },
  { name: "Mahfujur Rahman", batch: "2021", tshirtSize: "M", guests: 0 },
  { name: "Sinthiya Amin", batch: "2018", tshirtSize: "XL", guests: 0 },
  { name: "Sagor Bahadur Nayeem", batch: "2016", tshirtSize: "2XL", guests: 0 },
  { name: "Rabiul Islam", batch: "2021", tshirtSize: "M", guests: 0 },
  { name: "Sonali Shikder Rakhi", batch: "2017", tshirtSize: "XL", guests: 0 },
  { name: "Bayezid Bostami", batch: "2021", tshirtSize: "L", guests: 0 },
  { name: "MD. YEASIN", batch: "2019", tshirtSize: "L", guests: 0 },
  { name: "Rifat", batch: "2021", tshirtSize: "L", guests: 0 },
  { name: "Mehadhe", batch: "2019", tshirtSize: "L", guests: 0 },
  { name: "Mst-Farjana", batch: "2017", tshirtSize: "XL", guests: 0 },
  { name: "Mst- Sanjida", batch: "2017", tshirtSize: "XL", guests: 0 },
  { name: "Sabbir Hossen", batch: "2013", tshirtSize: "XL", guests: 0 },
  { name: "Maruf", batch: "2013", tshirtSize: "XL", guests: 0 },
  { name: "Hasib", batch: "2021", tshirtSize: "M", guests: 0 },
  { name: "Md.Shamim Hosen", batch: "2020", tshirtSize: "XL", guests: 0 },
  { name: "Tuhin Bahadur", batch: "2021", tshirtSize: "2XL", guests: 0 },
  { name: "Alamin", batch: "2021", tshirtSize: "L", guests: 0 },
  { name: "Mst. Lima Akter", batch: "2021", tshirtSize: "M", guests: 0 },
  { name: "Talha Ahmed", batch: "2020", tshirtSize: "XL", guests: 0 },
  { name: "Jasial kabir Apu", batch: "2011", tshirtSize: "XL", guests: 0 },
  { name: "Airin Akter", batch: "2021", tshirtSize: "XL", guests: 0 },
  { name: "Musfiqa Rahman", batch: "2021", tshirtSize: "L", guests: 0 },
  { name: "Md Rifatul Islam", batch: "2021", tshirtSize: "L", guests: 0 },
  { name: "Tamima", batch: "2017", tshirtSize: "2XL", guests: 1 },
  { name: "MD. NASIR", batch: "2017", tshirtSize: "M", guests: 0 },
  { name: "RESHMA AKTER", batch: "2017", tshirtSize: "M", guests: 1 },
  { name: "Md:ARiFUL HAQE", batch: "2021", tshirtSize: "M", guests: 0 },
  { name: "Md Baizid Bostami", batch: "2021", tshirtSize: "XL", guests: 0 },
  { name: "Md. Nishat", batch: "2016", tshirtSize: "M", guests: 0 },
  { name: "SHARMIN AKTER", batch: "2006", tshirtSize: "L", guests: 0 },
  { name: "SOWROV AHMAD", batch: "2021", tshirtSize: "L", guests: 0 },
  { name: "Naiyem", batch: "2021", tshirtSize: "L", guests: 0 },
  { name: "Tanjilah Akther", batch: "2021", tshirtSize: "M", guests: 0 },
  { name: "Mst- Sudipta salim muna", batch: "2017", tshirtSize: "M", guests: 0 },
  { name: "Lamia Akhter Habiba", batch: "2020", tshirtSize: "M", guests: 0 },
  { name: "Md. Sabbir Ahmed", batch: "2019", tshirtSize: "L", guests: 0 },
  { name: "Tajnur Tamanna", batch: "2018", tshirtSize: "M", guests: 0 },
  { name: "Md.Mahtab hosen Riaz", batch: "2018", tshirtSize: "M", guests: 0 },
  { name: "Rokon", batch: "2021", tshirtSize: "M", guests: 0 },
  { name: "MST Marjia Akter", batch: "2021", tshirtSize: "XL", guests: 0 },
  { name: "SAKIB HOSSEN", batch: "2021", tshirtSize: "L", guests: 0 },
  { name: "MD. SAGOR", batch: "2019", tshirtSize: "L", guests: 0 },
  { name: "Sha-Jamil", batch: "2021", tshirtSize: "L", guests: 0 },
  { name: "Md. Shawan", batch: "2019", tshirtSize: "XL", guests: 0 },
  { name: "Tasnim Tahia", batch: "2021", tshirtSize: "M", guests: 0 },
  { name: "A.B ARIF BILLAH", batch: "2016", tshirtSize: "L", guests: 0 },
  { name: "Sumaiya Afroz Sathi", batch: "2021", tshirtSize: "L", guests: 0 },
  { name: "Jerin", batch: "2019", tshirtSize: "L", guests: 0 },
  { name: "Md Emdadaul Hasan", batch: "2018", tshirtSize: "XL", guests: 0 },
  { name: "Umme Habiba", batch: "2018", tshirtSize: "L", guests: 0 },
  { name: "Israt Jahan", batch: "2014", tshirtSize: "M", guests: 0 },
  { name: "Tahira Jahan Mim", batch: "2017", tshirtSize: "XL", guests: 0 },
  { name: "Md. Mahfujur Rahman", batch: "2020", tshirtSize: "2XL", guests: 0 },
  { name: "Rimon Ahmed", batch: "2016", tshirtSize: "XL", guests: 0 },
  { name: "Sagor Ahamed", batch: "2016", tshirtSize: "L", guests: 0 },
  { name: "Saidul Islam", batch: "2015", tshirtSize: "M", guests: 0 },
  { name: "Tanjum Akter Eti", batch: "2015", tshirtSize: "XL", guests: 1 },
  { name: "Mizanur Rahman Sabuj", batch: "2015", tshirtSize: "L", guests: 0 },
  { name: "Dilara Afroz Mim", batch: "2015", tshirtSize: "2XL", guests: 0 },
  { name: "Sabikunnahar Sabnur", batch: "2015", tshirtSize: "2XL", guests: 0 },
  { name: "Obidul Islam Milon", batch: "2015", tshirtSize: "XL", guests: 0 },
  { name: "Emadul Islam Emon", batch: "2015", tshirtSize: "L", guests: 0 },
  { name: "Mainul Hasan", batch: "2015", tshirtSize: "2XL", guests: 0 },
  { name: "Shamrat", batch: "2015", tshirtSize: "2XL", guests: 0 },
  { name: "MD: Rakibul Islam", batch: "2022", tshirtSize: "L", guests: 0 },
  { name: "Md. Miraz", batch: "2015", tshirtSize: "L", guests: 0 },
  { name: "Miarj Hossen", batch: "2015", tshirtSize: "L", guests: 0 },
  { name: "Sajal Ahamed", batch: "2015", tshirtSize: "M", guests: 0 },
  { name: "Shakil Ahamed", batch: "2015", tshirtSize: "L", guests: 0 },
  { name: "Ahadul Islam", batch: "2015", tshirtSize: "M", guests: 0 },
  { name: "Prince Ariyan", batch: "2015", tshirtSize: "L", guests: 0 },
  { name: "Nayem Hossen", batch: "2015", tshirtSize: "M", guests: 0 },
  { name: "Al-Amin", batch: "2015", tshirtSize: "L", guests: 1 },
  { name: "Eti Moni", batch: "2019", tshirtSize: "M", guests: 0 },
  { name: "Raisul Islam Akash", batch: "2011", tshirtSize: "XL", guests: 1 },
  { name: "Fazle Rabbi", batch: "2019", tshirtSize: "M", guests: 2 },
  { name: "MD : Rahat Hossain", batch: "2022", tshirtSize: "L", guests: 0 },
  { name: "MD Jakariya", batch: "2022", tshirtSize: "M", guests: 0 },
  { name: "Nayeem Hasan", batch: "2016", tshirtSize: "XL", guests: 0 },
  { name: "Kawsar", batch: "2019", tshirtSize: "L", guests: 0 },
  { name: "Md. Hasan", batch: "2008", tshirtSize: "L", guests: 0 },
  { name: "Arifa Akter", batch: "2017", tshirtSize: "L", guests: 0 },
  { name: "Munim Ahmmed Joy", batch: "2018", tshirtSize: "XL", guests: 0 },
  { name: "Mahmud Hasan", batch: "2018", tshirtSize: "M", guests: 0 },
  { name: "MD Rakibul Hasan", batch: "2017", tshirtSize: "L", guests: 0 },
  { name: "Nadim Mahmud", batch: "2020", tshirtSize: "L", guests: 0 },
  { name: "Milon", batch: "2015", tshirtSize: "XL", guests: 0 },
  { name: "Meskat Ahmed", batch: "2019", tshirtSize: "L", guests: 0 },
  { name: "Sumaiya", batch: "2019", tshirtSize: "L", guests: 0 },
  { name: "Umme Habiba", batch: "2019", tshirtSize: "M", guests: 0 },
  { name: "Tanha", batch: "2024", tshirtSize: "2XL", guests: 2 },
  { name: "Fozly Rabbi", batch: "2016", tshirtSize: "XL", guests: 0 },
  { name: "Mahmud Hossain Abon", batch: "2016", tshirtSize: "XL", guests: 0 },
  { name: "Sumaiya Aktar Ripa", batch: "2021", tshirtSize: "XL", guests: 0 },
  { name: "Md. Farhan Ahmed", batch: "2016", tshirtSize: "L", guests: 0 },
  { name: "Sajib Khan", batch: "2002", tshirtSize: "L", guests: 1 },
  { name: "MD MASHIUR RAHMAN MURAD", batch: "2019", tshirtSize: "L", guests: 0 },
  { name: "Md  Jihad", batch: "2017", tshirtSize: "M", guests: 0 },
  { name: "MD. Rafsan", batch: "2020", tshirtSize: "M", guests: 0 },
  { name: "Sajid Khan", batch: "2017", tshirtSize: "L", guests: 0 },
  { name: "Akash Islam", batch: "2017", tshirtSize: "L", guests: 0 },
  { name: "Mst:Sumaiya Akter", batch: "2018", tshirtSize: "M", guests: 0 },
  { name: "Sakib", batch: "2019", tshirtSize: "XL", guests: 0 },
  { name: "Moin", batch: "2019", tshirtSize: "L", guests: 0 },
  { name: "Jihad Bin Jidu", batch: "2024", tshirtSize: "M", guests: 0 },
  { name: "Ariful islam", batch: "2021", tshirtSize: "M", guests: 0 },
  { name: "Munira Akter Tonni", batch: "2018", tshirtSize: "2XL", guests: 0 },
  { name: "Shah Md. Somrat", batch: "2018", tshirtSize: "XL", guests: 0 },
  { name: "Akash Islam", batch: "2024", tshirtSize: "XL", guests: 0 },
  { name: "Mahabub", batch: "2016", tshirtSize: "XL", guests: 0 },
  { name: "Munira Islam", batch: "2011", tshirtSize: "2XL", guests: 0 },
  { name: "Maria Islam", batch: "2014", tshirtSize: "2XL", guests: 0 },
  { name: "Faria Islam", batch: "2017", tshirtSize: "2XL", guests: 0 },
  { name: "Fahim", batch: "2016", tshirtSize: "L", guests: 0 },
  { name: "Mizan", batch: "2007", tshirtSize: "L", guests: 0 },
  { name: "Sohel", batch: "2007", tshirtSize: "XL", guests: 0 },
  { name: "Rumana Akter", batch: "2015", tshirtSize: "XL", guests: 2 },
  { name: "Ruhul Amin", batch: "2007", tshirtSize: "XL", guests: 0 },
  { name: "Mohibulla", batch: "2021", tshirtSize: "L", guests: 0 },
  { name: "Yeasin Arafat", batch: "2019", tshirtSize: "XL", guests: 0 },
  { name: "FUAD", batch: "2019", tshirtSize: "L", guests: 0 },
  { name: "Sabbir Hossen Rashed", batch: "2019", tshirtSize: "L", guests: 0 },
  { name: "Asma Akter", batch: "2015", tshirtSize: "2XL", guests: 0 },
  { name: "Jerin", batch: "2020", tshirtSize: "2XL", guests: 0 },
  { name: "Opu", batch: "2021", tshirtSize: "L", guests: 0 },
  { name: "Sakil", batch: "2016", tshirtSize: "M", guests: 0 },
  { name: "Md. ROBIUL ISLAM", batch: "2016", tshirtSize: "M", guests: 0 },
  { name: "Md. Mainul", batch: "2016", tshirtSize: "M", guests: 0 },
  { name: "Elias", batch: "2016", tshirtSize: "XL", guests: 0 },
  { name: "Rubel", batch: "2016", tshirtSize: "M", guests: 0 },
  { name: "Ashraful Islam Sajid", batch: "2024", tshirtSize: "L", guests: 0 },
  { name: "SIFAT SHAHARIAR AYON", batch: "2024", tshirtSize: "2XL", guests: 0 },
  { name: "Humayra Gulshan", batch: "2017", tshirtSize: "XL", guests: 0 },
  { name: "Md Jewel Rana", batch: "2018", tshirtSize: "L", guests: 0 },
  { name: "SAYMA AKTER PAYEL", batch: "2024", tshirtSize: "L", guests: 0 },
  { name: "KAYNAT", batch: "2024", tshirtSize: "L", guests: 0 },
  { name: "JANNATUN", batch: "2024", tshirtSize: "L", guests: 0 },
  { name: "Rani", batch: "2020", tshirtSize: "XL", guests: 1 },
  { name: "Fatema Akter", batch: "2017", tshirtSize: "M", guests: 0 },
  { name: "Md. Hassan Mahmud", batch: "2012", tshirtSize: "M", guests: 1 },
  { name: "Ramisa Islam", batch: "2021", tshirtSize: "L", guests: 0 },
  { name: "Atik", batch: "2017", tshirtSize: "XL", guests: 0 },
  { name: "Shaon", batch: "2019", tshirtSize: "L", guests: 0 },
  { name: "Saifun Nahar", batch: "2011", tshirtSize: "XL", guests: 1 },
  { name: "JAED EMON", batch: "2019", tshirtSize: "XL", guests: 0 },
  { name: "Mahafuj Islam", batch: "2024", tshirtSize: "XL", guests: 0 },
  { name: "Ismail", batch: "2019", tshirtSize: "M", guests: 0 },
  { name: "Suma Akter", batch: "2019", tshirtSize: "M", guests: 0 },
  { name: "Ruhul Amin", batch: "1992", tshirtSize: "2XL", guests: 2 },
  { name: "Kamal Parvaj", batch: "1992", tshirtSize: "L", guests: 0 },
  { name: "Munia Islam", batch: "2015", tshirtSize: "L", guests: 0 },
  { name: "Mahamud", batch: "2015", tshirtSize: "L", guests: 0 },
  { name: "Nadia Islam Rumpa", batch: "2015", tshirtSize: "L", guests: 0 },
  { name: "Rayhan Ahmed Raju", batch: "2018", tshirtSize: "XL", guests: 0 },
  { name: "Nasir Uddin", batch: "2013", tshirtSize: "L", guests: 0 },
  { name: "Shihab", batch: "2013", tshirtSize: "L", guests: 0 },
  { name: "Firoz Kibria", batch: "2012", tshirtSize: "L", guests: 0 },
  { name: "Md Imran Hossain", batch: "2018", tshirtSize: "XL", guests: 0 },
  { name: "Sariful Islam Safiq", batch: "2013", tshirtSize: "L", guests: 0 },
  { name: "Fahad Badsha", batch: "2018", tshirtSize: "L", guests: 0 },
  { name: "Masuma Nasrin", batch: "2015", tshirtSize: "L", guests: 0 },
  { name: "Sagor", batch: "2021", tshirtSize: "XL", guests: 0 },
  { name: "Al- Noman", batch: "2016", tshirtSize: "2XL", guests: 0 },
  { name: "Ripon Hosen", batch: "2019", tshirtSize: "XL", guests: 0 },
  { name: "Md. Imran", batch: "2019", tshirtSize: "XL", guests: 0 },
  { name: "Omar Faruk Chayon", batch: "2019", tshirtSize: "L", guests: 0 },
  { name: "Sahariar Bappi", batch: "2013", tshirtSize: "L", guests: 1 },
  { name: "Jihad", batch: "2013", tshirtSize: "L", guests: 0 },
  { name: "Dr. Sakib Uddin", batch: "2013", tshirtSize: "XL", guests: 0 },
  { name: "Al Amin", batch: "2016", tshirtSize: "2XL", guests: 1 },
  { name: "Samia Akter", batch: "2016", tshirtSize: "L", guests: 0 },
  { name: "Md. Fahim", batch: "2024", tshirtSize: "M", guests: 0 },
  { name: "Md. Jedan", batch: "2020", tshirtSize: "L", guests: 0 },
  { name: "Sunra Jahan Tamanna", batch: "2016", tshirtSize: "XL", guests: 0 },
  { name: "Abdullah Al Emon", batch: "2021", tshirtSize: "M", guests: 0 },
  { name: "Md. Fakrul Hasan", batch: "2016", tshirtSize: "XL", guests: 0 }
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
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-white">{t.stats.tshirtSize}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-white">{t.stats.batch}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-bold text-white">{t.stats.guests}</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-bold text-white">{t.stats.registration}</th>
                  </tr>
                </thead>
                <tbody>
                  {[...registrations].reverse().map((reg, idx) => (
                    <tr key={reg.id} className="border-b border-border hover:bg-slate-50 transition-colors">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-foreground">{registrations.length - idx}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground font-semibold">{reg.name}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground font-semibold">{reg.tshirtSize}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground">{reg.batch}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-medium text-foreground">{reg.guests}</td>
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
