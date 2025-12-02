
import React, { useState } from 'react';
import { 
  HandWaving, 
  ChatCircle, 
  Users, 
  UserPlus, 
  Gear, 
  Sparkle, 
  House, 
  ArrowsClockwise, 
  Money, 
  ArrowDown, 
  FileText, 
  Receipt, 
  Desktop,
  CaretDown,
  Check,
  SignOut,
  Scroll,
  SquaresFour
} from '@phosphor-icons/react';
import { NavItemType } from '../types';

interface SidebarProps {
  activeItem: NavItemType;
  setActiveItem: (item: NavItemType) => void;
  onLogout: () => void;
}

interface NavItemProps {
  item: { type: NavItemType; icon: React.ElementType };
  activeItem: NavItemType;
  setActiveItem: (item: NavItemType) => void;
}

const NavItem: React.FC<NavItemProps> = ({ item, activeItem, setActiveItem }) => (
  <button
    onClick={() => setActiveItem(item.type)}
    className={`w-full flex items-center gap-3 px-6 py-2.5 text-[12px] font-normal transition-all duration-200 group relative ${
      activeItem === item.type
        ? 'text-white bg-white/10'
        : 'text-white hover:text-white hover:bg-white/5'
    }`}
  >
    {activeItem === item.type && (
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#fcd34d]"></div>
    )}
    <item.icon 
      size={18} 
      weight={activeItem === item.type ? "fill" : "regular"} 
      className={`transition-colors duration-200 ${
        activeItem === item.type ? "text-[#fcd34d]" : "text-white group-hover:text-white"
      }`} 
    />
    <span className="font-sans font-normal tracking-wide">{item.type}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem, onLogout }) => {
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('Sami+1@kletta.com');

  const accounts = [
    'Sami+1@kletta.com',
    'admin@marcha.com',
    'support@kletta.com'
  ];

  const topNavItems = [
    { type: NavItemType.WELCOME, icon: HandWaving },
    { type: NavItemType.CHAT, icon: ChatCircle },
    { type: NavItemType.ALL_CLIENTS, icon: Users },
    { type: NavItemType.INVITATIONS, icon: UserPlus },
    { type: NavItemType.ACCOUNT, icon: Gear },
    { type: NavItemType.TAX_RETURN, icon: Scroll },
    { type: NavItemType.VAT_RETURNS, icon: FileText },
  ];

  const mainNavItems = [
    { type: NavItemType.DASHBOARD, icon: SquaresFour },
    { type: NavItemType.TRANSACTIONS, icon: ArrowsClockwise },
    { type: NavItemType.INCOME, icon: Money },
    { type: NavItemType.EXPENSES, icon: ArrowDown },
    { type: NavItemType.INVOICES, icon: Receipt },
    { type: NavItemType.REPORTS, icon: Desktop },
  ];

  return (
    <div className="w-[230px] min-w-[230px] bg-[#002b31] text-white flex flex-col h-full flex-shrink-0 font-sans border-r border-[#002b31] relative z-20">
      {/* Fixed Header */}
      <div className="flex-shrink-0">
        <div className="pt-8 pb-6 px-6">
          <div className="flex items-center gap-2">
             <img 
               src="https://i.ibb.co/Z6DzgDcm/Color-White.png" 
               alt="Kletta Logo" 
               className="h-6 w-auto" 
             />
          </div>
        </div>

        <div className="px-6 pb-6 text-[12px] font-normal text-white truncate opacity-90">
          Marcha Company LLC
        </div>
      </div>

      {/* Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
        {/* Top Navigation Group */}
        <div className="mb-4">
          {topNavItems.map((item) => (
            <NavItem 
              key={item.type} 
              item={item} 
              activeItem={activeItem} 
              setActiveItem={setActiveItem} 
            />
          ))}
        </div>

        {/* AI Support Intelligence Nav Item */}
        <div 
          onClick={() => setActiveItem(NavItemType.AI_SUPPORT)}
          className={`px-6 py-3 mb-4 flex-shrink-0 cursor-pointer transition-colors duration-200 relative group ${
            activeItem === NavItemType.AI_SUPPORT ? 'bg-white/10' : 'hover:bg-white/5'
          }`}
        >
          {activeItem === NavItemType.AI_SUPPORT && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#fcd34d]"></div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 rounded-full p-1 flex items-center justify-center">
                 <Sparkle 
                    size={12} 
                    weight="fill" 
                    className={activeItem === NavItemType.AI_SUPPORT || isAIEnabled ? "text-[#fcd34d]" : "text-gray-400"} 
                 />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-normal leading-tight text-gray-200">AI Support</span>
                <span className="text-[11px] font-normal leading-tight text-gray-400">Intelligence</span>
              </div>
            </div>
            {/* Toggle Switch - Stop Propagation to separate toggle from nav if needed, but here navigation is fine too */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsAIEnabled(!isAIEnabled);
              }}
              className={`w-9 h-5 rounded-full relative transition-colors duration-300 focus:outline-none ${
                isAIEnabled ? 'bg-[#fcd34d]' : 'bg-gray-600'
              }`}
            >
               <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                 isAIEnabled ? 'left-[18px]' : 'left-0.5'
               }`}></div>
            </button>
          </div>
        </div>

        {/* User Profile Dropdown */}
        <div className="px-4 mb-4 flex-shrink-0 relative">
           <button 
            onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
            className={`flex items-center gap-2 w-full hover:bg-white/10 py-2 px-2 rounded-lg transition-colors border ${isAccountDropdownOpen ? 'border-white/20 bg-white/5' : 'border-transparent'}`}
           >
              <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20 flex-shrink-0 bg-gray-600">
                 <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100" alt="User" className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] font-normal truncate flex-1 text-left text-gray-200 tracking-wide">{selectedAccount}</span>
              <CaretDown size={12} weight="bold" className={`text-gray-400 transition-transform duration-200 ${isAccountDropdownOpen ? 'rotate-180' : ''}`} />
           </button>

           {/* Dropdown Menu */}
           {isAccountDropdownOpen && (
             <div className="absolute bottom-full left-4 right-4 mb-2 bg-[#003840] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
               {accounts.map((account) => (
                 <button
                    key={account}
                    onClick={() => {
                      setSelectedAccount(account);
                      setIsAccountDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-[11px] text-gray-300 hover:bg-white/10 hover:text-white flex items-center justify-between"
                 >
                    <span className="truncate">{account}</span>
                    {selectedAccount === account && <Check size={12} className="text-[#fcd34d]" />}
                 </button>
               ))}
             </div>
           )}
        </div>

        {/* Main Navigation Group */}
        <div className="mb-6">
          {mainNavItems.map((item) => (
            <NavItem 
              key={item.type} 
              item={item} 
              activeItem={activeItem} 
              setActiveItem={setActiveItem} 
            />
          ))}
        </div>
      </div>

      {/* Fixed Footer Actions */}
      <div className="flex-shrink-0 px-6 pb-8 pt-4 border-t border-white/5 bg-[#002b31]">
        <div className="space-y-3">
          <button className="w-full bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] font-semibold text-[12px] py-2.5 rounded-lg transition-colors shadow-sm tracking-wide">
            Login to Client App
          </button>
          
          <button 
            onClick={onLogout}
            className="w-full group border border-gray-600 hover:border-gray-400 hover:bg-white/5 text-gray-300 font-normal text-[12px] py-2 rounded-lg transition-all flex items-center justify-center gap-2"
          >
             <SignOut size={14} className="text-gray-400 group-hover:text-white transition-colors" />
             <span className="group-hover:text-white transition-colors">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;