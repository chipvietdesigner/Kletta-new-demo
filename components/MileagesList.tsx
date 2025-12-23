import React, { useState } from 'react';
import { MileageTrip } from '../types';
import { Trash, MapTrifold, PencilSimple, Car, Suitcase } from '@phosphor-icons/react';
import MileageMapModal from './MileageMapModal';

interface MileagesListProps {
  mileages: MileageTrip[];
}

const MileagesList: React.FC<MileagesListProps> = ({ mileages }) => {
  const [selectedTrip, setSelectedTrip] = useState<MileageTrip | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const handleOpenMap = (trip: MileageTrip) => { setSelectedTrip(trip); setIsMapOpen(true); };
  const handleCloseMap = () => { setIsMapOpen(false); setTimeout(() => setSelectedTrip(null), 300); };

  return (
    <>
      <div className="flex flex-col gap-4 pb-6">
        {mileages.map((trip) => (
          <div key={trip.id} className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5 group">
             <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1.5 min-w-0 pr-6">
                   <div className="flex items-center gap-2 flex-wrap"><span className="text-[16px] font-medium text-[#000000] leading-snug">{trip.startAddress}</span><span className="text-[#616A6B] text-[14px]">→</span><span className="text-[16px] font-medium text-[#000000] leading-snug">{trip.endAddress}</span></div>
                   <div className="flex items-center gap-2 text-[13px] text-[#616A6B] font-medium"><span>{trip.date}</span><span className="w-1 h-1 rounded-full bg-[#D1D5DB]"></span><span>{trip.country}</span></div>
                </div>
                <div className="flex flex-col items-end flex-shrink-0">
                   <span className="text-[20px] font-medium text-[#1E6F73]">€{trip.claimAmount.toFixed(2)}</span>
                   <div className="flex items-center gap-2 text-[13px] text-[#616A6B] mt-0.5 font-medium"><span>{trip.distanceKm.toFixed(1)} km</span><span className="w-1 h-1 rounded-full bg-[#D1D5DB]"></span><span>{trip.duration}</span></div>
                </div>
             </div>
             <div className="h-px bg-[#F9FAFB] w-full"></div>
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-2 text-[13px] text-[#000000] font-medium"><div className="p-1.5 rounded-lg bg-[#F9FAFB] text-[#616A6B] border border-[#E5E7EB]"><Car size={16} /></div><span>{trip.vehicle}</span></div>
                   <div className="flex items-center gap-2 text-[13px] text-[#000000] font-medium"><div className="p-1.5 rounded-lg bg-[#F9FAFB] text-[#616A6B] border border-[#E5E7EB]"><Suitcase size={16} /></div><span>{trip.drivePurpose}</span></div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => handleOpenMap(trip)} className="h-[36px] px-3 bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] rounded-xl text-[12px] font-medium text-[#000000] flex items-center gap-1.5 transition-colors shadow-sm"><MapTrifold size={16} weight="fill" className="text-[#1E6F73]" />View map</button>
                   <button className="h-[36px] w-[36px] flex items-center justify-center bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] rounded-xl text-[#000000] transition-colors shadow-sm"><PencilSimple size={16} /></button>
                </div>
             </div>
          </div>
        ))}
      </div>
      <MileageMapModal isOpen={isMapOpen} onClose={handleCloseMap} trip={selectedTrip} />
    </>
  );
};

export default MileagesList;