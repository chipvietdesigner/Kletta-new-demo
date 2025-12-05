
import React, { useState } from 'react';
import { MileageTrip } from '../types';
import { Trash, CaretDown, MapPin, MapTrifold } from '@phosphor-icons/react';
import MileageMapModal from './MileageMapModal';

interface MileagesListProps {
  mileages: MileageTrip[];
}

const MileagesList: React.FC<MileagesListProps> = ({ mileages }) => {
  const [selectedTrip, setSelectedTrip] = useState<MileageTrip | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleOpenMap = (trip: MileageTrip) => {
    setSelectedTrip(trip);
    setIsMapOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapOpen(false);
    setTimeout(() => setSelectedTrip(null), 300);
  };

  return (
    <>
      <div className="flex flex-col gap-4 pb-6">
        {mileages.map((trip) => (
          <div key={trip.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row overflow-hidden group h-auto lg:h-[180px]">
             
             {/* LEFT: Map Thumbnail */}
             <div 
               className="w-full lg:w-[180px] h-[120px] lg:h-full bg-gray-100 relative cursor-pointer border-b lg:border-b-0 lg:border-r border-gray-100 flex-shrink-0 group/map"
               onClick={() => handleOpenMap(trip)}
             >
                {/* Simulated Map Background */}
                <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ 
                    backgroundImage: 'radial-gradient(#cfd8dc 1px, transparent 1px)', 
                    backgroundSize: '10px 10px',
                    backgroundColor: '#f8fafc'
                }}></div>
                
                {/* Simulated Road Path */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                     <svg width="100%" height="100%">
                        <path d="M 40 40 Q 90 60 140 120" stroke="#94a3b8" strokeWidth="4" fill="none" />
                     </svg>
                </div>

                {/* Pins Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <div className="relative h-16 w-8">
                      <MapPin weight="fill" className="text-gray-400 absolute top-0 left-1/2 -translate-x-1/2" size={18} />
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gray-400 border-l border-dashed border-gray-500/50"></div>
                      <MapPin weight="fill" className="text-[#004d40] absolute bottom-0 left-1/2 -translate-x-1/2" size={18} />
                   </div>
                </div>
                
                {/* Label */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#002b31] bg-white/90 px-3 py-1 rounded-full shadow-sm whitespace-nowrap opacity-0 group-hover/map:opacity-100 transition-opacity">
                   Click to view map
                </div>
             </div>

             {/* MIDDLE: Details */}
             <div className="flex-1 p-5 flex flex-col justify-center min-w-0">
                <div className="flex gap-4">
                   {/* Timeline visual */}
                   <div className="flex flex-col items-center pt-1.5 gap-1 flex-shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-300 bg-white"></div>
                      <div className="w-0.5 flex-1 bg-gray-200 min-h-[24px]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#fcd34d] border border-[#fcd34d]"></div>
                   </div>

                   {/* Addresses */}
                   <div className="flex-1 min-w-0 space-y-4">
                      <div>
                         <div className="text-[13px] font-bold text-[#002b31] leading-tight truncate">{trip.startAddress}</div>
                         <div className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1.5 truncate">
                            <span>{trip.startCityCountry}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span>{trip.date}</span>
                         </div>
                      </div>
                      <div>
                         <div className="text-[13px] font-bold text-[#002b31] leading-tight truncate">{trip.endAddress}</div>
                         <div className="text-[11px] text-gray-400 mt-0.5 truncate">{trip.endCityCountry}</div>
                      </div>
                   </div>
                </div>

                {/* Metrics Chips Row */}
                <div className="flex items-center gap-3 mt-5 pl-[26px] flex-wrap">
                   {/* Duration */}
                   <div className="bg-gray-50 border border-gray-200 rounded px-2.5 py-1.5 flex flex-col min-w-[80px]">
                      <span className="text-[9px] font-bold text-gray-400 uppercase mb-0.5 tracking-wide">Duration</span>
                      <span className="text-[12px] font-bold text-[#002b31]">{trip.duration}</span>
                   </div>
                   
                   {/* Distance */}
                   <div className="bg-gray-50 border border-gray-200 rounded px-2.5 py-1.5 flex flex-col min-w-[80px]">
                      <span className="text-[9px] font-bold text-gray-400 uppercase mb-0.5 tracking-wide">Distance</span>
                      <span className="text-[12px] font-bold text-[#002b31]">{trip.distanceKm.toFixed(2)} km</span>
                   </div>

                   {/* Claim */}
                   <div className="bg-[#fffdf5] border border-[#fcd34d] rounded px-2.5 py-1.5 flex flex-col min-w-[80px]">
                      <span className="text-[9px] font-bold text-[#002b31]/60 uppercase mb-0.5 tracking-wide">Claim</span>
                      <span className="text-[12px] font-bold text-[#002b31]">€{trip.claimAmount.toFixed(2)}</span>
                   </div>

                   {/* Text Map Button */}
                   <button 
                     onClick={() => handleOpenMap(trip)} 
                     className="ml-2 text-[11px] font-bold text-[#004d40] hover:text-[#002b31] hover:underline flex items-center gap-1.5 transition-colors group/btn"
                   >
                       <MapTrifold size={14} weight="fill" className="text-[#004d40] group-hover/btn:text-[#002b31]" />
                       Show on map
                   </button>
                </div>
             </div>

             {/* RIGHT: Controls */}
             <div className="w-full lg:w-[420px] border-t lg:border-t-0 lg:border-l border-gray-100 bg-gray-50/30 p-5 flex items-center gap-4 flex-shrink-0">
                <div className="flex-1 grid grid-cols-2 gap-4">
                   <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase mb-1.5 block tracking-wide">Vehicle in use</label>
                      <div className="relative">
                         <select 
                             className="w-full h-[36px] pl-3 pr-8 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 font-medium focus:outline-none focus:border-[#004d40] appearance-none cursor-pointer hover:border-gray-300 transition-colors shadow-sm"
                             defaultValue={trip.vehicle}
                         >
                            <option>KIA (ABC-123)</option>
                            <option>Tesla Model 3</option>
                            <option>VW Golf</option>
                            <option>Audi A4</option>
                         </select>
                         <CaretDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                   </div>
                   <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase mb-1.5 block tracking-wide">Drive purpose</label>
                      <div className="relative">
                         <select 
                             className="w-full h-[36px] pl-3 pr-8 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 font-medium focus:outline-none focus:border-[#004d40] appearance-none cursor-pointer hover:border-gray-300 transition-colors shadow-sm"
                             defaultValue={trip.drivePurpose}
                         >
                            <option>Client work</option>
                            <option>Meeting</option>
                            <option>Between offices</option>
                            <option>Personal</option>
                            <option>Airport/Travel</option>
                         </select>
                         <CaretDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-6 pl-2 border-l border-gray-200/50">
                   <div className="flex flex-col min-w-[60px]">
                      <label className="text-[10px] text-gray-400 font-bold uppercase mb-1 block tracking-wide">Country</label>
                      <span className="text-[13px] font-medium text-gray-700">{trip.country}</span>
                   </div>
                   <button className="text-gray-400 hover:text-red-600 w-8 h-8 flex items-center justify-center hover:bg-red-50 rounded-lg transition-colors">
                      <Trash size={18} />
                   </button>
                </div>
             </div>

          </div>
        ))}
      </div>

      <MileageMapModal 
        isOpen={isMapOpen} 
        onClose={handleCloseMap} 
        trip={selectedTrip} 
      />
    </>
  );
};

export default MileagesList;
