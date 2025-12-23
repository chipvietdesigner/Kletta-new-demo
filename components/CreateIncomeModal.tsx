import React, { useState } from 'react';
import { X, CalendarBlank } from '@phosphor-icons/react';

interface CreateIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateIncomeModal: React.FC<CreateIncomeModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#002b31]/60 backdrop-blur-sm transition-all animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[1400px] h-[85vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#E5E7EB] bg-white flex-shrink-0">
          <h2 className="text-[20px] font-medium text-[#000000]">Add new income</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"><X size={24} weight="bold" /></button>
        </div>
        <div className="flex-1 p-10 bg-white">
          <div className="max-w-md space-y-8">
            <div>
               <label className="block text-[13px] font-medium text-[#000000] mb-2">Amount</label>
               <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full h-[52px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[13px] text-[#000000] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors outline-none font-medium" />
            </div>
            <div>
               <label className="block text-[13px] font-medium text-[#000000] mb-2">Date</label>
               <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full h-[52px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[13px] text-[#000000] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors outline-none font-medium" />
            </div>
          </div>
        </div>
        <div className="px-8 py-5 bg-[#002b31] border-t border-[#003840] flex items-center justify-between flex-shrink-0">
           <div className="text-[13px] font-medium text-white">Enter an amount and choose a category to continue.</div>
           <button onClick={onClose} className="px-4 py-2 text-[13px] font-medium text-white hover:text-gray-200 transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateIncomeModal;