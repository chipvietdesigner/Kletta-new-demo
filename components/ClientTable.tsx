import React, { useState } from 'react';
import { Client } from '../types';
import { SealCheck, CaretDown, SignIn, PencilSimple, Prohibit } from '@phosphor-icons/react';

interface ClientTableProps {
  clients: Client[];
}

const ClientTable: React.FC<ClientTableProps> = ({ clients }) => {
  const [hoveredRowId, setHoveredRowId] = useState<number | null>(null);
  const getFlag = (code: string) => code === 'FI' ? '🇫🇮' : (code === 'UK' ? '🇬🇧' : '');
  const getPlanStyle = (plan: string) => {
    switch (plan) {
      case 'Kletta Solo': return 'bg-[#FEF3C7] text-[#92400E] border-[#FEF3C7]';
      case 'Kletta Care': return 'bg-[#DBEAFE] text-[#1E40AF] border-[#DBEAFE]';
      case 'PARTNER': return 'bg-[#F3E8FF] text-[#6B21A8] border-[#F3E8FF]';
      case 'COLLECT': return 'bg-[#DCFCE7] text-[#166534] border-[#DCFCE7]';
      default: return 'bg-[#F3F4F6] text-[#616A6B] border-[#F3F4F6]';
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-4 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0">
        <table className="min-w-[1800px] text-left border-collapse table-fixed w-full">
          <thead className="bg-[#F9FAFB] text-[#616A6B] sticky top-0 z-10 h-[48px] border-b border-[#E5E7EB]">
            <tr>
              <th className="px-4 font-normal text-[13px] w-[60px] text-center">#</th>
              <th className="px-4 font-normal text-[13px] w-[240px]">E-mail</th>
              <th className="px-4 font-normal text-[13px] w-[80px] text-center">Country</th>
              <th className="px-4 font-normal text-[13px] w-[140px]">Plan</th>
              <th className="px-4 font-normal text-[13px] w-[140px]">UTR</th>
              <th className="px-4 font-normal text-[13px] w-[140px] text-center">Prepayment</th>
              <th className="px-4 font-normal text-[13px] w-[180px]">Company Name</th>
              <th className="px-4 font-normal text-[13px] w-[140px]">First Name</th>
              <th className="px-4 font-normal text-[13px] w-[140px]">Last Name</th>
              <th className="px-4 font-normal text-[13px] w-[150px]">Phone</th>
              <th className="px-4 font-normal text-[13px] w-[180px]">Sales Person</th>
              <th className="px-4 font-normal text-[13px] w-[280px]">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {clients.map((c, index) => (
              <tr key={c.id} className={`group transition-colors border-b border-[#E5E7EB] h-[64px] ${hoveredRowId === c.id ? 'bg-[#F9FAFB]' : 'bg-white'}`} onMouseEnter={() => setHoveredRowId(c.id)} onMouseLeave={() => setHoveredRowId(null)}>
                <td className="p-0"><div className="h-full flex items-center justify-center px-4 text-[#616A6B] font-normal text-[13px]">{index + 1}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] font-medium truncate hover:text-[#1E6F73] cursor-pointer transition-colors text-[13px]">{c.email}</div></td>
                <td className="p-0"><div className="h-full flex items-center justify-center px-4 text-[18px]">{getFlag(c.countryCode)}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4"><span className={`px-3 py-1 rounded-lg text-[12px] font-medium border ${getPlanStyle(c.plan)} truncate`}>{c.plan}</span></div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px] font-normal"><div className="flex items-center gap-2"><span>{c.utr}</span>{c.isUtrVerified && <SealCheck size={16} weight="fill" className="text-[#1E6F73]" />}</div></div></td>
                <td className="p-0"><div className="h-full flex items-center justify-center px-4">{c.isPrepaymentRegistered ? (<div className="w-5 h-5 rounded-full bg-[#DCFCE7] flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-full bg-[#166534]"></div></div>) : (<span className="text-[#E5E7EB]">-</span>)}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] font-normal truncate text-[13px]">{c.companyName || <span className="text-[#E5E7EB]">-</span>}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] truncate text-[13px] font-normal">{c.firstName || <span className="text-[#E5E7EB]">-</span>}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] truncate text-[13px] font-normal">{c.lastName || <span className="text-[#E5E7EB]">-</span>}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px] font-normal">{c.phone || <span className="text-[#E5E7EB]">-</span>}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-2"><div className="relative w-full"><select className="w-full h-[42px] bg-white border border-[#E5E7EB] rounded-xl px-3 text-[13px] text-[#000000] font-medium focus:outline-none focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] cursor-pointer transition-all appearance-none" defaultValue={c.salesPerson}><option>Danny</option><option>Sami</option></select><CaretDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#616A6B] pointer-events-none" /></div></div></td>
                <td className="p-0"><div className={`h-full flex items-center gap-2 px-4 transition-opacity duration-200 ${hoveredRowId === c.id ? 'opacity-100' : 'opacity-0'}`}><button className="h-[36px] bg-[#F7D84A] hover:bg-[#FCD34D] text-[#0F3A3E] border border-[#F7D84A] font-medium px-4 rounded-xl text-[12px] shadow-sm transition-colors whitespace-nowrap flex items-center gap-2"><SignIn size={16} />Login</button><button className="h-[36px] bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#000000] font-medium px-3 rounded-xl text-[12px] shadow-sm transition-colors whitespace-nowrap flex items-center gap-2"><PencilSimple size={16} />Edit</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white py-3 flex justify-between items-center text-[13px] text-[#616A6B] flex-shrink-0 px-6 border-t border-[#E5E7EB]">
         <div><span className="font-medium text-[#000000]">{clients.length}</span> clients found</div>
      </div>
    </div>
  );
};

export default ClientTable;