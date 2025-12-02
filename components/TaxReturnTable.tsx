
import React, { useState } from 'react';
import { TaxReturnRow } from '../types';
import { SealCheck } from '@phosphor-icons/react';

interface TaxReturnTableProps {
  data: TaxReturnRow[];
}

const TaxReturnTable: React.FC<TaxReturnTableProps> = ({ data }) => {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'SENT': return 'bg-green-100 text-green-800 border-green-200';
      case 'NOT SENT': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getPlanStyle = (plan: string) => {
    if (plan.includes('PRO')) return 'bg-purple-50 text-purple-700 border-purple-100';
    if (plan.includes('DUO')) return 'bg-blue-50 text-blue-700 border-blue-100';
    if (plan.includes('TRIAL')) return 'bg-yellow-50 text-yellow-700 border-yellow-100';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-2 border border-gray-200 rounded-lg">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0 bg-white">
        <table className="min-w-[1400px] text-[13px] text-left table-fixed w-full border-collapse">
          {/* Header */}
          <thead className="bg-white text-gray-500 border-b border-gray-200 sticky top-0 z-10 h-[40px]">
            <tr>
              <th className="px-4 font-medium text-[12px] w-[50px] text-gray-500 text-center">#</th>
              <th className="px-4 font-medium text-[12px] w-[120px] text-gray-500 text-center">Send status</th>
              <th className="px-4 font-medium text-[12px] w-[220px] text-gray-500">E-mail</th>
              <th className="px-4 font-medium text-[12px] w-[180px] text-gray-500">Company name</th>
              <th className="px-4 font-medium text-[12px] w-[120px] text-gray-500">First name</th>
              <th className="px-4 font-medium text-[12px] w-[120px] text-gray-500">Last name</th>
              <th className="px-4 font-medium text-[12px] w-[100px] text-gray-500">Plan</th>
              <th className="px-4 font-medium text-[12px] w-[100px] text-gray-500">Status</th>
              <th className="px-4 font-medium text-[12px] w-[140px] text-gray-500">UTR</th>
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
                   <div className="h-full flex items-center justify-center px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusColor(row.sendStatus)}`}>
                        {row.sendStatus}
                      </span>
                   </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-900 font-medium truncate hover:text-[#005c66] cursor-pointer transition-colors">
                     {row.email}
                   </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-900 truncate">
                     {row.companyName || <span className="text-gray-300">-</span>}
                   </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 truncate">
                     {row.firstName || <span className="text-gray-300">-</span>}
                   </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 truncate">
                     {row.lastName || <span className="text-gray-300">-</span>}
                   </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${getPlanStyle(row.plan)}`}>
                        {row.plan}
                      </span>
                   </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-[12px] text-gray-600 font-medium">
                     {row.status}
                   </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 tabular-nums">
                     <span className="mr-2">{row.utr}</span>
                     {row.isUtrVerified ? (
                       <SealCheck size={14} weight="fill" className="text-gray-400" />
                     ) : (
                       <div className="w-3 h-3 rounded-full border border-orange-300 bg-orange-100 flex items-center justify-center">
                         <span className="text-[8px] text-orange-600 font-bold">!</span>
                       </div>
                     )}
                   </div>
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

export default TaxReturnTable;