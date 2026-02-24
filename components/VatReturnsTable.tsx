import React from 'react';
import { VatReturn } from '../types';
import { SealCheck } from '@phosphor-icons/react';

interface VatReturnsTableProps {
  data: VatReturn[];
}

const VatReturnsTable: React.FC<VatReturnsTableProps> = ({ data }) => {
  return (
    <div className="flex flex-col overflow-hidden mt-4 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto custom-scrollbar pb-0">
        <table className="min-w-[1200px] text-left table-fixed w-full border-collapse">
          <thead className="bg-white text-[#000000] sticky top-0 z-10 h-[48px]">
            <tr>
              <th className="px-4 font-medium text-[13px] w-[60px] text-center shadow-[inset_0_-1px_0_#E5E7EB]">#</th>
              <th className="px-4 font-medium text-[13px] w-[220px] shadow-[inset_0_-1px_0_#E5E7EB]">E-mail</th>
              <th className="px-4 font-medium text-[13px] w-[180px] shadow-[inset_0_-1px_0_#E5E7EB]">Company name</th>
              <th className="px-4 font-medium text-[13px] w-[120px] shadow-[inset_0_-1px_0_#E5E7EB]">First name</th>
              <th className="px-4 font-medium text-[13px] w-[120px] shadow-[inset_0_-1px_0_#E5E7EB]">Last name</th>
              <th className="px-4 font-medium text-[13px] w-[140px] shadow-[inset_0_-1px_0_#E5E7EB]">UTR</th>
              <th className="px-4 font-medium text-[13px] w-[180px] shadow-[inset_0_-1px_0_#E5E7EB]">Tax period</th>
              <th className="px-4 font-medium text-[13px] w-[120px] shadow-[inset_0_-1px_0_#E5E7EB]">Edited</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row, index) => {
              return (
                <tr key={row.id} className="group transition-colors h-[64px] border-b border-[#F3F4F6] last:border-0 hover:bg-[#F9FAFB] bg-white">
                  <td className="p-0"><div className="h-full flex items-center justify-center px-4 text-[#000000] font-normal text-[13px]">{index + 1}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] font-medium truncate text-[13px]">{row.email}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] font-medium truncate text-[13px]">{row.companyName}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] truncate text-[13px] font-normal">{row.firstName}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] truncate text-[13px] font-normal">{row.lastName}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] text-[13px] font-normal"><span>{row.utr}</span>{row.isUtrVerified && <SealCheck size={16} weight="fill" className="text-[#1E6F73] ml-2" />}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] text-[13px] font-normal">{row.taxPeriod}</div></td>
                  <td className="p-0"><div className="h-full flex items-center px-4 text-[#000000] text-[13px] font-normal">{row.edited}</div></td>
                </tr>
              );
            })}
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