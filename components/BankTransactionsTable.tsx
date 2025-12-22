import React, { useState } from 'react';
import { BankTransaction, ReconciledItem } from '../types';
import { X, Receipt, FileText, Image } from '@phosphor-icons/react';

interface BankTransactionsTableProps {
  data: BankTransaction[];
  onReconcile?: (transaction: BankTransaction) => void;
}

const BankTransactionsTable: React.FC<BankTransactionsTableProps> = ({ data, onReconcile }) => {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    // Keep sign for display if negative, add + if positive
    const formatted = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(Math.abs(amount));
    return amount >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  // Helper for pill styles
  const getPillStyle = (item: ReconciledItem) => {
    // Override color if specified in data
    if (item.pillColor === 'yellow') return 'bg-[#FDE047] border-[#FDE047] text-[#0F3A3E] hover:bg-[#FCD34D]'; // Yellowish for Income
    if (item.pillColor === 'gray') return 'bg-[#F3F4F6] border-[#F3F4F6] text-[#0F2F33] hover:bg-[#E5E7EB]'; // Grayish for Expense/Other
    
    // Fallback logic
    if (item.type === 'Income' || item.amount > 0) return 'bg-[#FDE047] border-[#FDE047] text-[#0F3A3E] hover:bg-[#FCD34D]'; 
    return 'bg-[#F3F4F6] border-[#F3F4F6] text-[#0F2F33] hover:bg-[#E5E7EB]';
  };

  const getIcon = (item: ReconciledItem) => {
    if (item.iconType === 'receipt') return <div className="p-0.5"><Image size={14} weight="bold" className="text-[#6B7280]" /></div>;
    if (item.iconType === 'invoice' || item.type === 'Invoice') return <div className="p-0.5"><FileText size={14} className="text-[#6B7280]" /></div>;
    return null;
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-4 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0">
        <table className="min-w-[1600px] text-left table-fixed w-full border-collapse">
          {/* Header */}
          <thead className="bg-[#F9FAFB] text-[#4B5563] sticky top-0 z-10 h-[48px] border-b border-[#E5E7EB]">
            <tr>
              <th className="px-4 font-semibold text-[13px] w-[140px] flex items-center gap-1 cursor-pointer hover:text-[#0F2F33] transition-colors group h-full">
                Date 
                <span className="text-[10px] text-[#9CA3AF] group-hover:text-[#6B7280]">↓↑</span>
              </th>
              <th className="px-4 font-semibold text-[13px] w-[140px]">Amount</th>
              <th className="px-4 font-semibold text-[13px] w-[240px]">Description</th>
              <th className="px-4 font-semibold text-[13px] w-[120px]">Reference</th>
              <th className="px-4 font-semibold text-[13px] w-[420px]">Reconciled</th>
              <th className="px-4 font-semibold text-[13px] w-[280px]">Category</th>
              <th className="px-4 font-semibold text-[13px] w-[100px] text-right">ID</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((t, index) => (
              <tr 
                key={t.id} 
                className={`group transition-colors border-b border-[#E5E7EB] min-h-[64px] ${
                  hoveredRowId === t.id ? 'bg-[#F9FAFB]' : 'bg-white'
                }`}
                onMouseEnter={() => setHoveredRowId(t.id)}
                onMouseLeave={() => setHoveredRowId(null)}
              >
                {/* Date */}
                <td className="px-4 py-3 align-middle">
                   <div className="text-[#4B5563] font-medium tabular-nums text-[13px]">{t.date}</div>
                </td>

                {/* Amount */}
                <td className="px-4 py-3 align-middle">
                   <div className={`text-[13px] font-bold tabular-nums ${t.amount >= 0 ? 'text-[#10B981]' : 'text-[#0F2F33]'}`}>
                      {formatCurrency(t.amount)}
                   </div>
                </td>

                {/* Description */}
                <td className="px-4 py-3 align-middle">
                  <div className="text-[#0F2F33] font-bold text-[13px] leading-snug">
                     {t.description}
                  </div>
                </td>

                {/* Reference */}
                <td className="px-4 py-3 align-middle">
                   <div className="text-[#4B5563] text-[13px] font-medium">{t.reference || '-'}</div>
                </td>

                {/* Reconciled (Pills Stack) */}
                <td className="px-4 py-3 align-middle">
                   <div className="flex flex-col gap-2">
                     {!t.reconciled || !t.reconciledItems || t.reconciledItems.length === 0 ? (
                        <div className="self-start">
                           <button 
                             onClick={() => onReconcile && onReconcile(t)}
                             className="h-[30px] px-3 bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] rounded-full text-[13px] font-medium text-[#0F2F33] transition-colors shadow-sm whitespace-nowrap flex items-center gap-2"
                           >
                             <span className="text-[#9CA3AF]">—</span> Unreconciled
                           </button>
                        </div>
                     ) : (
                       t.reconciledItems.map((item, idx) => (
                         <div 
                           key={idx} 
                           onClick={() => onReconcile && onReconcile(t)}
                           className={`flex items-center justify-between px-3 py-1.5 rounded-full border text-[12px] font-medium w-full max-w-[380px] transition-all cursor-pointer ${getPillStyle(item)}`}
                         >
                            <div className="flex items-center gap-3 overflow-hidden min-w-0">
                               <span className="font-bold whitespace-nowrap tabular-nums tracking-tight min-w-[70px]">
                                 {formatCurrency(item.amount)}
                               </span>
                               <div className="flex items-center gap-1.5 truncate">
                                  {getIcon(item)}
                                  <span className="truncate flex items-center gap-1">
                                    <span className="font-bold whitespace-nowrap">{item.label}</span>
                                    <span className="opacity-60 text-[10px] mx-1">•</span>
                                    <span className="opacity-80 font-normal truncate">{item.description}</span>
                                  </span>
                               </div>
                            </div>
                            <button className="ml-2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors text-current opacity-60 hover:opacity-100 flex-shrink-0">
                               <X size={12} weight="bold" />
                            </button>
                         </div>
                       ))
                     )}
                   </div>
                </td>

                {/* Category Chips */}
                <td className="px-4 py-3 align-middle">
                   <div className="flex flex-col gap-2 items-start">
                      {t.reconciledItems && t.reconciledItems.length > 0 ? (
                        t.reconciledItems.map((item, idx) => (
                          <span 
                            key={idx} 
                            className={`px-3 py-1.5 rounded-full text-[12px] font-bold border truncate max-w-full ${
                               item.pillColor === 'yellow' || (item.categoryLabel?.toLowerCase().includes('income') && !item.categoryLabel?.toLowerCase().includes('business'))
                                 ? 'bg-[#FDE047] border-[#FDE047] text-[#0F3A3E]' // Yellow for income cats
                                 : 'bg-[#F3F4F6] border-[#F3F4F6] text-[#0F2F33]' // Gray for others
                            }`}
                          >
                            {item.categoryLabel || '— Uncategorized'}
                          </span>
                        ))
                      ) : (
                        <span className="px-3 py-1.5 rounded-full text-[12px] font-medium border bg-white border-[#E5E7EB] text-[#0F2F33] shadow-sm">
                           — Uncategorized
                        </span>
                      )}
                   </div>
                </td>

                {/* ID */}
                <td className="px-4 py-3 align-middle text-right">
                   <div className="text-[#6B7280] text-[12px] font-medium">{t.id}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="bg-white py-3 flex justify-between items-center text-[13px] text-[#4B5563] flex-shrink-0 px-6 border-t border-[#E5E7EB]">
         <div>
            <span className="font-bold text-[#0F2F33]">{data.length}</span> results
         </div>
      </div>
    </div>
  );
};

export default BankTransactionsTable;