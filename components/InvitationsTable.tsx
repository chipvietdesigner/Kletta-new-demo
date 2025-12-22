import React, { useState } from 'react';
import { Invitation } from '../types';
import { 
  Link,
  Copy
} from '@phosphor-icons/react';

interface InvitationsTableProps {
  invitations: Invitation[];
}

const InvitationsTable: React.FC<InvitationsTableProps> = ({ invitations }) => {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'ACCEPTED':
        return 'bg-[#DCFCE7] text-[#166534] border-[#DCFCE7]';
      case 'INVITE SENT':
        return 'bg-[#DBEAFE] text-[#1E40AF] border-[#DBEAFE]';
      case 'EXPIRED':
        return 'bg-[#FEE2E2] text-[#991B1B] border-[#FEE2E2]';
      case 'DRAFT':
        return 'bg-[#F3F4F6] text-[#4B5563] border-[#F3F4F6]';
      case 'PENDING':
        return 'bg-[#FEF3C7] text-[#92400E] border-[#FEF3C7]';
      default:
        return 'bg-[#F3F4F6] text-[#4B5563] border-[#F3F4F6]';
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-4 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0">
        <table className="min-w-[1000px] text-left table-fixed w-full border-collapse">
          {/* Header */}
          <thead className="bg-[#F9FAFB] text-[#4B5563] sticky top-0 z-10 h-[48px] border-b border-[#E5E7EB]">
            <tr>
              <th className="px-4 font-semibold text-[13px] w-[220px]">E-mail</th>
              <th className="px-4 font-semibold text-[13px] w-[140px]">Phone</th>
              <th className="px-4 font-semibold text-[13px] w-[140px]">First Name</th>
              <th className="px-4 font-semibold text-[13px] w-[140px]">Last Name</th>
              <th className="px-4 font-semibold text-[13px] w-[140px] text-center">Status</th>
              <th className="px-4 font-semibold text-[13px] w-[140px]">Last Updated</th>
              <th className="px-4 font-semibold text-[13px] w-[200px]">Payment Link</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {invitations.map((inv, index) => (
              <tr 
                key={inv.id} 
                className={`group transition-colors border-b border-[#E5E7EB] h-[64px] ${
                  hoveredRowId === inv.id ? 'bg-[#F9FAFB]' : 'bg-white'
                }`}
                onMouseEnter={() => setHoveredRowId(inv.id)}
                onMouseLeave={() => setHoveredRowId(null)}
              >
                <td className="p-0">
                  <div className="h-full flex items-center px-4 text-[#0F2F33] font-bold truncate hover:text-[#1E6F73] cursor-pointer transition-colors text-[13px]">
                    {inv.email}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4 text-[#4B5563] truncate tabular-nums text-[13px] font-medium">
                    {inv.phone}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4 text-[#4B5563] truncate text-[13px] font-medium">
                    {inv.firstName}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4 text-[#4B5563] truncate text-[13px] font-medium">
                    {inv.lastName}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center justify-center px-4">
                    <span className={`px-3 py-1 rounded-lg text-[12px] font-bold border ${getStatusStyle(inv.status)}`}>
                      {inv.status}
                    </span>
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4 text-[#6B7280] text-[13px]">
                    {inv.lastUpdated}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4">
                    {inv.status === 'ACCEPTED' ? (
                       <span className="text-[#9CA3AF] text-[13px] italic">Paid</span>
                    ) : (
                       <div className="flex items-center gap-2 cursor-pointer hover:text-[#1E6F73] text-[#6B7280] transition-colors group/link">
                          <Link size={16} />
                          <span className="truncate max-w-[140px] text-[13px] underline decoration-[#D1D5DB] underline-offset-2 font-medium">
                            {inv.paymentLink}
                          </span>
                          <Copy size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                       </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       {/* Footer */}
      <div className="bg-white py-3 flex justify-between items-center text-[13px] text-[#4B5563] flex-shrink-0 px-6 border-t border-[#E5E7EB]">
         <div>
            <span className="font-bold text-[#0F2F33]">{invitations.length}</span> invitations
         </div>
      </div>
    </div>
  );
};

export default InvitationsTable;