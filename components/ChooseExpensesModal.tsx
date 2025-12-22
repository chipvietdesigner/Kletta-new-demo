import React, { useState } from 'react';
import { X, MagnifyingGlass, Image, FileText, Receipt } from '@phosphor-icons/react';
import { BankTransaction } from '../types';

interface ChooseExpensesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (expenseId: string) => void;
  transaction: BankTransaction | null;
}

// Mock Data for Expenses to Reconcile
const MOCK_EXPENSE_CANDIDATES = [
  {
    month: 'November 2025',
    items: [
      { id: 'ex1', amount: -5.41, merchant: 'Uber', category: 'Car, van and travel expenses', date: '15.11.2025', type: 'Receipt', hasImage: true },
      { id: 'ex2', amount: -12.00, merchant: 'McDonald\'s', category: 'Costs of goods bought for resale', date: '12.11.2025', type: 'Expense', hasImage: false },
      { id: 'ex3', amount: -89.40, merchant: 'SparkFun', category: 'Unclassified expense', date: '11.11.2025', type: 'Expense', hasImage: false },
      { id: 'ex4', amount: -6.33, merchant: 'Uber', category: 'Car, van and travel expenses', date: '28.11.2025', type: 'Receipt', hasImage: true },
    ]
  },
  {
    month: 'August 2025',
    items: [
      { id: 'ex5', amount: -45.00, merchant: 'Shell Station', category: 'Vehicle cost', date: '10.08.2025', type: 'Receipt', hasImage: true },
      { id: 'ex6', amount: -120.50, merchant: 'Office Depot', category: 'Phone, fax, stationery', date: '05.08.2025', type: 'Invoice', hasImage: false },
    ]
  }
];

const ChooseExpensesModal: React.FC<ChooseExpensesModalProps> = ({ isOpen, onClose, onConfirm, transaction }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const formatCurrency = (val: number) => {
    // Using GBP as requested in spec for this modal
    const formatted = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(Math.abs(val));
    return val >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  const filteredGroups = MOCK_EXPENSE_CANDIDATES.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.merchant.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#002b31]/60 backdrop-blur-sm transition-all animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-[1000px] h-[80vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Modal Header Title */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#E5E7EB] bg-white flex-shrink-0 relative">
          <div className="absolute left-0 right-0 text-center pointer-events-none">
             <h2 className="text-[16px] font-bold text-[#0F2F33] tracking-wide uppercase">CHOOSE EXPENSES</h2>
          </div>
          <div className="flex-1"></div> {/* Spacer */}
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* 2. Transaction Summary Context */}
        {transaction && (
          <div className="px-8 py-4 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between flex-shrink-0">
             <div className="flex flex-col">
                <span className="text-[12px] text-[#6B7280] font-medium">{transaction.date}</span>
                <span className="text-[16px] font-bold text-[#0F2F33]">{transaction.description}</span>
             </div>
             <div className={`text-[20px] font-bold tabular-nums ${transaction.amount >= 0 ? 'text-[#10B981]' : 'text-[#0F2F33]'}`}>
                {formatCurrency(transaction.amount)}
             </div>
          </div>
        )}

        {/* 3. Search */}
        <div className="px-8 py-4 border-b border-[#E5E7EB] flex-shrink-0">
           <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#9CA3AF]">
                 <MagnifyingGlass size={18} />
              </div>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full h-[48px] pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#0F2F33] placeholder-[#9CA3AF] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors focus:outline-none"
              />
           </div>
        </div>

        {/* 4. List Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
           <div className="px-8 py-2">
              {filteredGroups.map((group) => (
                <div key={group.month} className="mb-6">
                   {/* Month Header */}
                   <h3 className="text-[18px] font-bold text-[#0F2F33] mb-4 mt-6 px-2">{group.month}</h3>
                   
                   <div className="space-y-2">
                      {group.items.map((item) => (
                        <div 
                          key={item.id}
                          onClick={() => setSelectedId(item.id)}
                          className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all group ${
                            selectedId === item.id 
                              ? 'bg-[#FFF7D6] border-[#F7D84A] shadow-sm' 
                              : 'bg-white border-[#E5E7EB] hover:border-[#D1D5DB] hover:shadow-sm'
                          }`}
                        >
                           {/* Left: Amount */}
                           <div className="w-[80px] flex-shrink-0 text-right pr-4">
                              <span className="text-[14px] font-bold text-[#0F2F33] tabular-nums">
                                 {formatCurrency(item.amount)}
                              </span>
                           </div>

                           {/* Thumbnail */}
                           <div className="flex-shrink-0 mr-4">
                              <div className={`w-[48px] h-[48px] rounded-lg border flex items-center justify-center ${selectedId === item.id ? 'bg-white border-[#F7D84A]/50' : 'bg-gray-50 border-gray-200'}`}>
                                 {item.hasImage ? (
                                   <Image size={24} className="text-gray-400" />
                                 ) : item.type === 'Receipt' ? (
                                   <Receipt size={24} className="text-gray-400" />
                                 ) : (
                                   <FileText size={24} className="text-gray-400" />
                                 )}
                              </div>
                           </div>

                           {/* Middle: Details */}
                           <div className="flex-1 min-w-0 flex flex-col justify-center">
                              <div className="flex items-center gap-3 mb-1">
                                 <span className="text-[14px] font-bold text-[#0F2F33] truncate">{item.merchant}</span>
                                 <span className="px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#4B5563] text-[11px] font-medium border border-[#E5E7EB] truncate max-w-[200px]">
                                    {item.category}
                                 </span>
                              </div>
                              <div className="text-[12px] text-[#6B7280] font-medium flex items-center gap-1.5">
                                 <span>{item.date}</span>
                                 <span className="w-1 h-1 rounded-full bg-[#D1D5DB]"></span>
                                 <span>{item.merchant}</span>
                                 <span className="w-1 h-1 rounded-full bg-[#D1D5DB]"></span>
                                 <span>{item.type}</span>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              ))}
              
              {filteredGroups.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                   <p>No matching expenses found.</p>
                </div>
              )}
           </div>
        </div>

        {/* 7. Footer Actions */}
        <div className="px-8 py-5 border-t border-[#E5E7EB] bg-white flex items-center justify-between flex-shrink-0">
           <span className="text-[13px] text-[#6B7280] font-medium">Select an expense to reconcile</span>
           <div className="flex gap-4">
              <button 
                onClick={onClose}
                className="px-6 py-2.5 text-[14px] font-bold text-[#0F2F33] hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-200"
              >
                Cancel
              </button>
              <button 
                onClick={() => selectedId && onConfirm(selectedId)}
                disabled={!selectedId}
                className={`px-8 py-2.5 text-[14px] font-bold rounded-xl transition-colors shadow-sm ${
                  selectedId 
                    ? 'bg-[#F7D84A] hover:bg-[#FCD34D] text-[#0F3A3E]' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Confirm selection
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ChooseExpensesModal;