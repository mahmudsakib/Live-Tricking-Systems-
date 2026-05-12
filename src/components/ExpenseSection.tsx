import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { useExpense } from "@/context/ExpenseContext";

export const ExpenseSection = () => {
  const {
    totalIncome,
    totalExpenseManual,
    expenses,
    getTotalExpense,
    getSubtotal,
  } = useExpense();


  const totalExpense = getTotalExpense();
  const subtotal = getSubtotal();

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            খরচের হিসাব (Expense Calculation)
          </h2>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid gap-6 sm:grid-cols-3 mb-8">
          {/* Total Income Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-8 text-center text-white shadow-lg"
          >
            <TrendingUp className="mx-auto h-10 w-10 mb-3" />
            <div className="font-display text-4xl font-bold mb-2">
            {totalIncome.toLocaleString()}
            </div>
            <div className="text-sm text-green-100">মোট আয় / Total Income</div>
          </motion.div>

          {/* Total Expense Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-8 text-center text-white shadow-lg"
          >
            <TrendingDown className="mx-auto h-10 w-10 mb-3" />
            <div className="font-display text-4xl font-bold mb-2">
              ৳{getTotalExpense().toLocaleString()}
            </div>
            <div className="text-sm text-red-100">মোট খরচ / Total Expense</div>
          </motion.div>

          {/* Subtotal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`bg-gradient-to-br ${
              getSubtotal() >= 0
                ? "from-blue-500 to-blue-600"
                : "from-orange-500 to-orange-600"
            } rounded-xl p-8 text-center text-white shadow-lg`}
          >
            <DollarSign className="mx-auto h-10 w-10 mb-3" />
            {/* <div className="text-xs sm:text-sm text-blue-100 mb-2">
              ৳{totalIncome.toLocaleString()} - ৳{getTotalExpense().toLocaleString()}
            </div> */}
            <div className="font-display text-4xl font-bold mb-2">
              ৳{getSubtotal().toLocaleString()}
            </div>
            <div className="text-sm text-blue-100">Subtotal (Income - Expense)</div>
          </motion.div>
        </div>

        {/* Manual totals inputs removed as requested */}

        {/* Expenses Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-6 text-center font-display text-xl sm:text-2xl font-bold text-foreground">
            খরচের হিসাব (Expense Details)
          </h3>

          

          <div className="-mx-4 sm:mx-0 rounded-none sm:rounded-lg border border-border shadow-none sm:shadow-md overflow-hidden">
            <div className="max-h-[700px] overflow-y-auto">
              <table className="w-full bg-white min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-700 to-slate-800 border-b-2 border-border sticky top-0">
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-white">
                      ক্রম
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-white">
                      ক্যাটাগরি
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-white">
                      বিবরণ
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-bold text-white">
                      পরিমাণ (টাকা)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense, idx) => (
                    <tr
                      key={expense.id}
                      className={`border-b border-border hover:bg-slate-50 transition-colors ${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                      }`}
                    >
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-foreground">
                        {idx + 1}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-foreground">
                        {expense.category}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground">
                        <div className="px-2 py-1">{expense.description || "-"}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-bold text-red-600">
                        ৳{expense.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Total Sum Below Table */}
          <div className="mt-4 p-4 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-lg border border-slate-600 shadow-md">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-base sm:text-lg">মোট খরচ / Total Expense:</span>
              <span className="font-display text-2xl sm:text-3xl font-bold text-yellow-300">
                ৳{getTotalExpense().toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
