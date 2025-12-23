import React from 'react';
import { VatReturn } from '../types';
import { SealCheck } from '@phosphor-icons/react';

interface VatReturnsTableProps {
  data: VatReturn[];
}

const VatReturnsTable: React.FC<VatReturnsTableProps> = ({ data }) => {
  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-4 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0">
        <table className="min-w-[1200px] text-left table-fixed w-full border-collapse">
          <thead className="bg-[#F9FAFB] text-[#616A6B] sticky top-0 z-10 h-[48px] border-b border-[#E5E7EB]">
            <tr>
              <th className="px-4 font-normal text-[13px] w-[60px] text-center">#</th>
              <th className="px-4 font-normal text-[13px] w-[220px]">E-mail</th>
              <th className="px-4 font-normal text-[13px] w-[180px]">Company name</th>
              <th className="px-4 font-normal text-[13px] w-[120px]">First name</th>
              <th className="px-4 font-normal text-[13px] w-[120px]">Last name</th>
              <th className="px-4 font-normal text-[13px] w-[140px]">UTR</th>
              <th className="px-4 font-normal text-[13px] w-[180px]">Tax period</th>
              <th className="px-4 font-normal text-[13px] w-[120px]">Edited</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row, index) => (
              <tr key={row.id} className="group transition-colors border-b border-[#E5E7EB] h-[64px] hover:bg-[#F9FAFB]">
                <td className="p-0"><div className="h-full flex items-center justify-center px-4 text-[#000000] font-normal text-[13px]">{index + 1}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] font-medium truncate text-[13px]">{row.email}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] font-medium truncate text-[13px]">{row.companyName}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] truncate text-[13px] font-normal">{row.firstName}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] truncate text-[13px] font-normal">{row.lastName}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] text-[13px] font-normal"><span>{row.utr}</span>{row.isUtrVerified && <SealCheck size={16} weight="fill" className="text-[#1E6F73] ml-2" />}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] text-[13px] font-normal">{row.taxPeriod}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] text-[13px] font-normal">{row.edited}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white py-3 flex justify-between items-center text-[13px] text-[#616A6B] px-6 border-t border-[#E5E7EB]">
         <div><span className="font-medium text-[#000000]">{data.length}</span> results found</div>
      </div>
    </div>
  );
};

export default VatReturnsTable;