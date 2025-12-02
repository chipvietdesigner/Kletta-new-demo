
import React, { useState } from 'react';
import { DownloadSimple } from '@phosphor-icons/react';

const MOCK_MESSAGES = `Hei, olen Kletta, tekoälykirjanpitäjäsi. Olen täällä auttaakseni sinua toiminimiyrittäjän kirjanpidossa.

Voin auttaa sinua esimerkiksi:
- Kirjaamaan tuloja ja menoja
- Seuraamaan arvonlisäveroa (ALV)
- Luomaan raportteja verottajalle
- Vastaamaan kysymyksiin vähennyksistä

Muista, että olen tekoäly, joten tarkistathan aina tärkeät tiedot virallisista lähteistä tai kirjanpitäjältäsi.

Jos sinulla on kysyttävää, voit kirjoittaa minulle chatissa. Autan mielelläni!

---

Hi, I'm Kletta, your AI accountant. I'm here to help you with sole trader accounting.

I can help you with:
- Recording income and expenses
- Tracking VAT
- Creating reports for tax authorities
- Answering questions about deductions

Please remember that I am an AI, so always double-check important information from official sources or your accountant.

If you have any questions, feel free to chat with me. I'm happy to help!`;

const AISupport: React.FC = () => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-gray-50 flex flex-col h-full">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between flex-shrink-0">
        <h1 className="text-2xl font-bold text-[#002b31]">AI Support Intelligence</h1>
        <button className="bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] text-xs font-medium px-3 py-1.5 rounded flex items-center gap-2 transition-colors shadow-sm">
          <DownloadSimple size={14} />
          Download CSV
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden">
          {/* Card Header */}
          <div className="px-8 py-6 border-b border-gray-100 flex-shrink-0">
            <h2 className="text-[14px] font-bold text-gray-500 uppercase tracking-wide">MESSAGES</h2>
          </div>

          {/* Text Area Container */}
          <div className="p-8 flex-1 flex flex-col min-h-0">
            <textarea
              value={messages}
              onChange={(e) => setMessages(e.target.value)}
              className="w-full h-full p-4 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-900 leading-relaxed focus:outline-none focus:border-[#004d40] focus:ring-1 focus:ring-[#004d40] transition-colors resize-none custom-scrollbar"
              placeholder="Enter AI support messages here..."
            />
          </div>

          {/* Card Footer */}
          <div className="px-8 py-6 border-t border-gray-100 flex justify-end flex-shrink-0 bg-white rounded-b-lg">
            <button 
              className="h-[40px] px-6 bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] text-[13px] font-bold rounded-lg transition-colors shadow-sm"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISupport;
