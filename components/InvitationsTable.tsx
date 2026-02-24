import React, { useState } from 'react';
import { Invitation } from '../types';
import { Link, Copy } from '@phosphor-icons/react';

interface InvitationsTableProps {
  invitations: Invitation[];
}

const InvitationsTable: React.FC<InvitationsTableProps> = ({ invitations }) => {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'ACCEPTED': return 'bg-[#DCFCE7] text-[#166534] border-[#DCFCE7]';
      case 'INVITE SENT': return 'bg-[#DBEAFE] text-[#1E40AF] border-[#DBEAFE]';
      case 'EXPIRED': return 'bg-[#FEE2E2] text-[#991B1B] border-[#FEE2E2]';
      default: return 'bg-[#F3F4F6] text-[#616A6B] border-[#F3F4F6]';
    }
  };

  return (
    <div className="flex flex-col overflow-hidden mt-4 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto custom-scrollbar pb-0">
        <table className="min-w-[1000px] text-left table-fixed w-full border-collapse">
          <thead className="bg-white text-[#000000] sticky top-0 z-10 h-[48px]">
            <tr>
              <th className="px-4 font-medium text-[13px] w-[220px] shadow-[inset_0_-1px_0_#E5E7EB]">E-mail</th>
              <th className="px-4 font-medium text-[13px] w-[140px] shadow-[inset_0_-1px_0_#E5E7EB]">Phone</th>
              <th className="px-4 font-medium text-[13px] w-[140px] shadow-[inset_0_-1px_0_#E5E7EB]">First Name</th>
              <th className="px-4 font-medium text-[13px] w-[140px] shadow-[inset_0_-1px_0_#E5E7EB]">Last Name</th>
              <th className="px-4 font-medium text-[13px] w-[140px] shadow-[inset_0_-1px_0_#E5E7EB]">Status</th>
              <th className="px-4 font-medium text-[13px] w-[140px] shadow-[inset_0_-1px_0_#E5E7EB]">Last Updated</th>
              <th className="px-4 font-medium text-[13px] w-[200px] shadow-[inset_0_-1px_0_#E5E7EB]">Payment Link</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {invitations.map((inv) => (
              <tr key={inv.id} className={`group transition-colors h-[64px] border-b border-[#F3F4F6] last:border-0 ${hoveredRowId === inv.id ? 'bg-[#F9FAFB]' : 'bg-white'}`} onMouseEnter={() => setHoveredRowId(inv.id)} onMouseLeave={() => setHoveredRowId(null)}>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] font-medium truncate text-[13px]">{inv.email}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] truncate text-[13px] font-normal">{inv.phone}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] truncate text-[13px] font-normal">{inv.firstName}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] truncate text-[13px] font-normal">{inv.lastName}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4"><span className={`px-3 py-1 rounded-lg text-[12px] font-medium border ${getStatusStyle(inv.status)}`}>{inv.status}</span></div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px] font-normal">{inv.lastUpdated}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4">{inv.status === 'ACCEPTED' ? (<span className="text-[#616A6B] text-[13px] italic">Paid</span>) : (<div className="flex items-center gap-2 cursor-pointer hover:text-[#1E6F73] text-[#616A6B] transition-colors group/link"><Link size={16} /><span className="truncate max-w-[140px] text-[13px] underline decoration-[#D1D5DB] underline-offset-2 font-medium">{inv.paymentLink}</span><Copy size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" /></div>)}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white py-3 flex justify-between items-center text-[13px] text-[#616A6B] px-6 border-t border-[#E5E7EB]">
         <div><span className="font-medium text-[#000000]">{invitations.length}</span> results found</div>
      </div>
    </div>
  );
};

export default InvitationsTable;