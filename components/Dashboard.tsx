
import React from 'react';
import { TrendUp, ArrowDown, CurrencyDollar, CalendarBlank, CaretDown } from '@phosphor-icons/react';
import { DashboardData } from '../types';

interface DashboardProps {
  data: DashboardData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  // Find max value for chart scaling (basic normalization)
  const maxValue = Math.max(...data.chart.map(d => Math.max(d.income, d.expenses, Math.abs(d.profit))));

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 flex flex-col gap-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-[#002b31]">Dashboard</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-6">
        {/* Income */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 border border-green-100 flex-shrink-0">
             <TrendUp size={24} weight="fill" />
           </div>
           <div>
             <div className="text-[13px] text-gray-500 font-medium">Total Income</div>
             <div className="text-2xl font-bold text-[#002b31] mt-1 tabular-nums">{formatCurrency(data.kpi.income)}</div>
             <div className="text-[11px] text-gray-400 mt-1">This tax year</div>
           </div>
        </div>
        {/* Expenses */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 border border-red-100 flex-shrink-0">
             <ArrowDown size={24} weight="fill" />
           </div>
           <div>
             <div className="text-[13px] text-gray-500 font-medium">Total Expenses</div>
             <div className="text-2xl font-bold text-[#002b31] mt-1 tabular-nums">{formatCurrency(data.kpi.expenses)}</div>
             <div className="text-[11px] text-gray-400 mt-1">This tax year</div>
           </div>
        </div>
        {/* Profit */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 flex-shrink-0">
             <CurrencyDollar size={24} weight="fill" />
           </div>
           <div>
             <div className="text-[13px] text-gray-500 font-medium">Net Profit</div>
             <div className={`text-2xl font-bold mt-1 tabular-nums ${data.kpi.profit >= 0 ? 'text-[#002b31]' : 'text-red-600'}`}>
                {formatCurrency(data.kpi.profit)}
             </div>
             <div className="text-[11px] text-gray-400 mt-1">This tax year</div>
           </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-50 bg-white transition-colors h-[32px] shadow-sm">
               <CalendarBlank size={16} className="text-gray-500" />
               <span className="text-[13px] font-medium text-gray-700">This tax year (01.01 → 31.12.2025)</span>
               <CaretDown size={12} className="text-gray-400" />
            </button>
            <div className="h-[32px] px-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 font-medium flex items-center gap-2 shadow-sm transition-colors cursor-pointer">
               Income vs Expenses
               <CaretDown size={12} className="text-gray-400" />
            </div>
         </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
         <h3 className="text-[16px] font-bold text-[#002b31] mb-6">Summary</h3>
         <div className="h-[300px] w-full flex items-end justify-between gap-3 px-2">
            {data.chart.map((d, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full flex gap-1 items-end justify-center h-full relative">
                     {/* Income Bar */}
                     <div 
                       className="flex-1 bg-[#004d40] rounded-t-sm opacity-80 hover:opacity-100 transition-all relative group/bar min-w-[8px]"
                       style={{ height: `${Math.max(2, (d.income / maxValue) * 100)}%` }}
                     >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none shadow-sm">
                           Inc: {formatCurrency(d.income)}
                        </div>
                     </div>
                     {/* Expense Bar */}
                     <div 
                       className="flex-1 bg-red-400 rounded-t-sm opacity-80 hover:opacity-100 transition-all relative group/bar min-w-[8px]"
                       style={{ height: `${Math.max(2, (d.expenses / maxValue) * 100)}%` }}
                     >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none shadow-sm">
                           Exp: {formatCurrency(d.expenses)}
                        </div>
                     </div>
                     {/* Profit Bar (Optional visualization) */}
                     <div 
                       className={`flex-1 rounded-t-sm opacity-80 hover:opacity-100 transition-all relative group/bar min-w-[8px] ${d.profit >= 0 ? 'bg-blue-400' : 'bg-orange-400'}`}
                       style={{ height: `${Math.max(2, (Math.abs(d.profit) / maxValue) * 100)}%` }}
                     >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none shadow-sm">
                           Net: {formatCurrency(d.profit)}
                        </div>
                     </div>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium mt-2">{d.month}</span>
               </div>
            ))}
         </div>
         <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-[#004d40] rounded-sm opacity-80"></div>
               <span className="text-[12px] text-gray-600 font-medium">Income</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-red-400 rounded-sm opacity-80"></div>
               <span className="text-[12px] text-gray-600 font-medium">Expenses</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-blue-400 rounded-sm opacity-80"></div>
               <span className="text-[12px] text-gray-600 font-medium">Profit</span>
            </div>
         </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden mb-6">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                     <th className="px-6 py-3 text-[12px] font-bold text-gray-900">Month</th>
                     <th className="px-6 py-3 text-[12px] font-bold text-gray-900 text-right">Income</th>
                     <th className="px-6 py-3 text-[12px] font-bold text-gray-900 text-right">Expenses</th>
                     <th className="px-6 py-3 text-[12px] font-bold text-gray-900 text-right">Profit</th>
                  </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-100">
                  {data.chart.map((row, i) => (
                     <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3.5 text-[13px] text-gray-900 font-medium">{row.month}</td>
                        <td className="px-6 py-3.5 text-[13px] text-gray-700 text-right tabular-nums">{formatCurrency(row.income)}</td>
                        <td className="px-6 py-3.5 text-[13px] text-gray-700 text-right tabular-nums">{formatCurrency(row.expenses)}</td>
                        <td className={`px-6 py-3.5 text-[13px] font-bold text-right tabular-nums ${row.profit >= 0 ? 'text-[#004d40]' : 'text-red-600'}`}>
                           {formatCurrency(row.profit)}
                        </td>
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
