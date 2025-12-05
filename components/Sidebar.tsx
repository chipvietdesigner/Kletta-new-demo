

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
  SquaresFour,
  RoadHorizon,
  X,
  Copy,
  DeviceMobile
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
  const [isClientLoginOpen, setIsClientLoginOpen] = useState(false);

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
    { type: NavItemType.MILEAGES, icon: RoadHorizon },
    { type: NavItemType.INVOICES, icon: Receipt },
    { type: NavItemType.REPORTS, icon: Desktop },
  ];

  return (
    <>
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
          <button 
            onClick={() => setIsClientLoginOpen(true)}
            className="w-full bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] font-semibold text-[12px] py-2.5 rounded-lg transition-colors shadow-sm tracking-wide"
          >
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

    {/* Login to Client App Modal */}
    {isClientLoginOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#002b31]/60 backdrop-blur-sm transition-all duration-300">
          {/* Modal Container */}
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[440px] relative animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-300 overflow-hidden flex flex-col" 
            onClick={e => e.stopPropagation()}
          >
             {/* Close Button */}
             <button 
               onClick={() => setIsClientLoginOpen(false)} 
               className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all z-10"
             >
               <X size={20} weight="bold" />
             </button>

             {/* Header Content */}
             <div className="px-8 pt-10 pb-6 text-center">
               <div className="w-16 h-16 bg-[#fffdf5] border border-[#fef3c7] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm transform rotate-3">
                  <DeviceMobile size={32} weight="duotone" className="text-[#002b31]" />
               </div>
               
               <h2 className="text-[22px] font-bold text-[#002b31] mb-2 tracking-tight">Login to Client App</h2>
               <p className="text-[14px] text-gray-500 leading-relaxed max-w-[280px] mx-auto">
                 Enter these credentials on the client's device to access the Kletta dashboard.
               </p>
             </div>

             {/* Main Body */}
             <div className="px-8 pb-8 space-y-8">
                
                {/* Credentials Card */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm space-y-5">
                    {/* Email */}
                    <div className="space-y-1.5">
                       <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 ml-1">Client E-mail</label>
                       <div className="group flex items-center justify-between bg-white border border-gray-200 hover:border-gray-300 transition-colors rounded-lg px-3 py-2.5 shadow-sm">
                          <span className="text-[14px] font-semibold text-[#002b31] font-mono truncate mr-3 select-all">sami+client@kletta.com</span>
                          <button 
                            className="text-gray-400 hover:text-[#002b31] p-1.5 rounded-md transition-colors" 
                            title="Copy email"
                          >
                             <Copy size={16} />
                          </button>
                       </div>
                    </div>

                    {/* PIN */}
                    <div className="space-y-1.5">
                       <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 ml-1">PIN Code</label>
                       <div className="flex gap-3">
                          {[5, 2, 9, 1].map((digit, i) => (
                             <div key={i} className="flex-1 h-14 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-2xl font-bold text-[#002b31] shadow-sm font-mono tracking-tight">
                                {digit}
                             </div>
                          ))}
                       </div>
                    </div>
                </div>

                {/* Instructions */}
                <div>
                    <h3 className="text-[11px] font-bold text-gray-900 mb-3 uppercase tracking-wide">Instructions</h3>
                    <div className="space-y-3">
                      {[
                        'Open Kletta app on device',
                        'Tap "Login with accountant"',
                        'Enter credentials shown above'
                      ].map((step, idx) => (
                         <div key={idx} className="flex gap-3 items-center">
                           <div className="w-5 h-5 rounded-full bg-[#002b31] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 shadow-sm">
                              {idx + 1}
                           </div>
                           <span className="text-[13px] text-gray-600 font-medium" dangerouslySetInnerHTML={{ __html: step.replace('"Login with accountant"', '<span class="text-[#002b31] font-bold">"Login with accountant"</span>') }} />
                         </div>
                      ))}
                    </div>
                </div>
             </div>

             {/* Footer */}
             <div className="py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <p className="text-[12px] text-gray-500 font-medium">
                  Code expires <span className="text-[#002b31] font-bold">Today, 14:00</span>
                </p>
             </div>
          </div>
        </div>
    )}
    </>
  );
};

export default Sidebar;
