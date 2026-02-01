import React, { useState } from 'react';
import { Invoice, InvoiceStatus } from '../types';
import { Trash, FileText, PencilSimple, CheckCircle } from '@phosphor-icons/react';

interface InvoicesTableProps {
  invoices: Invoice[];
  statusFilter: 'All' | 'Open' | 'Paid' | 'Due';
}

const InvoicesTable: React.FC<InvoicesTableProps> = ({ invoices, statusFilter }) => {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);
  
  const filteredInvoices = invoices.filter(inv => {
    if (statusFilter === 'All') return true;
    if (statusFilter === 'Open') return inv.status === 'Open' || inv.status === 'Draft';
    if (statusFilter === 'Due') return inv.status === 'Due';
    if (statusFilter === 'Paid') return inv.status === 'Paid';
    return true;
  });

  const getStatusStyle = (status: InvoiceStatus) => {
    switch (status) {
      case 'Draft':
        return 'bg-[#F3F4F6] text-[#616A6B] border-[#E5E7EB]';
      case 'Open':
        return 'bg-[#DBEAFE] text-[#1E40AF] border-[#DBEAFE]';
      case 'Paid':
        return 'bg-[#DCFCE7] text-[#166534] border-[#DCFCE7]';
      case 'Due':
        return 'bg-[#FEE2E2] text-[#991B1B] border-[#FEE2E2]';
      default:
        return 'bg-[#F3F4F6] text-[#616A6B] border-[#F3F4F6]';
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-4 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0">
        <table className="min-w-[1200px] text-left table-fixed w-full border-collapse">
          <thead className="bg-white text-[#000000] sticky top-0 z-10 h-[48px]">
            <tr>
              <th className="px-4 font-medium text-[13px] w-[120px] shadow-[inset_0_-1px_0_#E5E7EB]">Invoice #</th>
              <th className="px-4 font-medium text-[13px] w-[100px] shadow-[inset_0_-1px_0_#E5E7EB]">Date</th>
              <th className="px-4 font-medium text-[13px] w-[240px] shadow-[inset_0_-1px_0_#E5E7EB]">Customer</th>
              <th className="px-4 font-medium text-[13px] w-[100px] shadow-[inset_0_-1px_0_#E5E7EB]">Due Date</th>
              <th className="px-4 font-medium text-[13px] w-[120px] text-center shadow-[inset_0_-1px_0_#E5E7EB]">Status</th>
              <th className="px-4 font-medium text-[13px] w-[80px] text-center shadow-[inset_0_-1px_0_#E5E7EB]">Doc</th>
              <th className="px-4 font-medium text-[13px] w-[140px] text-right shadow-[inset_0_-1px_0_#E5E7EB]">Total</th>
              <th className="px-4 font-medium text-[13px] w-[180px] text-right shadow-[inset_0_-1px_0_#E5E7EB]">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredInvoices.map((inv, index) => {
              const isRowHovered = hoveredRowId === inv.id;
              const bgClass = isRowHovered ? 'bg-[#F3F4F6]' : (index % 2 === 1 ? 'bg-[#F9F9F9]' : 'bg-white');
              
              return (
                <tr key={inv.id} className={`group transition-colors h-[64px] ${bgClass}`} onMouseEnter={() => setHoveredRowId(inv.id)} onMouseLeave={() => setHoveredRowId(null)}>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] font-medium text-[13px]">{inv.invoiceId}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] font-normal text-[13px]">{inv.date}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] truncate text-[13px] font-medium hover:text-[#1E6F73] cursor-pointer transition-colors">{inv.customer}</div></td>
                  <td className="p-0"><div className={`h-full flex items-center px-4 text-[13px] ${inv.status === 'Due' ? 'text-[#991B1B] font-medium' : 'text-[#616A6B] font-normal'}`}>{inv.dueDate}</div></td>
                  <td className="p-0">
                    <div className="h-full flex items-center justify-center px-4">
                      <span className={`px-3 py-1 rounded-lg text-[12px] font-medium border ${getStatusStyle(inv.status)}`}>
                        {inv.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="h-full flex items-center justify-center px-4">
                      <button className="w-[26px] h-[34px] rounded border border-[#E5E7EB] overflow-hidden shadow-sm hover:border-[#1E6F73] transition-all bg-[#f9fafb] flex-shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1626262323430-39bc79bc052c?q=80&w=200&auto=format&fit=crop" 
                          alt="Invoice thumbnail"
                          className="w-full h-full object-cover block"
                        />
                      </button>
                    </div>
                  </td>
                  <td className="p-0"><div className="h-full flex items-center justify-end px-4 font-medium text-[13px] text-[#000000]">{formatCurrency(inv.totalAmount)}</div></td>
                  <td className="p-0"><div className={`h-full flex items-center justify-end px-4 gap-2 transition-opacity duration-200 ${hoveredRowId === inv.id ? 'opacity-100' : 'opacity-0'}`}>{(inv.status === 'Open' || inv.status === 'Due') && (<button className="h-[36px] bg-[#F7D84A] hover:bg-[#FCD34D] text-[#0F3A3E] text-[12px] font-medium px-3 rounded-xl shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap"><CheckCircle size={14} weight="bold" />Mark paid</button>)}<button className="h-[36px] w-[36px] flex items-center justify-center bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#000000] rounded-xl transition-colors shadow-sm"><PencilSimple size={16} /></button><button className="h-[36px] w-[36px] flex items-center justify-center text-[#616A6B] hover:text-[#991B1B] hover:bg-[#FEF2F2] rounded-xl transition-colors"><Trash size={18} /></button></div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="bg-white py-3 flex justify-between items-center text-[13px] text-[#616A6B] px-6 border-t border-[#E5E7EB]">
         <div><span className="font-medium text-[#000000]">{filteredInvoices.length}</span> results found</div>
      </div>
    </div>
  );
};

export default InvoicesTable;