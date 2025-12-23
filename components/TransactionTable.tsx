import React, { useState } from 'react';
import { IncomeTransaction } from '../types';
import { FileText, SealCheck } from '@phosphor-icons/react';

interface TransactionTableProps {
  transactions: IncomeTransaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);

  const calculateTotals = () => {
    const subtotal = transactions.reduce((sum, t) => sum + t.subtotal, 0);
    const vat = transactions.reduce((sum, t) => sum + t.vat, 0);
    const total = transactions.reduce((sum, t) => sum + t.totalAmount, 0);
    return { subtotal, vat, total };
  };
  const totals = calculateTotals();

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-4 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0">
        <table className="min-w-[1900px] text-left table-fixed w-full border-collapse">
          <thead className="bg-[#F9FAFB] text-[#616A6B] sticky top-0 z-10 h-[48px] border-b border-[#E5E7EB]">
            <tr>
              <th className="px-4 font-normal text-[13px] w-[100px]">Date</th>
              <th className="px-4 font-normal text-[13px] w-[240px]">Customer</th>
              <th className="px-4 font-normal text-[13px] w-[240px]">Category</th>
              <th className="px-4 font-normal text-[13px] w-[130px]">Type ID</th>
              <th className="px-4 font-normal text-[13px] w-[140px]">Method</th>
              <th className="px-4 font-normal text-[13px] w-[100px]">Due Date</th>
              <th className="px-4 font-normal text-[13px] w-[60px] text-center">Doc</th>
              <th className="px-4 font-normal text-[13px] w-[120px]">Reference</th>
              <th className="px-4 font-normal text-[13px] w-[130px]">Project</th>
              <th className="px-4 font-normal text-[13px] w-[120px]">Cost Center</th>
              <th className="px-4 font-normal text-[13px] w-[140px]">Created By</th>
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
                <td className="p-0"><div className="h-full flex flex-col justify-center px-4 overflow-hidden"><div className="text-[#000000] font-medium cursor-pointer hover:text-[#1E6F73] transition-colors truncate text-[13px]">{t.customer}</div>{t.description && (<div className="text-[#616A6B] text-[12px] truncate mt-0.5 font-normal">{t.description}</div>)}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4"><span className="text-[#000000] text-[13px] font-medium">{t.category}</span></div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px] font-normal">{t.typeId}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px] font-normal">{t.paymentMethod}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px] font-normal">{t.dueDate}</div></td>
                <td className="p-0"><div className="h-full flex items-center justify-center px-4">{t.hasDocument ? (<FileText size={18} className="text-[#616A6B] hover:text-[#000000] cursor-pointer transition-colors" />) : (<span className="text-[#E5E7EB]">-</span>)}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px]">{t.reference}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px]">{t.project || '-'}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px]">{t.costCenter || '-'}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px]">{t.createdBy}</div></td>
                <td className="p-0"><div className="h-full flex items-center justify-center px-4 text-[#000000] font-medium text-[13px]">{t.reconciled && "✓"}</div></td>
                <td className="p-0"><div className="h-full flex items-center justify-end px-4 text-[#000000] font-medium text-[13px]">{formatCurrency(t.subtotal)}</div></td>
                <td className="p-0"><div className="h-full flex items-center justify-end px-4"><span className="font-medium text-[#616A6B] text-[13px]">{t.taxRate.split(':')[0]}</span></div></td>
                <td className="p-0"><div className="h-full flex items-center justify-end px-4 text-[#616A6B] font-medium text-[13px]">{formatCurrency(t.vat)}</div></td>
                <td className="p-0"><div className="h-full flex items-center justify-end px-4"><span className="font-medium text-[#000000] text-[13px]">{formatCurrency(t.totalAmount)}</span></div></td>
                <td className="p-0"><div className="h-full flex items-center justify-center px-4">{t.isVerified && <SealCheck size={20} weight="fill" className="text-[#E5E7EB]" />}</div></td>
                <td className="p-0"><div className="h-full flex items-center justify-center px-4">{t.isAiVerified && <SealCheck size={20} weight="fill" className="text-[#E5E7EB]" />}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white py-3 flex justify-between items-center text-[13px] text-[#616A6B] px-6 border-t border-[#E5E7EB]">
         <div><span className="font-medium text-[#000000]">{transactions.length}</span> results</div>
         <div className="flex gap-6">
            <span className="flex items-center gap-2 text-[#616A6B]">Subtotal: <span className="font-medium text-[#000000]">{formatCurrency(totals.subtotal)}</span></span>
            <div className="w-px h-4 bg-[#E5E7EB]"></div>
            <span className="flex items-center gap-2 text-[#616A6B]">VAT: <span className="font-medium text-[#000000]">{formatCurrency(totals.vat)}</span></span>
            <div className="w-px h-4 bg-[#E5E7EB]"></div>
            <span className="flex items-center gap-2 text-[#616A6B]">Total: <span className="font-medium text-[#000000]">{formatCurrency(totals.total)}</span></span>
         </div>
      </div>
    </div>
  );
};

export default TransactionTable;