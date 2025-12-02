import React, { useState } from 'react';
import { ExpenseTransaction } from '../types';
import { 
  FileText, 
  SealCheck,
  WarningCircle,
  Image
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
    <div className="flex flex-col flex-1 overflow-hidden mt-2 border border-gray-200 rounded-lg">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0 bg-white">
        <table className="min-w-[1400px] text-[13px] text-left table-fixed w-full border-collapse">
          {/* Header */}
          <thead className="bg-gray-50 text-gray-500 sticky top-0 z-10 h-[40px]">
            <tr>
              <th className="px-4 font-medium text-[12px] w-[100px] text-gray-500">Date</th>
              <th className="px-4 font-medium text-[12px] w-[180px] text-gray-500">Customer</th>
              <th className="px-4 font-medium text-[12px] w-[220px] text-gray-500">Category</th>
              <th className="px-4 font-medium text-[12px] w-[160px] text-gray-500">Receipt</th>
              <th className="px-4 font-medium text-[12px] w-[80px] text-center text-gray-500">Document</th>
              <th className="px-4 font-medium text-[12px] w-[60px] text-center text-gray-500">Rec.</th>
              <th className="px-4 font-medium text-[12px] w-[110px] text-right text-gray-500">Subtotal</th>
              <th className="px-4 font-medium text-[12px] w-[110px] text-right text-gray-500">Tax rate</th>
              <th className="px-4 font-medium text-[12px] w-[90px] text-right text-gray-500">VAT</th>
              <th className="px-4 font-medium text-[12px] w-[110px] text-right text-gray-500">Total</th>
              <th className="px-4 font-medium text-[12px] w-[80px] text-center text-gray-500">Verified</th>
              <th className="px-4 font-medium text-[12px] w-[80px] text-center text-gray-500">AI Ver.</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {transactions.map((t, index) => (
              <tr 
                key={t.id} 
                className={`group transition-colors border-b border-gray-50 h-[48px] ${
                  index % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'
                } hover:bg-gray-50`}
                onMouseEnter={() => setHoveredRowId(t.id)}
                onMouseLeave={() => setHoveredRowId(null)}
              >
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 font-medium tabular-nums">{t.date}</div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4 text-gray-900 font-medium truncate">
                     {t.customer}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4">
                     <span className="text-gray-600 font-medium truncate text-[13px]">
                       {t.category}
                     </span>
                  </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-500 text-[12px] truncate">{t.receipt}</div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center justify-center px-4">
                    {t.document ? (
                        <div className="w-6 h-8 bg-gray-100 border border-gray-200 rounded flex items-center justify-center cursor-pointer hover:border-gray-400">
                           <Image size={16} className="text-gray-400" />
                        </div>
                    ) : (
                       <span className="text-gray-300">-</span>
                    )}
                  </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-center px-4 text-green-600 font-bold text-[11px]">{t.reconciled && "✓"}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-end px-4 text-gray-900 font-medium tabular-nums">{formatCurrency(t.subtotal)}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-end px-4 tabular-nums text-gray-600 text-[12px]">
                       {t.taxRate.includes(':') ? t.taxRate.split(':')[0] : t.taxRate}
                   </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-end px-4 text-gray-900 font-medium tabular-nums">{formatCurrency(t.vat)}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-end px-4 tabular-nums">
                        <span className="font-bold text-[#004d40] text-[13px]">{formatCurrency(t.totalAmount)}</span>
                   </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center justify-center px-4">
                    {t.verified ? (
                       <SealCheck size={16} weight="fill" className="text-gray-200" />
                    ) : (
                       <div className="w-4 h-4 rounded-full border border-gray-200"></div>
                    )}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center justify-center px-4">
                    {t.aiVerified ? (
                        <SealCheck size={16} weight="fill" className="text-gray-200" />
                    ) : (
                        <WarningCircle size={16} weight="fill" className="text-orange-300" />
                    )}
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
            <span className="font-medium text-gray-700">{transactions.length}</span> expenses
         </div>
      </div>
    </div>
  );
};

export default ExpensesTable;