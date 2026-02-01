import React, { useState } from 'react';
import { Client } from '../types';
import { SealCheck, SignIn, PencilSimple } from '@phosphor-icons/react';

interface ClientTableProps {
  clients: Client[];
}

const ClientTable: React.FC<ClientTableProps> = ({ clients }) => {
  const [hoveredRowId, setHoveredRowId] = useState<number | null>(null);

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-4 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0">
        <table className="min-w-[1800px] text-left border-collapse table-fixed w-full">
          <thead className="bg-white text-[#000000] sticky top-0 z-10 h-[48px]">
            <tr>
              <th className="px-4 font-medium text-[13px] w-[60px] text-center shadow-[inset_0_-1px_0_#E5E7EB]">#</th>
              <th className="px-4 font-medium text-[13px] w-[240px] shadow-[inset_0_-1px_0_#E5E7EB]">E-mail</th>
              <th className="px-4 font-medium text-[13px] w-[180px] shadow-[inset_0_-1px_0_#E5E7EB]">Country</th>
              <th className="px-4 font-medium text-[13px] w-[140px] shadow-[inset_0_-1px_0_#E5E7EB]">Plan</th>
              <th className="px-4 font-medium text-[13px] w-[140px] shadow-[inset_0_-1px_0_#E5E7EB]">UTR</th>
              <th className="px-4 font-medium text-[13px] w-[140px] text-center shadow-[inset_0_-1px_0_#E5E7EB]">Prepayment</th>
              <th className="px-4 font-medium text-[13px] w-[180px] shadow-[inset_0_-1px_0_#E5E7EB]">Company Name</th>
              <th className="px-4 font-medium text-[13px] w-[140px] shadow-[inset_0_-1px_0_#E5E7EB]">First Name</th>
              <th className="px-4 font-medium text-[13px] w-[140px] shadow-[inset_0_-1px_0_#E5E7EB]">Last Name</th>
              <th className="px-4 font-medium text-[13px] w-[150px] shadow-[inset_0_-1px_0_#E5E7EB]">Phone</th>
              <th className="px-4 font-medium text-[13px] w-[180px] shadow-[inset_0_-1px_0_#E5E7EB]">Sales Person</th>
              <th className="px-4 font-medium text-[13px] w-[280px] shadow-[inset_0_-1px_0_#E5E7EB]">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {clients.map((c, index) => {
              const isRowHovered = hoveredRowId === c.id;
              const bgClass = isRowHovered ? 'bg-[#F3F4F6]' : (index % 2 === 1 ? 'bg-[#F9F9F9]' : 'bg-white');
              
              return (
                <tr key={c.id} className={`group transition-colors h-[64px] ${bgClass}`} onMouseEnter={() => setHoveredRowId(c.id)} onMouseLeave={() => setHoveredRowId(null)}>
                  <td className="p-0"><div className="h-full flex items-center justify-center px-4 text-[#616A6B] font-normal text-[13px]">{index + 1}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] font-medium truncate text-[13px]">{c.email}</div></td>
                  <td className="p-0">
                    <div className="h-full flex items-center gap-2 px-4 text-[13px]">
                      <span className="text-[18px]">{c.countryCode === 'FI' ? '🇫🇮' : '🇬🇧'}</span>
                      <span className="text-[#616A6B] font-normal">{c.countryCode === 'FI' ? 'Finland' : 'United Kingdom'}</span>
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="h-full flex items-center px-4">
                      <span className="px-3 py-1 rounded-lg text-[12px] font-medium border bg-[#DBEAFE] text-[#1E40AF] border-[#DBEAFE]">
                        {c.plan}
                      </span>
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="h-full flex items-center px-4 text-[#616A6B] text-[13px] font-normal">
                      <div className="flex items-center gap-2">
                        <span>{c.utr}</span>
                        {c.isUtrVerified ? (
                          <SealCheck size={16} weight="fill" className="text-[#166534]" />
                        ) : (
                          <SealCheck size={16} weight="regular" className="text-[#E5E7EB]" />
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="h-full flex items-center justify-center px-4">
                      {c.isPrepaymentRegistered ? (
                        <div className="w-5 h-5 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#166534]">
                          <span className="text-[12px] font-bold">✓</span>
                        </div>
                      ) : (
                        <span className="text-[#E5E7EB]">—</span>
                      )}
                    </div>
                  </td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] font-normal truncate text-[13px]">{c.companyName}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] truncate text-[13px] font-normal">{c.firstName}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] truncate text-[13px] font-normal">{c.lastName}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px] font-normal">{c.phone}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] text-[13px] font-medium">{c.salesPerson}</div></td>
                  <td className="p-0"><div className="h-full flex items-center gap-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity"><button className="h-[36px] bg-[#F7D84A] text-[#0F3A3E] font-medium px-4 rounded-xl text-[12px] flex items-center gap-2"><SignIn size={16} />Login</button><button className="h-[36px] bg-white border border-[#E5E7EB] text-[#000000] font-medium px-3 rounded-xl text-[12px]"><PencilSimple size={16} /></button></div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="bg-white py-3 flex justify-between items-center text-[13px] text-[#616A6B] px-6 border-t border-[#E5E7EB]">
         <div><span className="font-medium text-[#000000]">{clients.length}</span> clients found</div>
      </div>
    </div>
  );
};

export default ClientTable;