
import React, { useState } from 'react';
import { 
  MagnifyingGlass, 
  PaperPlaneRight, 
  Paperclip, 
  Smiley, 
  DotsThreeVertical,
  CheckCircle,
  Clock,
  DownloadSimple,
  PencilSimple,
  Phone,
  VideoCamera,
  Archive
} from '@phosphor-icons/react';

interface Message {
  id: string;
  text: string;
  sender: 'customer' | 'internal';
  timestamp: string;
  attachments?: string[];
}

interface Conversation {
  id: string;
  customerName: string;
  customerAvatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  plan: string;
  status: 'active' | 'archived';
  messages: Message[];
}

// Mock Data
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    customerName: 'Sami Kletta',
    customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'Is the VAT report ready for download?',
    timestamp: '10:42 AM',
    unreadCount: 2,
    plan: 'Kletta Solo',
    status: 'active',
    messages: [
      { id: 'm1', sender: 'customer', text: 'Hi, I was checking my dashboard and noticed the VAT calculation seems a bit off for last month.', timestamp: 'Yesterday 14:30' },
      { id: 'm2', sender: 'internal', text: 'Hello Sami! Thanks for reaching out. Let me take a look at your account details. One moment please.', timestamp: 'Yesterday 14:35' },
      { id: 'm3', sender: 'internal', text: 'I checked the transactions. It looks like the "Consulting Fees" entry on the 19th had a 0% tax rate applied instead of 24%.', timestamp: 'Yesterday 14:42' },
      { id: 'm4', sender: 'customer', text: 'Ah, that makes sense. Can you fix it or should I edit it manually?', timestamp: 'Yesterday 14:45' },
      { id: 'm5', sender: 'internal', text: 'I can update that for you right now.', timestamp: 'Yesterday 14:46' },
      { id: 'm6', sender: 'internal', text: 'Done! The report should update automatically.', timestamp: 'Yesterday 14:47' },
      { id: 'm7', sender: 'customer', text: 'Great, thank you! One more question: Is the VAT report ready for download now?', timestamp: '10:42 AM' }
    ]
  },
  {
    id: '2',
    customerName: 'Timma Oy',
    lastMessage: 'Thanks for the update.',
    timestamp: 'Yesterday',
    unreadCount: 0,
    plan: 'Kletta Care',
    status: 'active',
    messages: [
      { id: 'm1', sender: 'internal', text: 'Your monthly report is ready.', timestamp: 'Yesterday 09:00' },
      { id: 'm2', sender: 'customer', text: 'Thanks for the update.', timestamp: 'Yesterday 09:15' }
    ]
  },
  {
    id: '3',
    customerName: 'Origami Studio',
    lastMessage: 'Can we schedule a call?',
    timestamp: 'Tue',
    unreadCount: 0,
    plan: 'Kletta Solo',
    status: 'active',
    messages: []
  },
  {
    id: '4',
    customerName: 'James Smith',
    lastMessage: 'Invoice #4402 has been paid.',
    timestamp: 'Mon',
    unreadCount: 0,
    plan: 'Partner',
    status: 'active',
    messages: []
  }
];

const Chat: React.FC = () => {
  const [activeConversationId, setActiveConversationId] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');

  const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === activeConversationId) || MOCK_CONVERSATIONS[0];

  return (
    <div className="flex h-full bg-white font-sans overflow-hidden">
      {/* LEFT SIDEBAR: Conversation List */}
      <div className="w-[320px] border-r border-gray-200 flex flex-col flex-shrink-0 bg-white">
        {/* Sidebar Header / Search */}
        <div className="h-[64px] px-4 border-b border-gray-200 flex items-center flex-shrink-0">
           <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <MagnifyingGlass size={14} />
              </div>
              <input 
                type="text" 
                placeholder="Search conversations..."
                className="w-full h-[32px] pl-9 pr-3 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 placeholder-gray-400 focus:border-[#004d40] focus:ring-1 focus:ring-[#004d40] transition-colors focus:outline-none"
              />
           </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {MOCK_CONVERSATIONS.map((conv) => (
            <div 
              key={conv.id}
              onClick={() => setActiveConversationId(conv.id)}
              className={`h-[72px] px-4 flex items-center gap-3 cursor-pointer border-b border-gray-50 transition-colors ${
                activeConversationId === conv.id 
                  ? 'bg-[#fffdf5] border-l-4 border-l-[#fcd34d] pl-[12px]' // Kletta active style
                  : 'bg-white hover:bg-gray-50 border-l-4 border-l-transparent pl-[12px]'
              }`}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border border-gray-200">
                  {conv.customerAvatar ? (
                    <img src={conv.customerAvatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500 font-semibold text-xs">{conv.customerName.substring(0, 2).toUpperCase()}</span>
                  )}
                </div>
                {/* Status dot */}
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-center h-full py-2">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className={`text-[13px] truncate ${activeConversationId === conv.id ? 'font-bold text-[#002b31]' : 'font-medium text-gray-900'}`}>
                    {conv.customerName}
                  </span>
                  <span className="text-[11px] text-gray-400 ml-2 flex-shrink-0 whitespace-nowrap">
                    {conv.timestamp}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                   <p className="text-[12px] text-gray-500 truncate pr-2">
                     {conv.lastMessage}
                   </p>
                   {conv.unreadCount > 0 && (
                     <div className="w-4 h-4 rounded-full bg-[#fcd34d] text-[#002b31] text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                       {conv.unreadCount}
                     </div>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CENTER AREA: Chat Thread */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Chat Header */}
        <div className="h-[64px] px-6 border-b border-gray-200 flex items-center justify-between flex-shrink-0 bg-white">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                  {activeConversation.customerAvatar ? (
                    <img src={activeConversation.customerAvatar} alt="" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-gray-500 font-bold text-sm">{activeConversation.customerName.substring(0, 2)}</span>
                  )}
              </div>
              <div className="flex flex-col">
                 <div className="flex items-center gap-2">
                    <h2 className="text-[14px] font-bold text-[#002b31]">{activeConversation.customerName}</h2>
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-semibold border border-gray-200 uppercase tracking-wide">
                      {activeConversation.plan}
                    </span>
                 </div>
                 <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-[11px] text-gray-500 font-medium">Active now</span>
                    <span className="text-[11px] text-gray-300">•</span>
                    <span className="text-[11px] text-gray-500">Local time 14:22</span>
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-2">
              <button className="h-[32px] w-[32px] flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
                 <Phone size={16} />
              </button>
              <button className="h-[32px] w-[32px] flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
                 <VideoCamera size={16} />
              </button>
              <div className="h-4 w-px bg-gray-200 mx-1"></div>
              <button className="h-[32px] px-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 font-medium flex items-center gap-2 shadow-sm transition-colors">
                <DownloadSimple size={14} className="text-gray-500" />
                History
              </button>
              <button className="h-[32px] px-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 font-medium flex items-center gap-2 shadow-sm transition-colors">
                <PencilSimple size={14} className="text-gray-500" />
                Edit
              </button>
              <button className="h-[32px] w-[32px] flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors ml-1">
                 <DotsThreeVertical size={16} />
              </button>
           </div>
        </div>

        {/* Thread Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-white space-y-6">
           {/* Date Divider */}
           <div className="flex justify-center">
             <span className="text-[11px] text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
               Yesterday
             </span>
           </div>

           {activeConversation.messages.map((msg) => (
             <div 
                key={msg.id} 
                className={`flex w-full ${msg.sender === 'internal' ? 'justify-end' : 'justify-start'}`}
             >
                <div className={`flex max-w-[70%] ${msg.sender === 'internal' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                   {/* Avatar for message */}
                   <div className="flex-shrink-0 mt-auto">
                     {msg.sender === 'internal' ? (
                       <div className="w-8 h-8 rounded-full bg-[#002b31] flex items-center justify-center text-[#fcd34d] text-xs font-bold border border-gray-200">
                          YOU
                       </div>
                     ) : (
                       <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-200">
                          {activeConversation.customerAvatar ? (
                             <img src={activeConversation.customerAvatar} alt="" className="w-full h-full object-cover" />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center text-gray-500 text-[10px] font-bold">
                               {activeConversation.customerName.substring(0, 2)}
                             </div>
                          )}
                       </div>
                     )}
                   </div>

                   {/* Bubble */}
                   <div className="flex flex-col gap-1 min-w-0">
                      <div 
                        className={`px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                          msg.sender === 'internal' 
                            ? 'bg-[#fffdf5] border border-[#fcd34d]/30 text-[#002b31] rounded-br-none' 
                            : 'bg-white border border-gray-100 text-gray-900 rounded-bl-none'
                        }`}
                      >
                         {msg.text}
                      </div>
                      <span 
                        className={`text-[10px] text-gray-400 ${
                          msg.sender === 'internal' ? 'text-right' : 'text-left'
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 p-4 bg-white border-t border-gray-200">
           <div className="flex flex-col gap-3">
              {/* Toolbar */}
              <div className="flex items-center gap-2">
                 {/* Reusing Income table filter button style */}
                 <button className="h-[28px] px-2 bg-white border border-gray-200 hover:bg-gray-50 rounded text-[11px] text-gray-600 font-medium flex items-center gap-1.5 transition-colors">
                    <CheckCircle size={14} className="text-gray-400" />
                    Mark as resolved
                 </button>
                 <button className="h-[28px] px-2 bg-white border border-gray-200 hover:bg-gray-50 rounded text-[11px] text-gray-600 font-medium flex items-center gap-1.5 transition-colors">
                    <Archive size={14} className="text-gray-400" />
                    Archive
                 </button>
              </div>

              {/* Input Box */}
              <div className="relative">
                 <input 
                   type="text" 
                   value={newMessage}
                   onChange={(e) => setNewMessage(e.target.value)}
                   placeholder="Type a message..."
                   className="w-full h-[48px] pl-4 pr-[120px] bg-white border border-gray-200 rounded-lg text-[13px] text-gray-900 placeholder-gray-400 focus:border-[#004d40] focus:ring-1 focus:ring-[#004d40] transition-all shadow-sm focus:outline-none"
                 />
                 
                 <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
                       <Paperclip size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
                       <Smiley size={18} />
                    </button>
                    <button className="h-[32px] px-4 bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] rounded text-[12px] font-bold flex items-center gap-2 transition-colors ml-1">
                       Send
                       <PaperPlaneRight size={14} weight="bold" />
                    </button>
                 </div>
              </div>
           </div>
           
           <div className="text-center mt-2">
              <span className="text-[10px] text-gray-400">
                Press Enter to send • Shift + Enter for new line
              </span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
