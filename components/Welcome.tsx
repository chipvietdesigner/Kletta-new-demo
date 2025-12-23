import React, { useState } from 'react';
import { ArrowRight, DownloadSimple, CheckCircle, Play } from '@phosphor-icons/react';
import { WelcomeData, WelcomeSectionItem } from '../types';
import WelcomeDetailModal from './WelcomeDetailModal';

const MOCK_WELCOME_DATA: WelcomeData = {
  sections: {
    get_started: [
      { title: "Welcome to Kletta", description: "Welcome message from CEO Matti Lannetta.", cta: "View details", image_url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800", video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", modalSubtitle: "Start here if you’re new to the portal.", longDescription: "This overview video covers the essentials of managing your sole trader clients.", items: ["Dashboard navigation", "Client management", "Support resources"] },
    ],
    quick_start: [],
    resources: [],
    support: [],
    community: [],
    newsletter: []
  }
};

const Welcome: React.FC = () => {
  const { sections } = MOCK_WELCOME_DATA;
  const [selectedItem, setSelectedItem] = useState<WelcomeSectionItem | null>(null);

  return (
    <>
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/50 p-8">
        <div className="max-w-[1200px] mx-auto space-y-12">
          <div><h1 className="text-2xl font-medium text-[#000000] mb-2">Welcome to Kletta</h1><p className="text-[13px] text-[#616A6B] font-medium">Everything you need to get started and support your clients.</p></div>
          <div>
            <h2 className="text-[16px] font-medium text-[#000000] mb-6 border-b border-gray-200 pb-2">Let's Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sections.get_started.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col hover:shadow-md transition-shadow group">
                  <div className="w-full aspect-[16/10] bg-gray-100 rounded-lg mb-4 overflow-hidden relative border border-gray-100"><img src={item.image_url} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                  <h3 className="text-[14px] font-medium text-[#000000] mb-2">{item.title}</h3>
                  <p className="text-[12px] text-[#616A6B] mb-4 flex-1 leading-relaxed font-medium">{item.description}</p>
                  <button onClick={() => setSelectedItem(item)} className="w-full h-[36px] bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] text-[12px] font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2">{item.cta}<ArrowRight size={14} weight="bold" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <WelcomeDetailModal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} item={selectedItem} />
    </>
  );
};

export default Welcome;