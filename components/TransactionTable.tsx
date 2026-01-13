import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { IncomeTransaction } from '../types';
import SaleDocumentModal from './SaleDocumentModal';
import { 
  FileText, 
  SealCheck, 
  Trash, 
  PencilSimple, 
  CaretDown, 
  ArrowsDownUp,
  Handshake,
  Percent,
  XSquare,
  Checks,
  CurrencyCircleDollar,
  Users,
  Package,
  Buildings,
  Coffee,
  ChatCenteredText,
  GasPump,
  Bank,
  Taxi,
  X
} from '@phosphor-icons/react';

interface TransactionTableProps {
  transactions: IncomeTransaction[];
}

interface CategoryOption {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: 'ext', label: 'External services', description: 'Purchased external services', icon: Handshake },
  { id: 'int', label: 'Interest expenses', description: 'Loan interest payments', icon: Percent },
  { id: 'non', label: 'Non-allowable expenses', description: 'Not tax-deductible', icon: XSquare },
  { id: 'oth_ded', label: 'Other deductible expenses', description: 'Misc. tax-deductible costs', icon: Checks },
  { id: 'oth_fin', label: 'Other financial cost', description: 'Other financial expenses not included in interest', icon: CurrencyCircleDollar },
  { id: 'pers', label: 'Personnel cost', description: 'Employee salaries, wages and social costs', icon: Users },
  { id: 'purch', label: 'Purchases & inventory changes', description: 'Purchase of goods and changes in stock', icon: Package },
  { id: 'rents', label: 'Rents', description: 'Rental of space or equipment', icon: Buildings },
  { id: 'repr', label: 'Representation expenses', description: 'Client meetings & representation', icon: Coffee },
  { id: 'adv', label: 'Advance tax', description: 'Prepaid taxes', icon: ChatCenteredText },
  { id: 'veh', label: 'Vehicle cost', description: 'Fuel, maintenance, leasing', icon: GasPump },
  { id: 'cash', label: 'Cash withdrawal', description: 'Cash taken from company account for business use', icon: Bank },
  { id: 'taxi', label: 'Taxi and van costs', description: 'Taxi or van transportation costs', icon: Taxi },
];

const VAT_OPTIONS = [
  "0%",
  "Construction services and scrap metal - 0%",
  "Goods outside EU - 0%",
  "Services outside EU - 0%",
  "5%",
  "20%",
];

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [taxRateDropdownId, setTaxRateDropdownId] = useState<string | null>(null);
  const [selectedVat, setSelectedVat] = useState<string | null>(null);
  const [dropdownCoords, setDropdownCoords] = useState<{ top: number, left: number } | null>(null);
  const [selectedDocTransaction, setSelectedDocTransaction] = useState<IncomeTransaction | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const vatDropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);

  const calculateTotals = () => {
    const subtotal = transactions.reduce((sum, t) => sum + t.subtotal, 0);
    const vat = transactions.reduce((sum, t) => sum + t.vat, 0);
    const total = transactions.reduce((sum, t) => sum + t.totalAmount, 0);
    return { subtotal, vat, total };
  };
  
  const totals = calculateTotals();

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
      if (vatDropdownRef.current && !vatDropdownRef.current.contains(event.target as Node)) {
        setTaxRateDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll/resize for the fixed portal dropdown
  useLayoutEffect(() => {
    if (taxRateDropdownId && triggerRef.current) {
      const updatePosition = () => {
        if (triggerRef.current) {
          const rect = triggerRef.current.getBoundingClientRect();
          // Position the dropdown below the trigger, aligned left
          setDropdownCoords({
            top: rect.bottom + 8,
            left: rect.left - 220, // Adjust to center/align nicely
          });
        }
      };

      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    } else {
      setDropdownCoords(null);
    }
  }, [taxRateDropdownId]);

  const handleApplyVat = () => {
    setTaxRateDropdownId(null);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-4 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto flex-1 custom-scrollbar">
        <table className="min-w-[1500px] text-left table-fixed w-full border-collapse">
          <thead className="bg-[#F9FAFB] text-[#616A6B] sticky top-0 z-50 border-b border-[#E5E7EB]">
            <tr>
              <th className="px-4 py-3 font-normal text-[13px] w-[140px] text-left align-top">
                <div className="flex items-center gap-1 mb-1">
                  <span>Total amount</span>
                  <ArrowsDownUp size={14} className="text-[#9CA3AF]" />
                </div>
                <div className="text-[12px] font-medium text-[#616A6B]">{formatCurrency(totals.total)}</div>
              </th>
              
              <th className="px-4 py-3 font-normal text-[13px] w-[60px] text-center align-middle">Doc</th>
              
              <th className="px-4 py-3 font-normal text-[13px] w-[220px] align-middle">
                <div className="flex items-center gap-1">
                  <span>Category</span>
                  <ArrowsDownUp size={14} className="text-[#9CA3AF]" />
                </div>
              </th>
              
              <th className="px-4 py-3 font-normal text-[13px] w-[100px] align-middle">
                <div className="flex items-center gap-1">
                  <span>Date</span>
                  <ArrowsDownUp size={14} className="text-[#9CA3AF]" />
                </div>
              </th>
              
              <th className="px-4 py-3 font-normal text-[13px] w-[240px] align-middle">
                <div className="flex items-center gap-1">
                  <span>Customer</span>
                  <ArrowsDownUp size={14} className="text-[#9CA3AF]" />
                </div>
              </th>
              
              <th className="px-4 py-3 font-normal text-[13px] w-[140px] align-middle">Type ID</th>
              
              <th className="px-4 py-3 font-normal text-[13px] w-[180px] text-left align-middle">Tax rate</th>
              
              <th className="px-4 py-3 font-normal text-[13px] w-[100px] text-right align-top">
                <div className="mb-1">VAT</div>
                <div className="text-[12px] font-medium text-[#616A6B]">{formatCurrency(totals.vat)}</div>
              </th>
              
              <th className="px-4 py-3 font-normal text-[13px] w-[120px] text-right align-top">
                <div className="flex items-center justify-end gap-1 mb-1">
                  <span>Subtotal</span>
                  <ArrowsDownUp size={14} className="text-[#9CA3AF]" />
                </div>
                <div className="text-[12px] font-medium text-[#616A6B]">{formatCurrency(totals.subtotal)}</div>
              </th>
              
              <th className="px-4 py-3 font-normal text-[13px] w-[80px] text-center align-middle">Verified</th>
              <th className="px-4 py-3 font-normal text-[13px] w-[80px] text-center align-middle">AI Verified</th>
              <th className="px-4 py-3 font-normal text-[13px] w-[80px] text-center align-middle"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {transactions.map((t) => {
              const isRowHovered = hoveredRowId === t.id;
              const isDropdownOpen = openDropdownId === t.id;
              const isTaxRateOpen = taxRateDropdownId === t.id;

              return (
                <tr 
                  key={t.id} 
                  className={`group transition-colors border-b border-[#E5E7EB] h-[64px] ${isRowHovered ? 'bg-[#F9FAFB]' : 'bg-white'}`} 
                  onMouseEnter={() => setHoveredRowId(t.id)} 
                  onMouseLeave={() => setHoveredRowId(null)}
                >
                  <td className="p-0">
                    <div className="h-full flex items-center justify-start px-4">
                      <span className="font-medium text-[#000000] text-[14px]">{formatCurrency(t.totalAmount)}</span>
                    </div>
                  </td>

                  <td className="p-0 text-center">
                    <div className="h-full flex items-center justify-center px-4">
                      {t.hasDocument ? (
                        <button 
                          onClick={() => setSelectedDocTransaction(t)}
                          className="text-[#616A6B] hover:text-[#000000] transition-colors p-1 rounded-md hover:bg-gray-100"
                        >
                          <FileText size={20} />
                        </button>
                      ) : (
                        <span className="text-[#E5E7EB]">-</span>
                      )}
                    </div>
                  </td>

                  <td className="p-0 relative">
                    <div 
                      className="h-full flex items-center px-4 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(isDropdownOpen ? null : t.id);
                      }}
                    >
                      <div className={`flex items-center justify-between w-full h-[36px] px-3 rounded-lg border transition-all ${isDropdownOpen ? 'border-[#1E6F73] bg-white ring-1 ring-[#1E6F73]' : isRowHovered ? 'border-[#E5E7EB] bg-white shadow-sm' : 'border-transparent'}`}>
                        <span className="text-[#000000] text-[13px] font-medium truncate">{t.category}</span>
                        <CaretDown size={14} className={`text-[#9CA3AF] transition-all ${isDropdownOpen ? 'rotate-180 opacity-100' : isRowHovered ? 'opacity-100' : 'opacity-0'}`} />
                      </div>

                      {isDropdownOpen && (
                        <div 
                          ref={dropdownRef}
                          className="absolute top-[calc(100%-8px)] left-4 w-[420px] max-h-[480px] bg-white border border-[#E5E7EB] rounded-xl shadow-2xl z-[100] overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="overflow-y-auto custom-scrollbar flex-1 py-1">
                            {CATEGORY_OPTIONS.map((opt) => (
                              <button
                                key={opt.id}
                                className={`w-full flex items-start gap-4 px-4 py-3 hover:bg-[#EFF6F7] transition-colors text-left ${t.category === opt.label ? 'bg-[#EFF6F7]' : ''}`}
                                onClick={() => {
                                  setOpenDropdownId(null);
                                }}
                              >
                                <div className="mt-0.5 text-[#616A6B]">
                                  <opt.icon size={20} />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-[12px] font-normal text-[#000000] leading-[16px]">{opt.label}</span>
                                  <span className="text-[12px] font-normal text-[#616A6B] leading-[16px]">{opt.description}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="p-0">
                    <div className="h-full flex items-center px-4 text-[#616A6B] text-[13px] font-normal">{t.date}</div>
                  </td>

                  <td className="p-0">
                    <div className="h-full flex flex-col justify-center px-4 overflow-hidden">
                      <div className="text-[#000000] font-medium cursor-pointer hover:text-[#1E6F73] transition-colors truncate text-[13px]">{t.customer}</div>
                      {t.description && (
                        <div className="text-[#616A6B] text-[11px] truncate mt-0.5 font-normal">{t.description}</div>
                      )}
                    </div>
                  </td>

                  <td className="p-0">
                    <div className="h-full flex items-center px-4 text-[#616A6B] text-[13px] font-normal truncate">{t.typeId}</div>
                  </td>

                  <td className="p-0 relative">
                    <div className="h-full flex items-center justify-start px-4 gap-2">
                      <span className="font-medium text-[#616A6B] text-[13px]">{t.taxRate.split(':')[0]}</span>
                      <button 
                        ref={(el) => {
                          if (isTaxRateOpen) triggerRef.current = el;
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setTaxRateDropdownId(isTaxRateOpen ? null : t.id);
                        }}
                        className={`text-[#9CA3AF] hover:text-[#1E6F73] transition-all p-1 rounded-md hover:bg-gray-100 ${isRowHovered || isTaxRateOpen ? 'opacity-100' : 'opacity-0'}`}
                      >
                        <PencilSimple size={14} />
                      </button>

                      {/* PORTAL DROPDOWN: Prevents clipping by parent containers */}
                      {isTaxRateOpen && dropdownCoords && createPortal(
                        <div 
                          ref={vatDropdownRef}
                          style={{
                            position: 'fixed',
                            top: dropdownCoords.top,
                            left: dropdownCoords.left,
                          }}
                          className="w-[260px] bg-white border border-[#E5E7EB] rounded-xl shadow-[0_12px_48px_-12px_rgba(0,0,0,0.18)] z-[9999] overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#F3F4F6] bg-white">
                            <h3 className="text-[13px] font-bold text-[#000000]">Choose VAT%</h3>
                            <button onClick={() => setTaxRateDropdownId(null)} className="p-1 text-[#616A6B] hover:text-[#000000] transition-colors rounded-full hover:bg-gray-100">
                              <X size={14} weight="bold" />
                            </button>
                          </div>
                          
                          <div className="flex flex-col py-0.5 overflow-y-auto max-h-[280px] custom-scrollbar">
                            {VAT_OPTIONS.map((opt) => (
                              <button
                                key={opt}
                                className={`w-full px-4 py-2.5 text-left text-[12px] text-[#000000] font-normal hover:bg-[#F9FAFB] transition-colors ${selectedVat === opt ? 'bg-[#EFF6F7] font-medium' : ''}`}
                                onClick={() => setSelectedVat(opt)}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>

                          <div className="p-3 pt-2">
                            <button 
                              onClick={handleApplyVat}
                              className="w-full h-[40px] bg-[#005963] hover:bg-[#004d55] text-white font-bold text-[13px] rounded-lg shadow-sm transition-all"
                            >
                              Apply
                            </button>
                          </div>
                        </div>,
                        document.body
                      )}
                    </div>
                  </td>

                  <td className="p-0">
                    <div className="h-full flex items-center justify-end px-4 text-[#616A6B] font-medium text-[13px]">{formatCurrency(t.vat)}</div>
                  </td>

                  <td className="p-0">
                    <div className="h-full flex items-center justify-end px-4 text-[#000000] font-medium text-[13px]">{formatCurrency(t.subtotal)}</div>
                  </td>

                  <td className="p-0">
                    <div className="h-full flex items-center justify-center px-4">
                      <SealCheck size={20} weight="fill" className={t.isVerified ? "text-[#1E6F73]" : "text-[#E5E7EB]"} />
                    </div>
                  </td>

                  <td className="p-0">
                    <div className="h-full flex items-center justify-center px-4">
                      <SealCheck size={20} weight="fill" className={t.isAiVerified ? "text-[#1E6F73]" : "text-[#E5E7EB]"} />
                    </div>
                  </td>

                  <td className="p-0 text-center">
                    <div className="h-full flex items-center justify-center px-4">
                      {isRowHovered && (
                        <button className="text-[#9CA3AF] hover:text-red-600 transition-colors p-1.5 hover:bg-red-50 rounded-lg">
                          <Trash size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Sale Document Modal */}
      <SaleDocumentModal 
        isOpen={!!selectedDocTransaction} 
        onClose={() => setSelectedDocTransaction(null)} 
        transaction={selectedDocTransaction} 
      />
    </div>
  );
};

export default TransactionTable;