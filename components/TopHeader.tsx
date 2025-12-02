import React from 'react';
import { 
  Info, 
  DownloadSimple, 
  CalendarBlank, 
  Plus, 
  Globe, 
  ChatCircle,
  User,
  CaretDown
} from '@phosphor-icons/react';

const TopHeader: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 z-10">
      {/* Left Section: User Info & Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
            <User size={20} weight="fill" />
          </div>
          <div className="flex flex-col">
             <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-900">sami+timma@kletta.com</span>
                <span className="text-[10px] font-bold text-[#004d40] tracking-wide">UNSUBSCRIBED UNSUBSCRIBED</span>
                <Info size={12} className="text-gray-400" />
             </div>
             <div className="flex items-center gap-1 text-[11px] text-[#004d40] font-bold">
                <span>Timma (1234567-8)</span>
                <div className="w-3 h-3 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-[8px] text-gray-500">✓</span>
                </div>
                <span className="ml-1">MONTHLY</span>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
           <button className="bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] text-xs font-medium px-3 py-1.5 rounded flex items-center gap-2 transition-colors">
              <DownloadSimple size={14} />
              diary.csv
           </button>
           <button className="bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] text-xs font-medium px-4 py-1.5 rounded transition-colors">
              Edit
           </button>
        </div>
      </div>

      {/* Right Section: Controls */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-50 bg-white transition-colors">
           <CalendarBlank size={16} className="text-gray-500" />
           <span className="text-xs font-medium text-gray-700">This tax year (01.01 → 31.12.2025)</span>
        </button>

        <div className="h-6 w-px bg-gray-300 mx-1"></div>

        <div className="flex items-center gap-3 text-gray-500">
          <button className="hover:text-gray-800 transition-colors">
             <Plus size={18} weight="bold" />
          </button>
          <button className="hover:text-gray-800 transition-colors">
             <Globe size={18} />
          </button>
          <button className="hover:text-gray-800 transition-colors flex items-center justify-center w-5 h-5">
             <span className="text-xs font-bold">🇬🇧</span>
          </button>
          <button className="hover:text-gray-800 transition-colors">
             <ChatCircle size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;