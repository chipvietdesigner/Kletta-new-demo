import React, { useState, useRef, useEffect } from 'react';
import { IncomeTransaction } from '../types';
import { 
  FileText, 
  SealCheck,
  Handshake, 
  Percent, 
  XCircle, 
  Check, 
  CurrencyDollar, 
  Users, 
  Package, 
  Buildings, 
  Coffee, 
  Receipt, 
  Car, 
  CaretDown,
  Globe,
  Tag,
  Desktop,
  Bank,
  Plus
} from '@phosphor-icons/react';

interface TransactionTableProps {
  transactions: IncomeTransaction[];
}

const CATEGORY_OPTIONS = [
  { id: 'External services', label: 'External services', description: 'Purchased external services', icon: Handshake },
  { id: 'Interest expenses', label: 'Interest expenses', description: 'Loan interest payments', icon: Percent },
  { id: 'Non-allowable expenses', label: 'Non-allowable expenses', description: 'Not tax-deductible', icon: XCircle },
  { id: 'Other deductible expenses', label: 'Other deductible expenses', description: 'Misc. tax-deductible costs', icon: Check },
  { id: 'Other financial cost', label: 'Other financial cost', description: 'Other financial expenses not included in interest', icon: CurrencyDollar },
  { id: 'Personnel cost', label: 'Personnel cost', description: 'Employee salaries, wages and social costs', icon: Users },
  { id: 'Purchases & inventory changes', label: 'Purchases & inventory changes', description: 'Purchase of goods and changes in stock', icon: Package },
  { id: 'Rents', label: 'Rents', description: 'Rental of space or equipment', icon: Buildings },
  { id: 'Representation expenses', label: 'Representation expenses', description: 'Client meetings & representation', icon: Coffee },
  { id: 'Advance tax', label: 'Advance tax', description: 'Prepaid taxes', icon: Receipt },
  { id: 'Vehicle cost', label: 'Vehicle cost', description: 'Fuel, maintenance, leasing', icon: Car },
  { id: 'Business Income', label: 'Business Income', description: 'Standard business income', icon: CurrencyDollar },
  { id: 'Consulting Fees', label: 'Consulting Fees', description: 'Professional advice services', icon: Users },
  { id: 'Service Income', label: 'Service Income', description: 'General services', icon: Handshake },
  { id: 'Online Sales', label: 'Online Sales', description: 'Revenue from online channels', icon: Globe },
  { id: 'Merchandise', label: 'Merchandise', description: 'Goods sold', icon: Tag },
  { id: 'Software Sales', label: 'Software Sales', description: 'Licenses and subscriptions', icon: Desktop },
  { id: 'Grants', label: 'Grants', description: 'Government or private funding', icon: Bank },
  { id: 'Other Income', label: 'Other Income', description: 'Miscellaneous revenue', icon: Plus },
];

const CategorySelect: React.FC<{ value: string; onChange: (val: string) => void }> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = CATEGORY_OPTIONS.find(opt => opt.id === value) || { id: value, label: value, description: 'Custom category', icon: Plus };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full h-[42px]" ref={dropdownRef}>
      <button onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} className="w-full h-full bg-white border border-[#E5E7EB] rounded-xl px-3 text-[13px] focus:outline-none focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] cursor-pointer flex items-center justify-between text-left group transition-all hover:border-[#D1D5DB]">
        <div className="flex items-center gap-2 overflow-hidden">
          <selectedOption.icon size={16} className="text-[#616A6B] flex-shrink-0" />
          <span className="truncate font-medium text-[#000000]">{selectedOption.label}</span>
        </div>
        <CaretDown size={14} className="text-[#616A6B] group-hover:text-[#000000] flex-shrink-0 ml-1" />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-[320px] bg-white rounded-xl shadow-lg border border-[#E5E7EB] z-50 max-h-[320px] overflow-y-auto custom-scrollbar" onClick={(e) => e.stopPropagation()}>
          {CATEGORY_OPTIONS.map((opt) => (
            <div key={opt.id} onClick={() => { onChange(opt.id); setIsOpen(false); }} className="px-4 py-3 hover:bg-[#F9FAFB] cursor-pointer flex items-start gap-3 border-b border-[#E5E7EB] last:border-0 transition-colors">
              <div className="flex-shrink-0 mt-0.5 text-[#616A6B] bg-[#F9FAFB] p-2 rounded-lg"><opt.icon size={18} /></div>
              <div className="flex flex-col">
                 <span className="text-[13px] font-medium text-[#000000] leading-tight">{opt.label}</span>
                 <span className="text-[12px] text-[#616A6B] leading-tight mt-1">{opt.description}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);
  const calculateTotals = () => {
    const subtotal = transactions.reduce((sum, t) => sum + t.subtotal, 0);
    const vat = transactions.reduce((sum, t) => sum + t.vat, 0);
    const total = transactions.reduce((sum, t) => sum + t.totalAmount, 0);
    return { subtotal, vat, total };
  };
  const totals = calculateTotals();

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-4 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto flex-1 custom-scrollbar pb-0">
        <table className="min-w-[1900px] text-left table-fixed w-full border-collapse">
          <thead className="bg-[#F9FAFB] text-[#616A6B] sticky top-0 z-10 h-[48px] border-b border-[#E5E7EB]">
            <tr>
              <th className="px-4 font-normal text-[13px] w-[100px]">Date</th>
              <th className="px-4 font-normal text-[13px] w-[240px]">Customer</th>
              <th className="px-4 font-normal text-[13px] w-[240px]">Category</th>
              <th className="px-4 font-normal text-[13px] w-[130px]">Type ID</th>
              <th className="px-4 font-normal text-[13px] w-[140px]">Method</th>
              <th className="px-4 font-normal text-[13px] w-[100px]">Due Date</th>
              <th className="px-4 font-normal text-[13px] w-[60px] text-center">Doc</th>
              <th className="px-4 font-normal text-[13px] w-[120px]">Reference</th>
              <th className="px-4 font-normal text-[13px] w-[130px]">Project</th>
              <th className="px-4 font-normal text-[13px] w-[120px]">Cost Center</th>
              <th className="px-4 font-normal text-[13px] w-[140px]">Created By</th>
              <th className="px-4 font-normal text-[13px] w-[60px] text-center">Rec.</th>
              <th className="px-4 font-normal text-[13px] w-[120px] text-right">Subtotal</th>
              <th className="px-4 font-normal text-[13px] w-[110px] text-right">Tax rate</th>
              <th className="px-4 font-normal text-[13px] w-[100px] text-right">VAT</th>
              <th className="px-4 font-normal text-[13px] w-[130px] text-right">Total</th>
              <th className="px-4 font-normal text-[13px] w-[80px] text-center">Verified</th>
              <th className="px-4 font-normal text-[13px] w-[80px] text-center">AI Ver.</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {transactions.map((t) => (
              <tr key={t.id} className={`group transition-colors border-b border-[#E5E7EB] h-[64px] ${hoveredRowId === t.id ? 'bg-[#F9FAFB]' : 'bg-white'}`} onMouseEnter={() => setHoveredRowId(t.id)} onMouseLeave={() => setHoveredRowId(null)}>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px] font-normal">{t.date}</div></td>
                <td className="p-0"><div className="h-full flex flex-col justify-center px-4 overflow-hidden"><div className="text-[#000000] font-medium cursor-pointer hover:text-[#1E6F73] transition-colors truncate text-[13px]">{t.customer}</div>{t.description && (<div className="text-[#616A6B] text-[12px] truncate mt-0.5 font-normal">{t.description}</div>)}</div></td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4">
                    {hoveredRowId === t.id ? (<CategorySelect value={t.category} onChange={() => {}} />) : (
                      <div className="flex items-center gap-2 w-full">{(() => { const opt = CATEGORY_OPTIONS.find(o => o.id === t.category); const Icon = opt ? opt.icon : Plus; return <Icon size={16} className="text-[#616A6B]" /> })()}
                        <span className="text-[#000000] text-[13px] font-medium">{t.category}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px] font-normal">{t.typeId}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px] font-normal">{t.paymentMethod}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px] font-normal">{t.dueDate}</div></td>
                <td className="p-0"><div className="h-full flex items-center justify-center px-4">{t.hasDocument ? (<FileText size={18} className="text-[#616A6B] hover:text-[#000000] cursor-pointer transition-colors" />) : (<span className="text-[#E5E7EB]">-</span>)}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px]">{t.reference}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px]">{t.project || '-'}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px]">{t.costCenter || '-'}</div></td>
                <td className="p-0"><div className="h-full flex items-center px-4 text-[#616A6B] text-[13px]">{t.createdBy}</div></td>
                <td className="p-0"><div className="h-full flex items-center justify-center px-4 text-[#000000] font-medium text-[13px]">{t.reconciled && "✓"}</div></td>
                <td className="p-0"><div className="h-full flex items-center justify-end px-4 text-[#000000] font-medium text-[13px]">{formatCurrency(t.subtotal)}</div></td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-end px-2 ">
                     {hoveredRowId === t.id ? (
                        <div className="relative w-full">
                          <select className="w-full h-[42px] bg-white border border-[#E5E7EB] rounded-xl px-2 text-[13px] text-[#000000] font-medium focus:outline-none focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] cursor-pointer transition-all appearance-none text-right pr-6" defaultValue={t.taxRate.split(':')[0]}>
                             <option>24%</option><option>14%</option><option>10%</option><option>0%</option><option>25.5%</option>
                          </select>
                          <CaretDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#616A6B] pointer-events-none" />
                        </div>
                     ) : (<span className="font-medium text-[#616A6B] text-[13px]">{t.taxRate.split(':')[0]}</span>)}
                   </div>
                </td>
                <td className="p-0"><div className="h-full flex items-center justify-end px-4 text-[#616A6B] font-medium text-[13px]">{formatCurrency(t.vat)}</div></td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-end px-2 ">
                     {hoveredRowId === t.id ? (
                        <input type="text" defaultValue={t.totalAmount.toFixed(2)} className="w-full h-[42px] bg-white border border-[#E5E7EB] rounded-xl px-2 text-right text-[13px] font-medium text-[#000000] focus:outline-none focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-all" />
                     ) : (<span className="font-medium text-[#000000] text-[13px] block">{formatCurrency(t.totalAmount)}</span>)}
                   </div>
                </td>
                {hoveredRowId === t.id ? (
                   <>
                     <td className="p-0"><div className="h-full flex items-center justify-center px-1"><button className="h-[36px] bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#000000] font-medium px-3 rounded-xl text-[12px] shadow-sm transition-colors whitespace-nowrap">Edit</button></div></td>
                     <td className="p-0"><div className="h-full flex items-center justify-center px-1"><button className="h-[36px] bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#000000] font-medium px-3 rounded-xl text-[12px] shadow-sm transition-colors whitespace-nowrap">Action</button></div></td>
                   </>
                ) : (
                   <>
                    <td className="p-0"><div className="h-full flex items-center justify-center px-4">{t.isVerified && <SealCheck size={20} weight="fill" className="text-[#E5E7EB] inline-block" />}</div></td>
                    <td className="p-0"><div className="h-full flex items-center justify-center px-4">{t.isAiVerified && <SealCheck size={20} weight="fill" className="text-[#E5E7EB] inline-block" />}</div></td>
                   </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white py-3 flex justify-between items-center text-[13px] text-[#616A6B] flex-shrink-0 px-6 border-t border-[#E5E7EB]">
         <div><span className="font-medium text-[#000000]">{transactions.length}</span> results</div>
         <div className="flex gap-6">
            <span className="flex items-center gap-2">Subtotal: <span className="font-medium text-[#000000]">{formatCurrency(totals.subtotal)}</span></span>
            <div className="w-px h-4 bg-[#E5E7EB]"></div>
            <span className="flex items-center gap-2">VAT: <span className="font-medium text-[#000000]">{formatCurrency(totals.vat)}</span></span>
            <div className="w-px h-4 bg-[#E5E7EB]"></div>
            <span className="flex items-center gap-2">Total: <span className="font-medium text-[#000000]">{formatCurrency(totals.total)}</span></span>
         </div>
      </div>
    </div>
  );
};

export default TransactionTable;