import React, { useState } from 'react';
import { BankTransaction, ReconciledItem } from '../types';
import { X, FileText, Image } from '@phosphor-icons/react';

interface BankTransactionsTableProps {
  data: BankTransaction[];
  onReconcile?: (transaction: BankTransaction) => void;
}

const BankTransactionsTable: React.FC<BankTransactionsTableProps> = ({ data, onReconcile }) => {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(Math.abs(amount));
    return amount >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  const getPillStyle = (item: ReconciledItem) => {
    if (item.pillColor === 'yellow' || item.type === 'Income') return 'bg-[#FDE047] border-[#FDE047] text-[#000000] hover:bg-[#FCD34D]'; 
    return 'bg-[#F3F4F6] border-[#F3F4F6] text-[#000000] hover:bg-[#E5E7EB]';
  };

  const getIcon = (item: ReconciledItem) => {
    if (item.iconType === 'receipt') return <div className="p-0.5"><Image size={14} weight="bold" className="text-[#616A6B]" /></div>;
    if (item.iconType === 'invoice' || item.type === 'Invoice') return <div className="p-0.5"><FileText size={14} className="text-[#616A6B]" /></div>;
    return null;
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-4 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0">
        <table className="min-w-[1600px] text-left table-fixed w-full border-collapse">
          <thead className="bg-[#F9FAFB] text-[#616A6B] sticky top-0 z-10 h-[48px] border-b border-[#E5E7EB]">
            <tr>
              <th className="px-4 font-normal text-[13px] w-[140px] flex items-center gap-1 cursor-pointer hover:text-[#000000] transition-colors group h-full">Date</th>
              <th className="px-4 font-normal text-[13px] w-[140px]">Amount</th>
              <th className="px-4 font-normal text-[13px] w-[240px]">Description</th>
              <th className="px-4 font-normal text-[13px] w-[120px]">Reference</th>
              <th className="px-4 font-normal text-[13px] w-[420px]">Reconciled</th>
              <th className="px-4 font-normal text-[13px] w-[280px]">Category</th>
              <th className="px-4 font-normal text-[13px] w-[100px] text-right">ID</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((t) => (
              <tr key={t.id} className={`group transition-colors border-b border-[#E5E7EB] min-h-[64px] ${hoveredRowId === t.id ? 'bg-[#F9FAFB]' : 'bg-white'}`} onMouseEnter={() => setHoveredRowId(t.id)} onMouseLeave={() => setHoveredRowId(null)}>
                <td className="px-4 py-3 align-middle"><div className="text-[#616A6B] font-normal text-[13px]">{t.date}</div></td>
                <td className="px-4 py-3 align-middle"><div className={`text-[13px] font-medium ${t.amount >= 0 ? 'text-[#10B981]' : 'text-[#000000]'}`}>{formatCurrency(t.amount)}</div></td>
                <td className="px-4 py-3 align-middle"><div className="text-[#000000] font-medium text-[13px] leading-snug">{t.description}</div></td>
                <td className="px-4 py-3 align-middle"><div className="text-[#616A6B] text-[13px] font-normal">{t.reference || '-'}</div></td>
                <td className="px-4 py-3 align-middle">
                   <div className="flex flex-col gap-2">
                     {!t.reconciled || !t.reconciledItems || t.reconciledItems.length === 0 ? (
                        <div className="self-start"><button onClick={() => onReconcile && onReconcile(t)} className="h-[30px] px-3 bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] rounded-full text-[13px] font-medium text-[#000000] transition-colors shadow-sm whitespace-nowrap flex items-center gap-2"><span className="text-[#616A6B]">—</span> Unreconciled</button></div>
                     ) : (t.reconciledItems.map((item, idx) => (
                         <div key={idx} onClick={() => onReconcile && onReconcile(t)} className={`flex items-center justify-between px-3 py-1.5 rounded-full border text-[12px] font-medium w-full max-w-[380px] transition-all cursor-pointer ${getPillStyle(item)}`}>
                            <div className="flex items-center gap-3 overflow-hidden min-w-0"><span className="font-medium whitespace-nowrap tracking-tight min-w-[70px]">{formatCurrency(item.amount)}</span><div className="flex items-center gap-1.5 truncate">{getIcon(item)}<span className="truncate flex items-center gap-1"><span className="font-medium whitespace-nowrap">{item.label}</span><span className="opacity-60 text-[10px] mx-1">•</span><span className="opacity-80 font-normal truncate">{item.description}</span></span></div></div>
                            <button className="ml-2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors text-current opacity-60 hover:opacity-100 flex-shrink-0"><X size={12} weight="bold" /></button>
                         </div>
                       )))}
                   </div>
                </td>
                <td className="px-4 py-3 align-middle">
                   <div className="flex flex-col gap-2 items-start">{t.reconciledItems && t.reconciledItems.length > 0 ? (t.reconciledItems.map((item, idx) => (
                          <span key={idx} className={`px-3 py-1.5 rounded-full text-[12px] font-medium border truncate max-w-full ${item.pillColor === 'yellow' || (item.categoryLabel?.toLowerCase().includes('income')) ? 'bg-[#FDE047] border-[#FDE047] text-[#000000]' : 'bg-[#F3F4F6] border-[#F3F4F6] text-[#000000]'}`}>{item.categoryLabel || '— Uncategorized'}</span>
                        ))) : (<span className="px-3 py-1.5 rounded-full text-[12px] font-medium border bg-white border-[#E5E7EB] text-[#000000] shadow-sm">— Uncategorized</span>)}
                   </div>
                </td>
                <td className="px-4 py-3 align-middle text-right"><div className="text-[#616A6B] text-[12px] font-normal">{t.id}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white py-3 flex justify-between items-center text-[13px] text-[#616A6B] flex-shrink-0 px-6 border-t border-[#E5E7EB]">
         <div><span className="font-medium text-[#000000]">{data.length}</span> results</div>
      </div>
    </div>
  );
};

export default BankTransactionsTable;