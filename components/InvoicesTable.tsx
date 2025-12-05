import React, { useState } from 'react';
import { Invoice } from '../types';
import { Trash, FileText, CheckCircle } from '@phosphor-icons/react';

interface InvoicesTableProps {
  invoices: Invoice[];
  statusFilter: 'All' | 'Open' | 'Paid' | 'Due';
}

const InvoicesTable: React.FC<InvoicesTableProps> = ({ invoices, statusFilter }) => {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const filteredInvoices = invoices.filter(inv => {
    if (statusFilter === 'All') return true;
    if (statusFilter === 'Open') return inv.status === 'Open' || inv.status === 'Draft';
    if (statusFilter === 'Due') return inv.status === 'Due';
    if (statusFilter === 'Paid') return inv.status === 'Paid';
    return true;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Open':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Due':
        return 'bg-[#002b31] text-white border-[#002b31]';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-2 border border-gray-200 rounded-lg">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0 bg-white">
        <table className="min-w-[1200px] text-[13px] text-left table-fixed w-full border-collapse">
          <thead className="bg-gray-50 text-gray-500 sticky top-0 z-10 h-[40px] shadow-md">
            <tr>
              <th className="px-4 font-medium text-[12px] w-[140px] text-gray-500 text-right">Total amount</th>
              <th className="px-4 font-medium text-[12px] w-[120px] text-gray-500 text-center">Status</th>
              <th className="px-4 font-medium text-[12px] w-[140px] text-gray-500">Invoice ID</th>
              <th className="px-4 font-medium text-[12px] w-[200px] text-gray-500">Customer</th>
              <th className="px-4 font-medium text-[12px] w-[80px] text-gray-500 text-center">Document</th>
              <th className="px-4 font-medium text-[12px] w-[120px] text-gray-500">Due date</th>
              <th className="px-4 font-medium text-[12px] w-[120px] text-gray-500">Date</th>
              <th className="px-4 font-medium text-[12px] w-[180px] text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredInvoices.map((inv, index) => (
              <tr 
                key={inv.id} 
                className={`group transition-colors border-b border-gray-50 h-[48px] ${
                  index % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'
                } hover:bg-gray-50`}
                onMouseEnter={() => setHoveredRowId(inv.id)}
                onMouseLeave={() => setHoveredRowId(null)}
              >
                <td className="p-0">
                  <div className={`h-full flex items-center justify-end px-4 font-medium tabular-nums ${inv.totalAmount < 0 ? 'text-red-600' : 'text-[#002b31]'}`}>
                    {formatCurrency(inv.totalAmount)}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center justify-center px-4">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${getStatusStyle(inv.status)} uppercase tracking-wide`}>
                      {inv.status}
                    </span>
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4 text-gray-900 font-medium">
                    {inv.invoiceId}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4 text-gray-700 truncate">
                    {inv.customer}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center justify-center px-4">
                    <button className="w-7 h-7 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-all">
                      <FileText size={14} weight="fill" />
                    </button>
                  </div>
                </td>
                <td className="p-0">
                  <div className={`h-full flex items-center px-4 tabular-nums text-[12px] ${inv.status === 'Due' ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                    {inv.dueDate}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4 tabular-nums text-[12px] text-gray-600">
                    {inv.date}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center justify-end px-4 gap-2">
                    {(inv.status === 'Open' || inv.status === 'Due') && (
                      <button className="bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] text-[11px] font-bold px-3 py-1.5 rounded shadow-sm transition-colors opacity-0 group-hover:opacity-100">
                        Register as paid
                      </button>
                    )}
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash size={16} />
                    </button>
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
            <span className="font-medium text-gray-700">{filteredInvoices.length}</span> invoices
         </div>
      </div>
    </div>
  );
};

export default InvoicesTable;
