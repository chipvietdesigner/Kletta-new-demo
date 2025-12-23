import React, { useState } from 'react';
import { ExpenseTransaction } from '../types';
import { FileText, SealCheck, WarningCircle } from '@phosphor-icons/react';

interface ExpensesTableProps {
  transactions: ExpenseTransaction[];
}

const ExpensesTable: React.FC<ExpensesTableProps> = ({ transactions }) => {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-4 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0">
        <table className="min-w-[1600px] text-left table-fixed w-full border-collapse">
          <thead className="bg-[#F9FAFB] text-[#616A6B] sticky top-0 z-10 h-[48px] border-b border-[#E5E7EB]">
            <tr>
              <th className="px-4 font-normal text-[13px] w-[100px]">Date</th>
              <th className="px-4 font-normal text-[13px] w-[220px]">Customer</th>
              <th className="px-4 font-normal text-[13px] w-[240px]">Category</th>
              <th className="px-4 font-normal text-[13px] w-[160px]">Receipt</th>
              <th className="px-4 font-normal text-[13px] w-[80px] text-center">Doc</th>
              <th className="px-4 font-normal text-[13px] w-[60px] text-center">Rec.</th>
              <th className="px-4 font-normal text-[13px] w-[120px] text-right">Subtotal</th>
              <th className="px-4 font-normal text-[13px] w-[110px] text-right">Tax rate</th>
              <th className="px-4 font-normal text-[13px] w-[100px] text-right">VAT</th>
              <th className="px-4 font-normal text-[13px] w-[130px] text-right">Total</th>
              <th className="px-4 font-normal text-[13px] w-[80px] text-center">Verified</th>
              <th className="px-4 font-normal text-[13px] w-[80px] text-center">AI Ver.</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {transactions.map((t) => (
              <tr key={t.id} className={`group transition-colors border-b border-[#E5E7EB] h-[64px] ${hoveredRowId === t.id ? 'bg-[#F9FAFB]' : 'bg-white'}`} onMouseEnter={() => setHoveredRowId(t.id)} onMouseLeave={() => setHoveredRowId(null)}>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px] font-normal">{t.date}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4"><div className="text-[#000000] font-medium cursor-pointer hover:text-[#1E6F73] transition-colors truncate text-[13px]">{t.customer}</div></div></td>
                <td className="p-0"><div className="h-full flex items-center px-4"><span className="text-[#000000] font-medium text-[13px] truncate">{t.category}</span></div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px] truncate font-normal">{t.receipt}</div></td>
                <td className="p-0"><div className="h-full flex items-center justify-center px-4">{t.document ? (<FileText size={18} className="text-[#616A6B] hover:text-[#000000] cursor-pointer transition-colors" />) : (<span className="text-[#E5E7EB]">-</span>)}</div></td>
                <td className="p-0"><div className="h-full flex items-center justify-center px-4 text-[#000000] font-medium text-[13px]">{t.reconciled && "✓"}</div></td>
                <td className="p-0"><div className="h-full flex items-center justify-end px-4 text-[#000000] font-medium text-[13px]">{formatCurrency(t.subtotal)}</div></td>
                <td className="p-0"><div className="h-full flex items-center justify-end px-4"><span className="text-[#616A6B] font-normal text-[13px]">{t.taxRate.includes(':') ? t.taxRate.split(':')[0] : t.taxRate}</span></div></td>
                <td className="p-0"><div className="h-full flex items-center justify-end px-4 text-[#616A6B] font-normal text-[13px]">{formatCurrency(t.vat)}</div></td>
                <td className="p-0"><div className="h-full flex items-center justify-end px-4"><span className="font-medium text-[#000000] text-[13px]">{formatCurrency(t.totalAmount)}</span></div></td>
                <td className="p-0"><div className="h-full flex items-center justify-center px-4">{t.verified ? (<SealCheck size={20} weight="fill" className="text-[#E5E7EB]" />) : (<div className="w-4 h-4 rounded-full border border-[#E5E7EB]"></div>)}</div></td>
                <td className="p-0"><div className="h-full flex items-center justify-center px-4">{t.aiVerified ? (<SealCheck size={20} weight="fill" className="text-[#E5E7EB]" />) : (<WarningCircle size={20} weight="fill" className="text-[#FCD34D]" />)}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white py-3 flex justify-between items-center text-[13px] text-[#616A6B] flex-shrink-0 px-6 border-t border-[#E5E7EB]">
         <div><span className="font-medium text-[#000000]">{transactions.length}</span> expenses</div>
      </div>
    </div>
  );
};

export default ExpensesTable;