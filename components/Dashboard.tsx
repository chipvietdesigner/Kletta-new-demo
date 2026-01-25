import React from 'react';
import { TrendUp, ArrowDown, CurrencyDollar, CalendarBlank, CaretDown } from '@phosphor-icons/react';
import { DashboardData } from '../types';

interface DashboardProps {
  data: DashboardData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);
  const maxValue = Math.max(...data.chart.map(d => Math.max(d.income, d.expenses, Math.abs(d.profit))));

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 flex flex-col gap-6">
      <div><h1 className="text-2xl font-medium text-[#000000]">Dashboard</h1></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
           <div className="w-10 h-10 rounded-full flex items-center justify-center text-green-600 flex-shrink-0"><TrendUp size={24} weight="fill" /></div>
           <div><div className="text-[12px] text-[#616A6B] font-medium">Total Income</div><div className="text-xl font-bold text-[#000000] mt-0.5">{formatCurrency(data.kpi.income)}</div><div className="text-[10px] text-[#616A6B] mt-0.5 font-medium">This tax year</div></div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
           <div className="w-10 h-10 rounded-full flex items-center justify-center text-red-600 flex-shrink-0"><ArrowDown size={24} weight="fill" /></div>
           <div><div className="text-[12px] text-[#616A6B] font-medium">Total Expenses</div><div className="text-xl font-bold text-[#000000] mt-0.5">{formatCurrency(data.kpi.expenses)}</div><div className="text-[10px] text-[#616A6B] mt-0.5 font-medium">This tax year</div></div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
           <div className="w-10 h-10 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0"><CurrencyDollar size={24} weight="fill" /></div>
           <div><div className="text-[12px] text-[#616A6B] font-medium">Net Profit</div><div className={`text-xl font-bold mt-0.5 ${data.kpi.profit >= 0 ? 'text-[#000000]' : 'text-red-600'}`}>{formatCurrency(data.kpi.profit)}</div><div className="text-[10px] text-[#616A6B] mt-0.5 font-medium">This tax year</div></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-50 bg-white transition-colors h-[32px] shadow-sm">
               <CalendarBlank size={16} className="text-[#616A6B]" />
               <span className="text-[13px] font-medium text-[#000000]">This tax year (01.01 → 31.12.2025)</span>
               <CaretDown size={12} className="text-[#616A6B]" />
            </button>
         </div>
      </div>
      <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden mb-6">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead className="bg-[#F9FAFB] border-b border-gray-200">
                  <tr>
                     <th className="px-6 py-3 text-[13px] font-normal text-[#616A6B]">Month</th>
                     <th className="px-6 py-3 text-[13px] font-normal text-[#616A6B] text-right">Income</th>
                     <th className="px-6 py-3 text-[13px] font-normal text-[#616A6B] text-right">Expenses</th>
                     <th className="px-6 py-3 text-[13px] font-normal text-[#616A6B] text-right">Profit</th>
                  </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-100">
                  {data.chart.map((row, i) => (
                     <tr key={i} className="hover:bg-[#F9FAFB] transition-colors">
                        <td className="px-6 py-3.5 text-[13px] text-[#000000] font-medium">{row.month}</td>
                        <td className="px-6 py-3.5 text-[13px] text-[#616A6B] text-right">{formatCurrency(row.income)}</td>
                        <td className="px-6 py-3.5 text-[13px] text-[#616A6B] text-right">{formatCurrency(row.expenses)}</td>
                        <td className={`px-6 py-3.5 text-[13px] font-medium text-right ${row.profit >= 0 ? 'text-[#004d40]' : 'text-red-600'}`}>{formatCurrency(row.profit)}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;