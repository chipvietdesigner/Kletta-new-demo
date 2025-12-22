import React, { useState } from 'react';
import { ExpenseTransaction } from '../types';
import { 
  FileText, 
  SealCheck,
  WarningCircle,
  Image,
  CaretDown,
  Plus
} from '@phosphor-icons/react';

interface ExpensesTableProps {
  transactions: ExpenseTransaction[];
}

const ExpensesTable: React.FC<ExpensesTableProps> = ({ transactions }) => {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-4 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0">
        <table className="min-w-[1600px] text-left table-fixed w-full border-collapse">
          {/* Header */}
          <thead className="bg-[#F9FAFB] text-[#4B5563] sticky top-0 z-10 h-[48px] border-b border-[#E5E7EB]">
            <tr>
              <th className="px-4 font-semibold text-[13px] w-[100px]">Date</th>
              <th className="px-4 font-semibold text-[13px] w-[220px]">Customer</th>
              <th className="px-4 font-semibold text-[13px] w-[240px]">Category</th>
              <th className="px-4 font-semibold text-[13px] w-[160px]">Receipt</th>
              <th className="px-4 font-semibold text-[13px] w-[80px] text-center">Doc</th>
              <th className="px-4 font-semibold text-[13px] w-[60px] text-center">Rec.</th>
              <th className="px-4 font-semibold text-[13px] w-[120px] text-right">Subtotal</th>
              <th className="px-4 font-semibold text-[13px] w-[110px] text-right">Tax rate</th>
              <th className="px-4 font-semibold text-[13px] w-[100px] text-right">VAT</th>
              <th className="px-4 font-semibold text-[13px] w-[130px] text-right">Total</th>
              <th className="px-4 font-semibold text-[13px] w-[80px] text-center">Verified</th>
              <th className="px-4 font-semibold text-[13px] w-[80px] text-center">AI Ver.</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {transactions.map((t, index) => (
              <tr 
                key={t.id} 
                className={`group transition-colors border-b border-[#E5E7EB] h-[64px] ${
                  hoveredRowId === t.id ? 'bg-[#F9FAFB]' : 'bg-white'
                }`}
                onMouseEnter={() => setHoveredRowId(t.id)}
                onMouseLeave={() => setHoveredRowId(null)}
              >
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-[#4B5563] text-[13px] font-medium tabular-nums">{t.date}</div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4">
                     <div className="text-[#0F2F33] font-bold cursor-pointer hover:text-[#1E6F73] transition-colors truncate text-[13px]">
                        {t.customer}
                     </div>
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4">
                     <span className="text-[#0F2F33] font-semibold text-[13px] truncate">
                       {t.category}
                     </span>
                  </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-[#6B7280] text-[13px] truncate font-medium">{t.receipt}</div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center justify-center px-4">
                    {t.document ? (
                        <FileText size={18} className="text-[#4B5563] hover:text-[#0F2F33] cursor-pointer transition-colors" />
                    ) : (
                       <span className="text-[#E5E7EB]">-</span>
                    )}
                  </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-center px-4 text-[#1E6F73] font-bold text-[13px]">{t.reconciled && "✓"}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-end px-4 text-[#0F2F33] font-medium text-[13px] tabular-nums">{formatCurrency(t.subtotal)}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-end px-4">
                       <span className="text-[#4B5563] font-medium text-[13px] tabular-nums">
                         {t.taxRate.includes(':') ? t.taxRate.split(':')[0] : t.taxRate}
                       </span>
                   </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-end px-4 text-[#4B5563] font-medium text-[13px] tabular-nums">{formatCurrency(t.vat)}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-end px-4 tabular-nums">
                        <span className="font-bold text-[#1E6F73] text-[13px]">{formatCurrency(t.totalAmount)}</span>
                   </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center justify-center px-4">
                    {t.verified ? (
                       <SealCheck size={20} weight="fill" className="text-[#E5E7EB]" />
                    ) : (
                       <div className="w-4 h-4 rounded-full border border-[#E5E7EB]"></div>
                    )}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center justify-center px-4">
                    {t.aiVerified ? (
                        <SealCheck size={20} weight="fill" className="text-[#E5E7EB]" />
                    ) : (
                        <WarningCircle size={20} weight="fill" className="text-[#FCD34D]" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer Summary */}
      <div className="bg-white py-3 flex justify-between items-center text-[13px] text-[#4B5563] flex-shrink-0 px-6 border-t border-[#E5E7EB]">
         <div>
            <span className="font-bold text-[#0F2F33]">{transactions.length}</span> expenses
         </div>
      </div>
    </div>
  );
};

export default ExpensesTable;