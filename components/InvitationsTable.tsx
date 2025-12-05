
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
        return 'bg-green-100 text-green-800 border-green-200';
      case 'INVITE SENT':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'EXPIRED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'DRAFT':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-2 border border-gray-200 rounded-lg">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0 bg-white">
        <table className="min-w-[1000px] text-[13px] text-left table-fixed w-full border-collapse">
          <thead className="bg-gray-50 text-gray-500 sticky top-0 z-10 h-[40px] shadow-md">
            <tr>
              <th className="px-4 font-medium text-[12px] w-[220px] text-gray-500">E-mail</th>
              <th className="px-4 font-medium text-[12px] w-[140px] text-gray-500">Phone</th>
              <th className="px-4 font-medium text-[12px] w-[140px] text-gray-500">First Name</th>
              <th className="px-4 font-medium text-[12px] w-[140px] text-gray-500">Last Name</th>
              <th className="px-4 font-medium text-[12px] w-[140px] text-gray-500 text-center">Status</th>
              <th className="px-4 font-medium text-[12px] w-[140px] text-gray-500">Last Updated</th>
              <th className="px-4 font-medium text-[12px] w-[200px] text-gray-500">Payment Link</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {invitations.map((inv, index) => (
              <tr 
                key={inv.id} 
                className={`group transition-colors border-b border-gray-50 h-[48px] ${
                  index % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'
                } hover:bg-gray-50`}
                onMouseEnter={() => setHoveredRowId(inv.id)}
                onMouseLeave={() => setHoveredRowId(null)}
              >
                <td className="p-0">
                  <div className="h-full flex items-center px-4 text-gray-900 font-medium truncate hover:text-[#005c66] cursor-pointer transition-colors">
                    {inv.email}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4 text-gray-600 truncate tabular-nums">
                    {inv.phone}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4 text-gray-600 truncate">
                    {inv.firstName}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4 text-gray-600 truncate">
                    {inv.lastName}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center justify-center px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusStyle(inv.status)}`}>
                      {inv.status}
                    </span>
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4 text-gray-600 text-[12px]">
                    {inv.lastUpdated}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4">
                    {inv.status === 'ACCEPTED' ? (
                       <span className="text-gray-400 text-[12px] italic">Paid</span>
                    ) : (
                       <div className="flex items-center gap-2 cursor-pointer hover:text-[#004d40] text-gray-500 transition-colors group/link">
                          <Link size={16} />
                          <span className="truncate max-w-[140px] text-[12px] underline decoration-gray-300 underline-offset-2">
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
       {/* Footer Summary */}
      <div className="bg-white py-2 flex justify-between items-center text-[12px] text-gray-500 flex-shrink-0 px-4 border-t border-gray-100">
         <div>
            <span className="font-medium text-gray-700">{invitations.length}</span> invitations
         </div>
      </div>
    </div>
  );
};

export default InvitationsTable;
