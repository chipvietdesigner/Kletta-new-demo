import React, { useState } from 'react';
import { Client } from '../types';
import { 
  ArrowsDownUp, 
  SealCheck,
  CaretDown,
  SignIn,
  PencilSimple,
  Prohibit
} from '@phosphor-icons/react';

interface ClientTableProps {
  clients: Client[];
}

const ClientTable: React.FC<ClientTableProps> = ({ clients }) => {
  const [hoveredRowId, setHoveredRowId] = useState<number | null>(null);

  const getFlag = (code: string) => {
    if (code === 'FI') return '🇫🇮';
    if (code === 'UK') return '🇬🇧';
    return '';
  };

  const getPlanStyle = (plan: string) => {
    switch (plan) {
      case 'Kletta Solo':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Kletta Care':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PARTNER':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'COLLECT':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-500 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-2 border border-gray-200 rounded-lg">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0 bg-white">
        <table className="min-w-[1800px] text-[13px] text-left border-collapse table-fixed w-full">
          {/* Header matches TransactionTable style exactly */}
        <thead className="bg-gray-50 text-gray-500 sticky top-0 z-10 h-[40px] shadow-md">
            <tr>
              <th className="px-4 font-medium text-[12px] w-[50px] text-center text-gray-500">#</th>
              <th className="px-4 font-medium text-[12px] w-[220px] text-gray-500">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                  E-mail
                </div>
              </th>
              <th className="px-4 font-medium text-[12px] w-[80px] text-center text-gray-500">Country</th>
              <th className="px-4 font-medium text-[12px] w-[140px] text-gray-500">Plan</th>
              <th className="px-4 font-medium text-[12px] w-[120px] text-gray-500">UTR</th>
              <th className="px-4 font-medium text-[12px] w-[140px] text-center text-gray-500">Prepayment</th>
              <th className="px-4 font-medium text-[12px] w-[180px] text-gray-500">Company Name</th>
              <th className="px-4 font-medium text-[12px] w-[120px] text-gray-500">First Name</th>
              <th className="px-4 font-medium text-[12px] w-[120px] text-gray-500">Last Name</th>
              <th className="px-4 font-medium text-[12px] w-[130px] text-gray-500">Phone</th>
              <th className="px-4 font-medium text-[12px] w-[150px] text-gray-500">Sales Person</th>
              <th className="px-4 font-medium text-[12px] w-[280px] text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {clients.map((c, index) => (
              <tr 
                key={c.id} 
                className={`group transition-colors border-b border-gray-50 h-[48px] ${
                  index % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'
                } hover:bg-gray-50`}
                onMouseEnter={() => setHoveredRowId(c.id)}
                onMouseLeave={() => setHoveredRowId(null)}
              >
                <td className="p-0">
                  <div className="h-full flex items-center justify-center px-4 text-gray-400 font-medium tabular-nums">
                    {index + 1}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4 text-gray-900 font-medium truncate hover:text-[#005c66] cursor-pointer transition-colors">
                    {c.email}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center justify-center px-4 text-[16px] grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                    {getFlag(c.countryCode)}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${getPlanStyle(c.plan)} truncate`}>
                      {c.plan}
                    </span>
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4 text-gray-600 tabular-nums">
                     <div className="flex items-center gap-1.5">
                        <span>{c.utr}</span>
                        {c.isUtrVerified && <SealCheck size={14} weight="fill" className="text-[#005c66]" />}
                     </div>
                  </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-center px-4">
                      {c.isPrepaymentRegistered ? (
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                           <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                   </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-900 truncate">
                      {c.companyName || <span className="text-gray-300">-</span>}
                   </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 truncate">
                      {c.firstName || <span className="text-gray-300">-</span>}
                   </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 truncate">
                      {c.lastName || <span className="text-gray-300">-</span>}
                   </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 tabular-nums">
                      {c.phone || <span className="text-gray-300">-</span>}
                   </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-2">
                      <select 
                        className="w-full h-[32px] bg-transparent border border-transparent hover:bg-white hover:border-gray-200 rounded px-2 text-[13px] text-gray-700 focus:outline-none focus:border-[#004d40] cursor-pointer transition-all appearance-none"
                        defaultValue={c.salesPerson}
                      >
                         <option>Danny</option>
                         <option>Sami</option>
                         <option>James</option>
                         <option>Not set</option>
                      </select>
                   </div>
                </td>
                <td className="p-0">
                   <div className={`h-full flex items-center gap-2 px-4 transition-opacity duration-200 ${hoveredRowId === c.id ? 'opacity-100' : 'opacity-0'}`}>
                      <button className="h-[28px] bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] border border-[#fcd34d] hover:border-[#fbbf24] font-semibold px-3 rounded text-[11px] shadow-sm transition-colors whitespace-nowrap flex items-center gap-1.5">
                        <SignIn size={14} />
                        Login
                      </button>
                      <button className="h-[28px] bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium px-3 rounded text-[11px] shadow-sm transition-colors whitespace-nowrap flex items-center gap-1.5">
                        <PencilSimple size={14} />
                        Edit
                      </button>
                       <button className="h-[28px] bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600 text-gray-500 font-medium px-3 rounded text-[11px] shadow-sm transition-colors whitespace-nowrap flex items-center gap-1.5">
                        <Prohibit size={14} />
                        Deactivate
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer Summary Matches TransactionTable */}
      <div className="bg-white py-2 flex justify-between items-center text-[12px] text-gray-500 flex-shrink-0 px-4 border-t border-gray-100">
         <div>
            <span className="font-medium text-gray-700">{clients.length}</span> clients found
         </div>
      </div>
    </div>
  );
};

export default ClientTable;