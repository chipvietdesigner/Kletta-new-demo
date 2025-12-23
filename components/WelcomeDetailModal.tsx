import React, { useEffect } from 'react';
import { X, CheckCircle, ArrowRight, DownloadSimple } from '@phosphor-icons/react';
import { WelcomeSectionItem } from '../types';

interface WelcomeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: WelcomeSectionItem | null;
}

const WelcomeDetailModal: React.FC<WelcomeDetailModalProps> = ({ isOpen, onClose, item }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#002b31]/60 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[600px] relative animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-300 overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white bg-black/20 hover:bg-black/40 rounded-full transition-all z-20 backdrop-blur-sm"><X size={20} weight="bold" /></button>
        <div className="px-8 py-6 overflow-y-auto custom-scrollbar flex-1">
          <div className="mb-4"><h2 className="text-[24px] font-medium text-[#000000] mb-1 tracking-tight">{item.title}</h2>{item.modalSubtitle && (<p className="text-[14px] font-medium text-[#004d40]">{item.modalSubtitle}</p>)}</div>
          <p className="text-[14px] text-[#616A6B] leading-relaxed mb-6 font-medium">{item.longDescription || item.description}</p>
        </div>
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3 justify-end flex-shrink-0"><button onClick={onClose} className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-[#000000] text-[13px] font-medium rounded-lg transition-colors shadow-sm">Close</button><button onClick={onClose} className="px-6 py-2.5 bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] text-[13px] font-medium rounded-lg transition-colors shadow-sm flex items-center gap-2">{item.cta}<ArrowRight size={16} weight="bold" /></button></div>
      </div>
    </div>
  );
};

export default WelcomeDetailModal;