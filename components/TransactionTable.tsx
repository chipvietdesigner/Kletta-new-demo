import React, { useState, useRef, useEffect } from 'react';
import { IncomeTransaction } from '../types';
import { 
  ArrowsDownUp, 
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

// Define the category options structure matching the user's design
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
  // Keeping existing income categories for compatibility with mock data
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

  const selectedOption = CATEGORY_OPTIONS.find(opt => opt.id === value) || { 
    id: value, 
    label: value, 
    description: 'Custom category', 
    icon: Plus 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full h-[32px]" ref={dropdownRef}>
      <button 
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="w-full h-full bg-white border border-gray-200 rounded-md px-2 text-[12px] focus:outline-none focus:ring-1 focus:ring-[#004d40] cursor-pointer flex items-center justify-between text-left group transition-all"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <selectedOption.icon size={14} className="text-gray-600 flex-shrink-0" />
          <span className="truncate font-medium text-gray-700">{selectedOption.label}</span>
        </div>
        <CaretDown size={10} className="text-gray-300 group-hover:text-gray-500 flex-shrink-0 ml-1" />
      </button>

      {isOpen && (
        <div 
          className="absolute left-0 top-full mt-1 w-[300px] bg-white rounded-lg shadow-xl border border-gray-100 z-50 max-h-[320px] overflow-y-auto custom-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <div 
              key={opt.id}
              onClick={() => { onChange(opt.id); setIsOpen(false); }}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-start gap-3 border-b border-gray-50 last:border-0 transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5 text-gray-600 bg-gray-50/50 p-1.5 rounded-md">
                <opt.icon size={18} />
              </div>
              <div className="flex flex-col">
                 <span className="text-[12px] font-medium text-gray-700 leading-tight">{opt.label}</span>
                 <span className="text-[11px] text-gray-500 leading-tight mt-2">{opt.description}</span>
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const calculateTotals = () => {
    const subtotal = transactions.reduce((sum, t) => sum + t.subtotal, 0);
    const vat = transactions.reduce((sum, t) => sum + t.vat, 0);
    const total = transactions.reduce((sum, t) => sum + t.totalAmount, 0);
    return { subtotal, vat, total };
  };

  const totals = calculateTotals();

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-2 border border-gray-200 rounded-lg">
      {/* Actual Table */}
      <div className="overflow-auto flex-1 custom-scrollbar pb-0 bg-white">
        <table className="min-w-[1900px] text-[13px] text-left table-fixed w-full border-collapse">
          {/* Header */}
          <thead className="bg-gray-50 text-gray-500 sticky top-0 z-10 h-[40px] shadow-md">
            <tr>
              <th className="px-4 font-medium text-[12px] w-[100px] text-gray-500">Date</th>
              <th className="px-4 font-medium text-[12px] w-[240px] text-gray-500">Customer</th>
              <th className="px-4 font-medium text-[12px] w-[220px] text-gray-500">Category</th>
              <th className="px-4 font-medium text-[12px] w-[130px] text-gray-500">Type ID</th>
              <th className="px-4 font-medium text-[12px] w-[140px] text-gray-500">Method</th>
              <th className="px-4 font-medium text-[12px] w-[100px] text-gray-500">Due Date</th>
              <th className="px-4 font-medium text-[12px] w-[60px] text-center text-gray-500">Doc</th>
              <th className="px-4 font-medium text-[12px] w-[120px] text-gray-500">Reference</th>
              <th className="px-4 font-medium text-[12px] w-[130px] text-gray-500">Project</th>
              <th className="px-4 font-medium text-[12px] w-[120px] text-gray-500">Cost Center</th>
              <th className="px-4 font-medium text-[12px] w-[140px] text-gray-500">Created By</th>
              <th className="px-4 font-medium text-[12px] w-[60px] text-center text-gray-500">Rec.</th>
              <th className="px-4 font-medium text-[12px] w-[120px] text-right text-gray-500">Subtotal</th>
              <th className="px-4 font-medium text-[12px] w-[110px] text-right text-gray-500">Tax rate</th>
              <th className="px-4 font-medium text-[12px] w-[100px] text-right text-gray-500">VAT</th>
              <th className="px-4 font-medium text-[12px] w-[130px] text-right text-gray-500">Total</th>
              <th className="px-4 font-medium text-[12px] w-[80px] text-center text-gray-500">Verified</th>
              <th className="px-4 font-medium text-[12px] w-[80px] text-center text-gray-500">AI Ver.</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {transactions.map((t, index) => (
              <tr 
                key={t.id} 
                className={`group transition-colors border-b border-gray-50 h-[48px] ${
                  index % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'
                } hover:bg-[#FFDD33]/20`}
                onMouseEnter={() => setHoveredRowId(t.id)}
                onMouseLeave={() => setHoveredRowId(null)}
              >
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 font-medium tabular-nums">{t.date}</div>
                </td>
                <td className="p-0">
                  <div className="h-full flex flex-col justify-center px-4 overflow-hidden">
                     <div className="text-gray-900 font-medium cursor-pointer hover:text-[#005c66] transition-colors truncate text-[13px]">{t.customer}</div>
                     {t.description && (
                       <div className="text-gray-400 text-[11px] truncate mt-0.5">{t.description}</div>
                     )}
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center px-4">
                    {hoveredRowId === t.id ? (
                      <CategorySelect value={t.category} onChange={() => {}} />
                    ) : (
                      <div className="flex items-center gap-2 w-full">
                         {(() => {
                           const opt = CATEGORY_OPTIONS.find(o => o.id === t.category);
                           const Icon = opt ? opt.icon : Plus;
                           return <Icon size={14} className="text-gray-600" />
                         })()}
                         <span className="text-gray-600 text-[12px]">
                           {t.category}
                         </span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 text-[12px]">{t.typeId}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 text-[12px]">{t.paymentMethod}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 text-[12px] tabular-nums">{t.dueDate}</div>
                </td>
                <td className="p-0">
                  <div className="h-full flex items-center justify-center px-4">
                    {t.hasDocument ? (
                        <FileText size={16} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                    ) : (
                       <span className="text-gray-300">-</span>
                    )}
                  </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 text-[12px]">{t.reference}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 text-[12px]">{t.project || '-'}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 text-[12px]">{t.costCenter || '-'}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center px-4 text-gray-600 text-[12px]">{t.createdBy}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-center px-4 text-green-600 font-bold text-[11px]">{t.reconciled && "✓"}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-end px-4 text-gray-900 font-medium ">{formatCurrency(t.subtotal)}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-end px-2 ">
                     {hoveredRowId === t.id ? (
                        <select 
                          className="w-full h-[32px] bg-transparent border border-transparent hover:bg-white hover:border-gray-200 rounded px-2 text-[13px] text-right focus:outline-none focus:border-[#004d40] cursor-pointer transition-all text-gray-700 appearance-none"
                          defaultValue={t.taxRate.split(':')[0]}
                        >
                           <option>24%</option>
                           <option>14%</option>
                           <option>10%</option>
                           <option>0%</option>
                           <option>25.5%</option>
                        </select>
                     ) : (
                       <div className="flex flex-col items-end gap-0.5 w-full">
                           <span className="font-medium text-gray-700 text-[12px]">{t.taxRate.split(':')[0]}</span>
                       </div>
                     )}
                   </div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-end px-4 text-gray-800 font-medium ">{formatCurrency(t.vat)}</div>
                </td>
                <td className="p-0">
                   <div className="h-full flex items-center justify-end px-2 ">
                     {hoveredRowId === t.id ? (
                        <input 
                          type="text" 
                          defaultValue={t.totalAmount.toFixed(2)} 
                          className="w-full h-[32px] bg-transparent border border-transparent hover:bg-white hover:border-gray-200 rounded px-2 text-right text-[13px] focus:outline-none focus:border-[#004d40] font-semibold text-[#004d40] transition-all"
                        />
                     ) : (
                        <span className="font-bold text-[#004d40] text-[13px] block">{formatCurrency(t.totalAmount)}</span>
                     )}
                   </div>
                </td>
                {/* Action Buttons replace Verified status on hover */}
                {hoveredRowId === t.id ? (
                   <>
                     <td className="p-0">
                        <div className="h-full flex items-center justify-center px-1">
                          <button className="h-[28px] bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium px-2 rounded text-[11px] shadow-sm transition-colors whitespace-nowrap">
                             Edit
                          </button>
                        </div>
                     </td>
                     <td className="p-0">
                        <div className="h-full flex items-center justify-center px-1">
                          <button className="h-[28px] bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium px-2 rounded text-[11px] shadow-sm transition-colors whitespace-nowrap">
                             Action
                          </button>
                        </div>
                     </td>
                   </>
                ) : (
                   <>
                    <td className="p-0">
                      <div className="h-full flex items-center justify-center px-4">
                        {t.isVerified && <SealCheck size={16} weight="fill" className="text-gray-200 inline-block" />}
                      </div>
                    </td>
                    <td className="p-0">
                      <div className="h-full flex items-center justify-center px-4">
                        {t.isAiVerified && <SealCheck size={16} weight="fill" className="text-gray-200 inline-block" />}
                      </div>
                    </td>
                   </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer Summary - Clean minimal style */}
      <div className="bg-white py-2 flex justify-between items-center text-[12px] text-gray-500 flex-shrink-0 px-4 border-t border-gray-100">
         <div>
            <span className="font-medium text-gray-700">{transactions.length}</span> results
         </div>
         <div className="flex gap-4 tabular-nums">
            <span className="flex items-center gap-2">Subtotal: <span className="font-medium text-gray-900">{formatCurrency(totals.subtotal)}</span></span>
            <div className="w-px h-3 bg-gray-200"></div>
            <span className="flex items-center gap-2">VAT: <span className="font-medium text-gray-900">{formatCurrency(totals.vat)}</span></span>
            <div className="w-px h-3 bg-gray-200"></div>
            <span className="flex items-center gap-2">Total: <span className="font-bold text-[#004d40]">{formatCurrency(totals.total)}</span></span>
         </div>
      </div>
    </div>
  );
};

export default TransactionTable;