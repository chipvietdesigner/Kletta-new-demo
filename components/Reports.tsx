import React from 'react';
import { DownloadSimple, PencilSimple, Info, CalendarBlank } from '@phosphor-icons/react';

interface ReportRowProps {
  label: string;
  amount: string;
  hasInput?: boolean;
  isTotal?: boolean;
}

const ReportRow: React.FC<ReportRowProps> = ({ label, amount, hasInput, isTotal }) => (
  <div className={`flex justify-between items-center py-3.5 group hover:bg-[#F9FAFB] transition-colors px-4 -mx-4 rounded-lg ${isTotal ? 'border-t border-[#E5E7EB] mt-2 pt-4' : 'border-b border-[#F9FAFB] last:border-0'}`}>
    <span className={`text-[13px] leading-relaxed ${isTotal ? 'font-bold text-[#0F2F33]' : 'font-medium text-[#4B5563]'}`}>{label}</span>
    <div className="flex items-center gap-4">
      {hasInput && (
        <button className="opacity-0 group-hover:opacity-100 bg-white hover:bg-[#F9FAFB] text-[#6B7280] hover:text-[#1E6F73] px-2.5 py-1 rounded-lg text-[11px] font-medium border border-[#E5E7EB] transition-all flex items-center gap-1.5 shadow-sm transform translate-x-2 group-hover:translate-x-0">
           <PencilSimple size={12} weight="bold" />
           Input amount
        </button>
      )}
      <span className={`text-[13px] tabular-nums ${isTotal ? 'font-bold text-[#0F2F33]' : 'font-semibold text-[#0F2F33]'}`}>{amount}</span>
    </div>
  </div>
);

const Reports: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#F9FAFB]/30">
      <div className="max-w-[880px] mx-auto px-6 py-10 pb-20">
        
        {/* Header Block */}
        <div className="mb-12 text-center flex flex-col items-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E5E7EB] rounded-full shadow-sm mb-4">
              <CalendarBlank size={14} className="text-[#1E6F73]" />
              <span className="text-[11px] font-bold text-[#4B5563] uppercase tracking-wide">Tax Year 2024 / 2025</span>
           </div>
           
           <h1 className="text-3xl font-bold text-[#0F2F33] tracking-tight mb-2">Self-Assessment 2024–2025</h1>
           
           <div className="flex items-center gap-3 text-[13px] text-[#4B5563] mb-4 font-medium">
             <span>Accounting period: <span className="font-bold text-[#0F2F33]">06.04.2024 – 05.04.2025</span></span>
           </div>

           <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-[#E5E7EB] shadow-sm">
             <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#FB923C]"></div>
                <span className="text-[12px] font-bold text-[#0F2F33] uppercase tracking-wide">Not sent</span>
             </div>
             <div className="w-px h-3 bg-[#E5E7EB]"></div>
             <span className="text-[12px] text-[#4B5563] font-medium">Submission deadline: 31 Jan 2026</span>
           </div>
        </div>

        {/* Document Container */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-8 md:p-12 space-y-12">
          
          {/* Section A: Business Income */}
          <div>
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#F9FAFB]">
               <h2 className="text-[16px] font-bold text-[#0F2F33]">Business Income</h2>
               <Info size={16} className="text-[#D1D5DB]" />
            </div>
            <div className="space-y-1 pl-1">
              <ReportRow label="Revenue" amount="£0.00" />
              <ReportRow label="Grants and subsidies received" amount="£0.00" />
              <ReportRow label="Other business income" amount="£0.00" />
              <ReportRow label="Interest income and other financial income" amount="£0.00" />
              <ReportRow label="Use on business assets for private purposes" amount="£0.00" hasInput />
            </div>
          </div>

          {/* Section B: Taxable Business Income (Summary) */}
          <div className="bg-[#FFF7D6] border border-[#F7D84A]/30 rounded-xl px-6 py-5 flex justify-between items-center">
              <div className="flex flex-col">
                 <span className="text-[15px] font-bold text-[#0F2F33]">Taxable business income</span>
                 <span className="text-[11px] text-[#4B5563] font-medium mt-0.5">Total calculated income before expenses</span>
              </div>
              <span className="text-[18px] font-bold text-[#0F2F33] tabular-nums">£0.00</span>
          </div>

          {/* Section C: Business Expenses */}
          <div>
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#F9FAFB]">
               <h2 className="text-[16px] font-bold text-[#0F2F33]">Business Expenses</h2>
               <Info size={16} className="text-[#D1D5DB]" />
            </div>
            <div className="space-y-1 pl-1">
              <ReportRow label="Cost of goods bought for resale or goods used" amount="£0.00" />
              <ReportRow label="Car, van and travel expenses" amount="£0.00" />
              <ReportRow label="Mileage claim 45p" amount="£0.00" />
              <ReportRow label="Mileage claim 25p" amount="£0.00" />
              <ReportRow label="Employee wages, salaries and other staff costs" amount="£0.00" />
              <ReportRow label="Total amount of capital allowances" amount="£0.00" />
              <ReportRow label="Rent, rates, power and insurance costs" amount="£0.00" />
              <ReportRow label="Repairs and maintenance of property and equipment" amount="£0.00" />
              <ReportRow label="Phone, fax, stationery and other office costs" amount="£0.00" />
              <ReportRow label="Advertising and business entertainment costs" amount="£0.00" />
              <ReportRow label="Interest on bank and other loans" amount="£0.00" />
              <ReportRow label="Bank, credit card and other financial charges" amount="£0.00" />
              <ReportRow label="Irrecoverable debts written off" amount="£0.00" />
              <ReportRow label="Accountancy, legal and other professional fees" amount="£0.00" />
              <ReportRow label="Depreciation and loss/profit on sale of assets" amount="£0.00" />
              <ReportRow label="Other business expenses" amount="£0.00" />
              <ReportRow label="Loss brought forward from earlier years" amount="£0.00" hasInput />
            </div>
          </div>
          
          {/* Footer / Total Expenses Estimate */}
           <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-6 py-5 flex justify-between items-center">
              <div className="flex flex-col">
                 <span className="text-[15px] font-bold text-[#0F2F33]">Total Expenses</span>
                 <span className="text-[11px] text-[#4B5563] font-medium mt-0.5">Calculated deductible expenses</span>
              </div>
              <span className="text-[18px] font-bold text-[#0F2F33] tabular-nums">£0.00</span>
           </div>

        </div>

        {/* Page Footer Actions */}
        <div className="flex flex-col items-center mt-10 gap-4">
           <div className="flex gap-4">
              <button className="bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] text-[#0F2F33] font-bold text-[13px] px-6 py-3 rounded-xl shadow-sm transition-all flex items-center gap-2 h-[48px]">
                 <DownloadSimple size={16} weight="bold" />
                 Download PDF
              </button>
              <button className="bg-[#F7D84A] hover:bg-[#FCD34D] text-[#0F3A3E] font-bold text-[13px] px-8 py-3 rounded-xl shadow-sm transition-all transform active:scale-95 h-[48px]">
                 Submit Assessment
              </button>
           </div>
           <p className="text-[11px] text-[#9CA3AF] max-w-md text-center">
             By submitting, you confirm that the information provided is accurate to the best of your knowledge.
           </p>
        </div>

      </div>
    </div>
  );
};

export default Reports;