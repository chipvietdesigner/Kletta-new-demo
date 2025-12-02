
import React from 'react';
import { ArrowRight, DownloadSimple, CheckCircle } from '@phosphor-icons/react';
import { WelcomeData } from '../types';

const MOCK_WELCOME_DATA: WelcomeData = {
  sections: {
    get_started: [
      {
        title: "Welcome to Kletta",
        description: "Welcome message from CEO Matti Lannetta.",
        cta: "View details",
        image_url: "IMG_WELCOME_URL"
      },
      {
        title: "Portal Guide",
        description: "Download the full accountant guide.",
        cta: "Download Guide",
        image_url: "IMG_GUIDE_URL"
      },
      {
        title: "Portal Walkthrough",
        description: "Overview of the Accountant Portal interface and features.",
        cta: "View details",
        image_url: "IMG_PORTAL_WALKTHROUGH_URL"
      },
      {
        title: "Invite Your First Client",
        description: "Guide to inviting a test sole trader account.",
        cta: "View steps",
        image_url: "IMG_INVITE_TEST_URL"
      }
    ],
    quick_start: [
      {
        title: "A day in the life of a sole trader",
        description: "See how a typical sole trader uses the Kletta mobile app.",
        cta: "View details",
        image_url: "IMG_SOLE_TRADER_DAY_URL"
      },
      {
        title: "Sending invitations",
        description: "Guide for sending invitations individually or in bulk.",
        cta: "View details",
        image_url: "IMG_INVITATIONS_URL"
      },
      {
        title: "Mobile app overview",
        description: "Overview of receipts, mileage, invoices, chat.",
        cta: "View details",
        image_url: "IMG_APP_OVERVIEW_URL"
      }
    ],
    resources: [
      {
        title: "Templates & documents",
        items: [
          "Invite letter",
          "CSV import template",
          "Quick-start PDF"
        ],
        cta: "Download assets"
      },
      {
        title: "Support Materials",
        items: [
          "In-app chat walkthrough",
          "Backfilling YTD",
          "Remote login"
        ],
        cta: "View details"
      },
      {
        title: "Community & Support",
        items: [
          "Join Kletta community",
          "Weekly Meet & Greet Webinar",
          "Contact support"
        ],
        cta: "Open resources"
      }
    ],
    support: [
      {
        title: "1:1 Support & Webinars",
        description: "Book meetings with Kevin, join weekly Meet & Greet webinars, or contact support@kletta.com.",
        cta: "Schedule meeting",
        secondary_cta: "Join Webinar",
        image_url: "IMG_SUPPORT_MEETING_URL"
      },
      {
        title: "Partner Success Resources",
        description: "Access enablement packs, guides, templates, and support materials for partner success.",
        cta: "Open resources",
        image_url: "IMG_PARTNER_SUPPORT_URL"
      }
    ],
    community: [
      {
        title: "Kletta For Accountants Community Forum",
        description: "A community forum inside the portal, where partners can share ideas and best practice.",
        cta: "Learn more",
        image_url: "IMG_COMMUNITY_URL"
      }
    ],
    newsletter: [
      {
        title: "Partner Newsletter",
        description: "Receive shared insights, news, and product updates from Kletta.",
        cta: "Subscribe",
        image_url: "IMG_NEWSLETTER_URL"
      }
    ]
  }
};

const ImagePlaceholder: React.FC<{ label?: string }> = ({ label }) => (
  <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4 border border-gray-200">
    <span className="text-xs text-gray-400 font-mono">{label || 'IMAGE'}</span>
  </div>
);

const Welcome: React.FC = () => {
  const { sections } = MOCK_WELCOME_DATA;

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/50 p-8">
      <div className="max-w-[1200px] mx-auto space-y-12">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#002b31] mb-2">Welcome to Kletta</h1>
          <p className="text-[14px] text-gray-500">Everything you need to get started and support your clients.</p>
        </div>

        {/* SECTION A: Let's Get Started */}
        <div>
          <h2 className="text-[16px] font-bold text-[#002b31] mb-6 border-b border-gray-200 pb-2">Let's Get Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.get_started.map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col hover:shadow-md transition-shadow">
                <ImagePlaceholder label={item.image_url} />
                <h3 className="text-[14px] font-bold text-[#002b31] mb-2">{item.title}</h3>
                <p className="text-[12px] text-gray-500 mb-4 flex-1">{item.description}</p>
                <button className="w-full h-[36px] bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] text-[12px] font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2">
                  {item.cta}
                  <ArrowRight size={14} weight="bold" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION B: Quick Start Tutorials */}
        <div>
          <h2 className="text-[16px] font-bold text-[#002b31] mb-6 border-b border-gray-200 pb-2">Quick Start Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.quick_start.map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col hover:shadow-md transition-shadow">
                <ImagePlaceholder label={item.image_url} />
                <h3 className="text-[14px] font-bold text-[#002b31] mb-2">{item.title}</h3>
                <p className="text-[12px] text-gray-500 mb-4 flex-1">{item.description}</p>
                <button className="w-full h-[36px] bg-white border border-gray-200 hover:bg-gray-50 text-[#002b31] text-[12px] font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2">
                  {item.cta}
                  <ArrowRight size={14} weight="bold" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION C: Explore Resources */}
        <div>
          <h2 className="text-[16px] font-bold text-[#002b31] mb-6 border-b border-gray-200 pb-2">Explore Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.resources.map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow">
                <h3 className="text-[14px] font-bold text-[#002b31] mb-4">{item.title}</h3>
                <div className="flex-1 space-y-3 mb-6">
                  {item.items?.map((subItem, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-[13px] text-gray-600">
                      <CheckCircle size={16} className="text-gray-300 flex-shrink-0" />
                      <span>{subItem}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full h-[36px] bg-white border border-gray-200 hover:bg-gray-50 text-[#002b31] text-[12px] font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2">
                  {item.cta}
                  <DownloadSimple size={14} weight="bold" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION D: Further Support */}
        <div>
          <h2 className="text-[16px] font-bold text-[#002b31] mb-6 border-b border-gray-200 pb-2">Further Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.support.map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                <div className="w-full md:w-1/3 flex-shrink-0">
                   <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 text-xs text-gray-400 font-mono">
                      {item.image_url}
                   </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="text-[14px] font-bold text-[#002b31] mb-2">{item.title}</h3>
                  <p className="text-[13px] text-gray-600 mb-6 flex-1 leading-relaxed">{item.description}</p>
                  <div className="flex gap-3">
                    <button className="flex-1 h-[36px] bg-[#002b31] hover:bg-[#003840] text-white text-[12px] font-bold rounded-lg transition-colors shadow-sm">
                      {item.cta}
                    </button>
                    {item.secondary_cta && (
                      <button className="flex-1 h-[36px] bg-white border border-gray-200 hover:bg-gray-50 text-[#002b31] text-[12px] font-bold rounded-lg transition-colors shadow-sm">
                        {item.secondary_cta}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION E & F: Community & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Community */}
          {sections.community.map((item, idx) => (
            <div key={idx} className="bg-[#002b31] text-white border border-[#002b31] rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-6">
               <div className="flex-1">
                  <h3 className="text-[14px] font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-[13px] text-gray-300 mb-6 leading-relaxed">{item.description}</p>
                  <button className="h-[36px] px-6 bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] text-[12px] font-bold rounded-lg transition-colors shadow-sm">
                    {item.cta}
                  </button>
               </div>
               <div className="w-full md:w-1/3 flex-shrink-0 hidden md:flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
                  <span className="text-xs text-white/30 font-mono p-4 break-all">{item.image_url}</span>
               </div>
            </div>
          ))}

          {/* Newsletter */}
          {sections.newsletter.map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-6">
               <div className="flex-1">
                  <h3 className="text-[14px] font-bold text-[#002b31] mb-2">{item.title}</h3>
                  <p className="text-[13px] text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                  <button className="h-[36px] px-6 bg-white border border-gray-200 hover:bg-gray-50 text-[#002b31] text-[12px] font-bold rounded-lg transition-colors shadow-sm">
                    {item.cta}
                  </button>
               </div>
               <div className="w-full md:w-1/3 flex-shrink-0 hidden md:flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-xs text-gray-400 font-mono p-4 break-all">{item.image_url}</span>
               </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Welcome;
