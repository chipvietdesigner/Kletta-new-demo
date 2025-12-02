
import React, { useState } from 'react';
import { VatReturn } from '../types';
import { SealCheck } from '@phosphor-icons/react';

interface VatReturnsTableProps {
  data: VatReturn[];
}

const VatReturnsTable: React.FC<VatReturnsTableProps> = ({ data }) => {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-2 border border-gray-200 rounded-lg">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0 bg-white">
        <table className="min-w-[1200px] text-[13px] text-left table-fixed w-full border-collapse">
          {/* Header */}
          <thead className="bg-white text-gray-500 border-b border-gray-200 sticky top-0 z-10 h-[40px]">
            <tr>
              <th className="px-4 font-medium text-[12px] w-[50px] text-gray-500 text-center">#</th>
              <th className="px-4 font-medium text-[12px] w-[220px] text-gray-500">E-mail</th>
              <th className="px-4 font-medium text-[12px] w-[180px] text-gray-500">Company name</th>
              <th className="px-4 font-medium text-[12px] w-[120px] text-gray-500">First name</th>
              <th className="px-4 font-medium text-[12px] w-[120px] text-gray-500">Last name</th>
              <th className="px-4 font-medium text-[12px] w-[140px] text-gray-500">UTR</th>
              <th className="px-4 font-medium text-[12px] w-[180px] text-gray-500">Tax period</th>
              <th className="px-4 font-medium text-[12px] w-[120px] text-gray-500">Edited</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={`group transition-colors border-b border-gray-50 h-[48px] ${
                  index % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'
                } hover:bg-gray-50`}
                onMouseEnter={() => setHoveredRowId(row.id)}
                onMouseLeave={() => setHoveredRowId(null)}
              >
                <td className="p-0">
                   <div className="h-full flex items-center justify-center px-4 text-gray-400 font-medium tabular-nums">{index + 1}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-900 font-medium truncate">{row.email}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-900 truncate">{row.companyName}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 truncate">{row.firstName}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 truncate">{row.lastName}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 tabular-nums">
                     <span className="mr-2">{row.utr}</span>
                     {row.isUtrVerified && <SealCheck size={14} weight="fill" className="text-gray-400" />}
                   </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 tabular-nums">{row.taxPeriod}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-400 text-[12px]">{row.edited}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white py-2 flex justify-between items-center text-[12px] text-gray-500 flex-shrink-0 px-4 border-t border-gray-100">
         <div>
            <span className="font-medium text-gray-700">{data.length}</span> results
         </div>
      </div>
    </div>
  );
};

export default VatReturnsTable;
