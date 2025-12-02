
import React, { useState } from 'react';
import { BankTransaction } from '../types';
import { Check } from '@phosphor-icons/react';

interface BankTransactionsTableProps {
  data: BankTransaction[];
}

const BankTransactionsTable: React.FC<BankTransactionsTableProps> = ({ data }) => {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-2 border border-gray-200 rounded-lg">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0 bg-white">
        <table className="min-w-[1000px] text-[13px] text-left table-fixed w-full border-collapse">
          {/* Header */}
          <thead className="bg-gray-50 text-gray-500 sticky top-0 z-10 h-[40px] shadow-md">
            <tr>
              <th className="px-4 font-medium text-[12px] w-[100px] text-gray-500">ID</th>
              <th className="px-4 font-medium text-[12px] w-[100px] text-gray-500">Date</th>
              <th className="px-4 font-medium text-[12px] w-[280px] text-gray-500">Description</th>
              <th className="px-4 font-medium text-[12px] w-[150px] text-gray-500">Category</th>
              <th className="px-4 font-medium text-[12px] w-[80px] text-center text-gray-500">Reconciled</th>
              <th className="px-4 font-medium text-[12px] w-[120px] text-gray-500">Reference</th>
              <th className="px-4 font-medium text-[12px] w-[120px] text-right text-gray-500">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((t, index) => (
              <tr 
                key={t.id} 
                className={`group transition-colors border-b border-gray-50 h-[48px] ${
                  index % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'
                } hover:bg-[#FFDD33]/20`}
                onMouseEnter={() => setHoveredRowId(t.id)}
                onMouseLeave={() => setHoveredRowId(null)}
              >
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-500 text-[12px] tabular-nums">{t.id}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 font-medium tabular-nums">{t.date}</div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4 text-gray-900 font-medium truncate">
                     {t.description}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4">
                     <span className="text-gray-600 font-medium truncate text-[13px] bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                       {t.category}
                     </span>
                  </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-center px-4">
                     {t.reconciled && <Check size={16} weight="bold" className="text-green-600" />}
                   </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-500 text-[12px] font-mono">{t.reference}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-end px-4 tabular-nums font-bold">
                        <span className={t.amount < 0 ? 'text-gray-900' : 'text-green-700'}>
                          {formatCurrency(t.amount)}
                        </span>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer Summary */}
      <div className="bg-white py-2 flex justify-between items-center text-[12px] text-gray-500 flex-shrink-0 px-4 border-t border-gray-100">
         <div>
            <span className="font-medium text-gray-700">{data.length}</span> transactions
         </div>
      </div>
    </div>
  );
};

export default BankTransactionsTable;
