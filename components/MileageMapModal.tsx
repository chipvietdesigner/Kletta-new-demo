import React from 'react';
import { MileageTrip } from '../types';
import { X, MapPin } from '@phosphor-icons/react';

interface MileageMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: MileageTrip | null;
}

const MileageMapModal: React.FC<MileageMapModalProps> = ({ isOpen, onClose, trip }) => {
  if (!isOpen || !trip) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#002b31]/40 backdrop-blur-sm transition-all" onClick={onClose}>
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-[15px] font-bold text-[#002b31]">Route Preview</h3>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={18} weight="bold" />
          </button>
        </div>
        
        <div className="p-6">
           <div className="w-full aspect-[16/9] bg-gray-100 rounded-lg border border-gray-200 relative overflow-hidden flex items-center justify-center">
              {/* Abstract Map Background */}
              <div className="absolute inset-0 opacity-10" style={{ 
                  backgroundImage: 'radial-gradient(circle, #002b31 1px, transparent 1px)', 
                  backgroundSize: '20px 20px' 
              }}></div>
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-3/4 h-1 border-t-2 border-dashed border-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              {/* Info Card on Map */}
              <div className="z-10 bg-white shadow-lg border border-gray-100 rounded-lg p-5 max-w-sm w-full mx-6 space-y-4">
                 <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-200 flex-shrink-0 mt-0.5">
                       <MapPin weight="fill" size={16} />
                    </div>
                    <div>
                       <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Start</div>
                       <div className="text-[13px] font-bold text-[#002b31] leading-tight">{trip.startAddress}</div>
                       <div className="text-[12px] text-gray-500 mt-0.5">{trip.startCityCountry}</div>
                    </div>
                 </div>
                 
                 <div className="h-px bg-gray-100 w-full"></div>

                 <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#004d40] flex items-center justify-center text-white border border-[#004d40] flex-shrink-0 mt-0.5">
                       <MapPin weight="fill" size={16} />
                    </div>
                    <div>
                       <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">End</div>
                       <div className="text-[13px] font-bold text-[#002b31] leading-tight">{trip.endAddress}</div>
                       <div className="text-[12px] text-gray-500 mt-0.5">{trip.endCityCountry}</div>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="mt-4 flex justify-end">
             <button 
                onClick={onClose}
                className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-[13px] font-medium text-gray-700 transition-colors"
             >
                Close
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MileageMapModal;