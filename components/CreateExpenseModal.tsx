import React, { useState, useRef } from 'react';
import { X, UploadSimple, CalendarBlank, TextT, FilePdf, Trash } from '@phosphor-icons/react';

interface CreateExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateExpenseModal: React.FC<CreateExpenseModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#002b31]/60 backdrop-blur-sm transition-all animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[1400px] h-[85vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#E5E7EB] bg-white flex-shrink-0">
          <h2 className="text-[20px] font-medium text-[#000000]">Add new expenses</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"><X size={24} weight="bold" /></button>
        </div>
        <div className="flex-1 grid grid-cols-12 divide-x divide-[#E5E7EB] bg-white overflow-hidden">
          <div className="col-span-8 p-10 flex flex-col h-full overflow-y-auto custom-scrollbar">
             <div className="space-y-8">
                <div>
                   <label className="block text-[13px] font-medium text-[#000000] mb-2">Amount</label>
                   <div className="relative"><div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#616A6B]"><span className="text-[16px] font-medium">$</span></div><input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full h-[52px] pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-[13px] text-[#000000] placeholder-[#616A6B] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors focus:outline-none font-medium" /></div>
                </div>
                <div>
                   <label className="block text-[13px] font-medium text-[#000000] mb-2">Date</label>
                   <div className="relative"><div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#616A6B]"><CalendarBlank size={20} /></div><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full h-[52px] pl-12 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-[13px] text-[#000000] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors focus:outline-none font-medium" /></div>
                </div>
             </div>
          </div>
        </div>
        <div className="px-8 py-5 bg-[#002b31] border-t border-[#003840] flex items-center justify-between flex-shrink-0">
           <div className="text-[13px] font-medium text-white">Choose a category to continue.</div>
           <div className="flex items-center gap-4"><button onClick={onClose} className="px-4 py-2 text-[13px] font-medium text-white hover:text-gray-200 transition-colors">Cancel</button></div>
        </div>
      </div>
    </div>
  );
};

export default CreateExpenseModal;