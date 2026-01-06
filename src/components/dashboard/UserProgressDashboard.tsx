"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

export default function UserProgressDashboard() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const getChartData = async () => {
    try {
      const res = await fetch("/api/charts", { method: "GET" });
      const data = await res.json();
      setData(data.data);
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full">
      <Card className="h-full rounded-3xl border-0 shadow-xl shadow-slate-200/40 bg-white overflow-hidden flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Questions Answered
          </CardTitle>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">{total}</span>
            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              this month
            </span>
          </div>
        </CardHeader>
        <CardContent className="flex-1 min-h-[150px] p-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                dy={10}
              />
              <Tooltip
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 4, 4]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}