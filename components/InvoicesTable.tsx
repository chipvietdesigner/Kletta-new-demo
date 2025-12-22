import React, { useState } from 'react';
import { Invoice } from '../types';
import { Trash, FileText, PencilSimple, CheckCircle } from '@phosphor-icons/react';

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
        return 'bg-[#DCFCE7] text-[#166534] border-[#DCFCE7]';
      case 'Draft':
        return 'bg-[#FEF3C7] text-[#92400E] border-[#FEF3C7]';
      case 'Open':
        return 'bg-[#DBEAFE] text-[#1E40AF] border-[#DBEAFE]';
      case 'Due':
        return 'bg-[#FEE2E2] text-[#991B1B] border-[#FEE2E2]';
      default:
        return 'bg-[#F3F4F6] text-[#4B5563] border-[#F3F4F6]';
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-4 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0">
        <table className="min-w-[1200px] text-left table-fixed w-full border-collapse">
          <thead className="bg-[#F9FAFB] text-[#4B5563] sticky top-0 z-10 h-[48px] border-b border-[#E5E7EB]">
            <tr>
              <th className="px-4 font-semibold text-[13px] w-[120px]">Invoice #</th>
              <th className="px-4 font-semibold text-[13px] w-[100px]">Date</th>
              <th className="px-4 font-semibold text-[13px] w-[240px]">Customer</th>
              <th className="px-4 font-semibold text-[13px] w-[100px]">Due Date</th>
              <th className="px-4 font-semibold text-[13px] w-[120px] text-center">Status</th>
              <th className="px-4 font-semibold text-[13px] w-[80px] text-center">Doc</th>
              <th className="px-4 font-semibold text-[13px] w-[140px] text-right">Total</th>
              <th className="px-4 font-semibold text-[13px] w-[180px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredInvoices.map((inv) => (
              <tr 
                key={inv.id} 
                className={`group transition-colors border-b border-[#E5E7EB] h-[64px] ${
                   hoveredRowId === inv.id ? 'bg-[#F9FAFB]' : 'bg-white'
                }`}
                onMouseEnter={() => setHoveredRowId(inv.id)}
                onMouseLeave={() => setHoveredRowId(null)}
              >
                {/* Invoice ID */}
                <td className="p-0">
                  <div className="h-full flex items-center px-4 text-[#0F2F33] font-bold text-[13px]">
                    {inv.invoiceId}
                  </div>
                </td>

                {/* Date */}
                <td className="p-0">
                  <div className="h-full flex items-center px-4 tabular-nums text-[13px] text-[#4B5563] font-medium">
                    {inv.date}
                  </div>
                </td>

                {/* Customer */}
                <td className="p-0">
                  <div className="h-full flex items-center px-4 text-[#0F2F33] truncate text-[13px] font-bold hover:text-[#1E6F73] cursor-pointer transition-colors">
                    {inv.customer}
                  </div>
                </td>

                {/* Due Date */}
                <td className="p-0">
                  <div className={`h-full flex items-center px-4 tabular-nums text-[13px] ${inv.status === 'Due' ? 'text-[#991B1B] font-bold' : 'text-[#4B5563] font-medium'}`}>
                    {inv.dueDate}
                  </div>
                </td>

                {/* Status */}
                <td className="p-0">
                  <div className="h-full flex items-center justify-center px-4">
                    <span className={`px-3 py-1 rounded-lg text-[12px] font-bold border ${getStatusStyle(inv.status)}`}>
                      {inv.status}
                    </span>
                  </div>
                </td>

                {/* Document Icon */}
                <td className="p-0">
                  <div className="h-full flex items-center justify-center px-4">
                    {hoveredRowId === inv.id ? (
                        <button className="w-8 h-8 bg-white border border-[#E5E7EB] rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#0F2F33] hover:border-[#D1D5DB] transition-all shadow-sm">
                           <FileText size={16} />
                        </button>
                    ) : (
                        <FileText size={18} weight="fill" className="text-[#E5E7EB]" />
                    )}
                  </div>
                </td>

                {/* Total Amount */}
                <td className="p-0">
                  <div className={`h-full flex items-center justify-end px-4 font-bold tabular-nums text-[13px] ${inv.totalAmount < 0 ? 'text-[#0F2F33]' : 'text-[#1E6F73]'}`}>
                    {formatCurrency(inv.totalAmount)}
                  </div>
                </td>

                {/* Actions */}
                <td className="p-0">
                  <div className={`h-full flex items-center justify-end px-4 gap-2 transition-opacity duration-200 ${hoveredRowId === inv.id ? 'opacity-100' : 'opacity-0'}`}>
                    {(inv.status === 'Open' || inv.status === 'Due') && (
                      <button className="h-[36px] bg-[#F7D84A] hover:bg-[#FCD34D] text-[#0F3A3E] text-[12px] font-bold px-3 rounded-xl shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap">
                        <CheckCircle size={14} weight="bold" />
                        Mark paid
                      </button>
                    )}
                    <button className="h-[36px] w-[36px] flex items-center justify-center bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#0F2F33] rounded-xl transition-colors shadow-sm">
                       <PencilSimple size={16} />
                    </button>
                    <button className="h-[36px] w-[36px] flex items-center justify-center text-[#9CA3AF] hover:text-[#991B1B] hover:bg-[#FEF2F2] rounded-xl transition-colors">
                      <Trash size={18} />
                    </button>
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
            <span className="font-bold text-[#0F2F33]">{filteredInvoices.length}</span> invoices found
         </div>
      </div>
    </div>
  );
};

export default InvoicesTable;