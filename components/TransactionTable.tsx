import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { IncomeTransaction } from '../types';
import SaleDocumentModal from './SaleDocumentModal';
import { 
  FileText, 
  SealCheck, 
  Trash, 
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
  GasPump,
  Bank,
  Taxi,
  X,
  Check,
  TrendUp,
  Globe,
  Desktop,
  PlusCircle,
  Sparkle,
  Briefcase,
  Article,
  Money
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
  // Income specific from screenshot
  { id: 'bus_inc', label: 'Business Income', description: 'Core business revenue', icon: TrendUp },
  { id: 'cons_fees', label: 'Consulting Fees', description: 'Professional consulting services', icon: Handshake },
  { id: 'srv_inc', label: 'Service Income', description: 'General service revenue', icon: Sparkle },
  { id: 'onl_sales', label: 'Online Sales', description: 'E-commerce and web sales', icon: Globe },
  { id: 'merch', label: 'Merchandise', description: 'Product and merch sales', icon: Package },
  { id: 'soft_sales', label: 'Software Sales', description: 'SaaS and license sales', icon: Desktop },
  { id: 'grants', label: 'Grants', description: 'Government and private grants', icon: Bank },
  { id: 'oth_inc', label: 'Other Income', description: 'Miscellaneous revenue sources', icon: PlusCircle },
  
  // Expense specific from screenshot
  { id: 'ext_srv', label: 'External services', description: 'Purchased external services', icon: Handshake },
  { id: 'int_exp', label: 'Interest expenses', description: 'Loan interest payments', icon: Percent },
  { id: 'non_all', label: 'Non-allowable expenses', description: 'Not tax-deductible', icon: XSquare },
  { id: 'oth_ded', label: 'Other deductible expenses', description: 'Misc. tax-deductible costs', icon: Checks },
  { id: 'oth_fin', label: 'Other financial cost', description: 'Other financial expenses not included in interest', icon: CurrencyCircleDollar },
  { id: 'pers_cost', label: 'Personnel cost', description: 'Employee salaries, wages and social costs', icon: Users },
  { id: 'pur_inv', label: 'Purchases & inventory changes', description: 'Purchase of goods and changes in stock', icon: Package },
  { id: 'rents_cat', label: 'Rents', description: 'Rental of space or equipment', icon: Buildings },
  { id: 'rep_exp', label: 'Representation expenses', description: 'Client meetings & representation', icon: Coffee },
  { id: 'adv_tax', label: 'Advance tax', description: 'Prepaid taxes', icon: Article },
  { id: 'veh_cost', label: 'Vehicle cost', description: 'Fuel, maintenance, leasing', icon: GasPump },
  { id: 'cash_wd', label: 'Cash withdrawal', description: 'Cash taken from company account for business use', icon: Money },
  { id: 'taxi_van', label: 'Taxi and van costs', description: 'Taxi or van transportation costs', icon: Taxi },
];

const VAT_OPTIONS = [
  "0%",
  "Construction services and scrap metal - 0%",
  "Goods outside EU - 0%",
  "Services outside EU - 0%",
  "5%",
  "20%",
  "24%",
  "25.5%"
];

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions: initialTransactions }) => {
  const [transactions, setTransactions] = useState<IncomeTransaction[]>(initialTransactions);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [hoveredColKey, setHoveredColKey] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [taxRateDropdownId, setTaxRateDropdownId] = useState<string | null>(null);
  const [selectedVat, setSelectedVat] = useState<string | null>(null);
  const [dropdownCoords, setDropdownCoords] = useState<{ top: number, left: number } | null>(null);
  const [selectedDocTransaction, setSelectedDocTransaction] = useState<IncomeTransaction | null>(null);
  
  const [modifiedCells, setModifiedCells] = useState<Set<string>>(new Set());
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const vatDropdownRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  useEffect(() => {
    setTransactions(initialTransactions);
    setModifiedCells(new Set());
  }, [initialTransactions]);

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);

  const calculateTotals = () => {
    const subtotal = transactions.reduce((sum, t) => sum + t.subtotal, 0);
    const vat = transactions.reduce((sum, t) => sum + t.vat, 0);
    const total = transactions.reduce((sum, t) => sum + t.totalAmount, 0);
    return { subtotal, vat, total };
  };
  
  const totals = calculateTotals();

  const handleUpdateTransaction = (id: string, updates: Partial<IncomeTransaction>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    
    const keys = Object.keys(updates);
    if (keys.length > 0) {
      setModifiedCells(prev => {
        const next = new Set(prev);
        keys.forEach(key => next.add(`${id}-${key}`));
        return next;
      });
    }
  };

  const handleSaveAll = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setHoveredRowId(null);
    setHoveredColKey(null);
    setOpenDropdownId(null);
    setTaxRateDropdownId(null);
    setModifiedCells(new Set());
  };

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

  useLayoutEffect(() => {
    if (taxRateDropdownId && triggerRefs.current[taxRateDropdownId]) {
      const updatePosition = () => {
        const trigger = triggerRefs.current[taxRateDropdownId!];
        if (trigger) {
          const rect = trigger.getBoundingClientRect();
          setDropdownCoords({
            top: rect.bottom + 8,
            left: rect.left - 120,
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
    if (taxRateDropdownId && selectedVat) {
        handleUpdateTransaction(taxRateDropdownId, { taxRate: selectedVat });
    }
    setTaxRateDropdownId(null);
    handleSaveAll();
  };

  const getCategoryIcon = (category: string) => {
    const opt = CATEGORY_OPTIONS.find(o => o.label === category);
    return opt ? opt.icon : Briefcase;
  };

  const InlineSaveButton = ({ visible }: { visible: boolean }) => {
    if (!visible) return null;
    return (
      <button 
        onClick={(e) => handleSaveAll(e)}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-[22px] h-[22px] rounded-full border border-[#1E6F73] bg-white text-[#1E6F73] flex items-center justify-center shadow-sm z-[60] hover:bg-[#EFF6F7] transition-all transform active:scale-90 animate-in zoom-in-50 fade-in duration-200"
      >
        <Check size={14} weight="bold" />
      </button>
    );
  };

  const renderReconciliationPill = (index: number) => {
    const statuses = [
      { label: 'Paid by Cash', color: 'yellow' },
      { label: 'Paid by Cash', color: 'yellow' },
      { label: 'Paid by Cash', color: 'yellow' },
      { label: 'Paid by Cash', color: 'yellow' },
      { label: 'Transaction 12733', color: 'grey' },
      { label: 'Cash', color: 'grey' },
      { label: 'Paid by Cash', color: 'yellow' },
      { label: 'Paid by Cash', color: 'yellow' },
      { label: 'Transaction 12503', color: 'grey' },
      { label: 'Transaction 12502', color: 'grey' },
      { label: 'Transaction 12491', color: 'grey' },
      { label: 'Transaction 12503', color: 'grey' },
      { label: 'Transaction 12606', color: 'grey' },
    ];
    
    const status = statuses[index % statuses.length];
    
    if (status.color === 'yellow') {
      return (
        <div className="bg-[#FDE047] px-4 py-1.5 rounded-full border border-[#FDE047] shadow-sm inline-flex items-center">
          <span className="text-[12px] font-medium text-[#000000] whitespace-nowrap">{status.label}</span>
        </div>
      );
    }
    return (
      <div className="bg-[#F3F4F6] px-4 py-1.5 rounded-full border border-[#F3F4F6] shadow-sm inline-flex items-center">
        <span className="text-[12px] font-medium text-[#000000] whitespace-nowrap">{status.label}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-4 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
      <div className="overflow-auto flex-1 custom-scrollbar">
        <table className="min-w-[1700px] text-left table-fixed w-full border-collapse">
          <thead className="bg-[#F9FAFB] text-[#616A6B] sticky top-0 z-50 border-b border-[#E5E7EB]">
            <tr>
              <th className="px-4 py-3 font-normal text-[13px] w-[140px] text-left align-top">
                <div className="flex items-center gap-1 mb-1">
                  <span>Total amount</span>
                  <ArrowsDownUp size={14} className="text-[#9CA3AF]" />
                </div>
                <div className="text-[12px] font-medium text-[#616A6B]">{formatCurrency(totals.total)}</div>
              </th>
              
              <th className="px-4 py-3 font-normal text-[13px] w-[200px] align-middle">
                <div className="flex items-center gap-1">
                  <span>Category</span>
                  <ArrowsDownUp size={14} className="text-[#9CA3AF]" />
                </div>
              </th>
              
              <th className="px-4 py-3 font-normal text-[13px] w-[130px] align-middle">
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

              <th className="px-4 py-3 font-normal text-[13px] w-[60px] text-center align-middle">Doc</th>
              
              <th className="px-4 py-3 font-normal text-[13px] w-[140px] align-middle">Type ID</th>
              
              <th className="px-4 py-3 font-normal text-[13px] w-[180px] align-middle">Reconciled</th>
              
              <th className="px-4 py-3 font-normal text-[13px] w-[100px] text-left align-middle">Tax rate</th>
              
              <th className="px-4 py-3 font-normal text-[13px] w-[120px] text-right align-top">
                <div className="mb-1">VAT</div>
                <div className="text-[12px] font-medium text-[#616A6B]">{formatCurrency(totals.vat)}</div>
              </th>
              
              <th className="px-4 py-3 font-normal text-[13px] w-[140px] text-right align-top">
                <div className="flex items-center justify-end gap-1 mb-1">
                  <span>Subtotal</span>
                  <ArrowsDownUp size={14} className="text-[#9CA3AF]" />
                </div>
                <div className="text-[12px] font-medium text-[#616A6B]">{formatCurrency(totals.subtotal)}</div>
              </th>
              
              <th className="px-4 py-3 font-normal text-[13px] w-[80px] text-center align-middle">Verified</th>
              <th className="px-4 font-normal text-[13px] w-[80px] text-center align-middle">AI Verified</th>
              <th className="px-4 py-3 font-normal text-[13px] w-[80px] text-center align-middle"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {transactions.map((t, index) => {
              const isRowHovered = hoveredRowId === t.id;
              const isDropdownOpen = openDropdownId === t.id;
              const isTaxRateOpen = taxRateDropdownId === t.id;
              const CategoryIcon = getCategoryIcon(t.category);

              const isCellEditable = (colKey: string) => isRowHovered && hoveredColKey === colKey;

              return (
                <tr 
                  key={t.id} 
                  className={`group transition-all border-b border-[#E5E7EB] h-[64px] ${isRowHovered ? 'bg-[#F9FAFB]' : 'bg-white'}`} 
                  onMouseEnter={() => setHoveredRowId(t.id)} 
                  onMouseLeave={() => { setHoveredRowId(null); setHoveredColKey(null); }}
                >
                  {/* Total Amount */}
                  <td className="p-0" onMouseEnter={() => setHoveredColKey('totalAmount')}>
                    <div className="h-full flex items-center justify-start px-4 relative">
                      {isCellEditable('totalAmount') ? (
                        <div className="relative w-full animate-in fade-in duration-150">
                           <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-[12px]">€</span>
                           <input 
                             type="number"
                             value={t.totalAmount}
                             onChange={(e) => handleUpdateTransaction(t.id, { totalAmount: parseFloat(e.target.value) || 0 })}
                             className="w-full h-[36px] pl-6 pr-8 bg-white border border-[#1E6F73] rounded-lg text-[14px] font-medium text-[#000000] focus:outline-none focus:ring-1 focus:ring-[#1E6F73]"
                           />
                           <InlineSaveButton visible={modifiedCells.has(`${t.id}-totalAmount`)} />
                        </div>
                      ) : (
                        <span className="font-medium text-[#000000] text-[14px]">{formatCurrency(t.totalAmount)}</span>
                      )}
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-0 relative" onMouseEnter={() => setHoveredColKey('category')}>
                    <div 
                      className="h-full flex items-center px-4 cursor-pointer relative"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(isDropdownOpen ? null : t.id);
                      }}
                    >
                      <div className={`flex items-center gap-2 w-full h-[40px] px-2 rounded-lg transition-all border ${isDropdownOpen || isCellEditable('category') ? 'border-[#1E6F73] bg-white shadow-sm' : 'border-transparent bg-transparent'}`}>
                        <CategoryIcon size={18} weight="regular" className={isDropdownOpen || isCellEditable('category') ? "text-[#1E6F73]" : "text-[#0F3A3E]"} />
                        <span className="text-[#000000] text-[13px] font-normal truncate flex-1">{t.category}</span>
                        <CaretDown size={14} className={`text-[#9CA3AF] transition-all ${isDropdownOpen ? 'rotate-180 opacity-100' : isRowHovered ? 'opacity-100' : 'opacity-0'}`} />
                      </div>

                      {isDropdownOpen && (
                        <div 
                          ref={dropdownRef}
                          className="absolute top-[calc(100%+8px)] left-0 w-[420px] bg-white rounded-[16px] shadow-[0px_12px_30px_0px_rgba(0,0,0,0.16)] border-[0.5px] border-[rgba(0,0,0,0.1)] max-h-[500px] overflow-y-auto z-50 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(0,0,0,0.05)] sticky top-0 bg-white z-10">
                            <span className="text-[14px] font-normal text-[#000000] tracking-tight">Choose category</span>
                            <button 
                              onClick={() => setOpenDropdownId(null)}
                              className="p-1.5 text-[#616A6B] hover:text-[#000000] hover:bg-[#f5f5f5] rounded-full transition-colors"
                            >
                              <X size={18} weight="bold" />
                            </button>
                          </div>
                          
                          <div className="flex flex-col gap-[4px] p-[14px]">
                            {CATEGORY_OPTIONS.map((option) => {
                              const isActive = t.category === option.label;
                              return (
                                <button
                                  key={option.id}
                                  onClick={() => {
                                    handleUpdateTransaction(t.id, { category: option.label });
                                    setOpenDropdownId(null);
                                    handleSaveAll();
                                  }}
                                  className={`w-full rounded-[8px] p-[8px] flex items-center gap-[12px] transition-colors text-left ${
                                    isActive ? 'bg-[#F9FAFB]' : 'hover:bg-[#f5f5f5]'
                                  }`}
                                >
                                  <div className="size-[24px] shrink-0 flex items-center justify-center">
                                    <option.icon 
                                      size={20} 
                                      weight="regular" 
                                      className={isActive ? "text-[#0F3A3E]" : "text-[#616A6B]"} 
                                    />
                                  </div>
                                  <div className="flex flex-col font-['Aktifo-A',sans-serif] text-[14px] leading-[20px] flex-1 min-w-0">
                                    <p className={`font-normal ${isActive ? 'text-[#0F3A3E]' : 'text-black'}`}>
                                      {option.label}
                                    </p>
                                    <p className="text-[#616a6b] text-[11px] truncate">
                                      {option.description}
                                    </p>
                                  </div>
                                  {isActive && (
                                    <div className="ml-2 flex items-center justify-center shrink-0">
                                      <div className="size-5 rounded-full bg-[#1E6F73] flex items-center justify-center shadow-sm">
                                        <Check size={12} weight="bold" className="text-white" />
                                      </div>
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          <div className="absolute right-[14px] top-[246px] w-[12px] h-[171px] bg-[#dcdfdf] rounded-[10px] pointer-events-none opacity-0" />
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="p-0" onMouseEnter={() => setHoveredColKey('date')}>
                    <div className="h-full flex items-center px-4 relative">
                      {isCellEditable('date') ? (
                        <div className="relative w-full animate-in fade-in duration-150">
                          <input 
                            type="date"
                            value={t.date.split('.').reverse().join('-')}
                            onChange={(e) => {
                              const val = e.target.value.split('-').reverse().join('.');
                              handleUpdateTransaction(t.id, { date: val });
                            }}
                            className="w-full h-[36px] px-2 bg-white border border-[#1E6F73] rounded-lg text-[13px] font-medium text-[#000000] focus:outline-none"
                          />
                        </div>
                      ) : (
                        <span className="text-[#000000] text-[13px] font-normal">{t.date}</span>
                      )}
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="p-0" onMouseEnter={() => setHoveredColKey('customer')}>
                    <div className="h-full flex flex-col justify-center px-4 overflow-hidden relative">
                      {isCellEditable('customer') ? (
                        <div className="space-y-1 py-2 animate-in fade-in duration-150 relative pr-6">
                           <div className="text-[#000000] font-normal truncate text-[13px] px-2 h-[28px] flex items-center">
                             {t.customer}
                           </div>
                           <input 
                             type="text"
                             value={t.description || ''}
                             placeholder="Description"
                             onChange={(e) => handleUpdateTransaction(t.id, { description: e.target.value })}
                             className="w-full h-[24px] px-2 bg-white border border-[#1E6F73]/50 rounded text-[11px] font-normal text-[#616A6B] focus:outline-none"
                           />
                           <InlineSaveButton visible={modifiedCells.has(`${t.id}-description`)} />
                        </div>
                      ) : (
                        <>
                          <div className="text-[#000000] font-normal truncate text-[13px]">{t.customer}</div>
                          {t.description && (
                            <div className="text-[#616A6B] text-[11px] truncate mt-0.5 font-normal">{t.description}</div>
                          )}
                        </>
                      )}
                    </div>
                  </td>

                  {/* Doc */}
                  <td className="p-0 text-center" onMouseEnter={() => setHoveredColKey('doc')}>
                    <div className="h-full flex items-center justify-center px-4">
                      {t.hasDocument ? (
                        <button 
                          onClick={() => setSelectedDocTransaction(t)}
                          className={`transition-colors p-1.5 rounded-lg ${isRowHovered ? 'bg-white border border-[#E5E7EB] text-[#1E6F73] shadow-sm' : 'text-[#616A6B] hover:text-[#000000]'}`}
                        >
                          <FileText size={20} />
                        </button>
                      ) : (
                        <span className="text-[#E5E7EB]">-</span>
                      )}
                    </div>
                  </td>

                  {/* Type ID */}
                  <td className="p-0" onMouseEnter={() => setHoveredColKey('typeId')}>
                    <div className="h-full flex items-center px-4 relative">
                      {isCellEditable('typeId') ? (
                        <div className="relative w-full animate-in fade-in duration-150">
                          <input 
                            type="text"
                            value={t.typeId}
                            onChange={(e) => handleUpdateTransaction(t.id, { typeId: e.target.value })}
                            className="w-full h-[36px] px-2 pr-8 bg-white border border-[#1E6F73] rounded-lg text-[13px] font-medium text-[#000000] focus:outline-none"
                          />
                          <InlineSaveButton visible={modifiedCells.has(`${t.id}-typeId`)} />
                        </div>
                      ) : (
                        <span className="text-[#000000] text-[13px] font-normal truncate">{t.typeId}</span>
                      )}
                    </div>
                  </td>

                  <td className="p-0">
                    <div className="h-full flex items-center px-4">
                      {renderReconciliationPill(index)}
                    </div>
                  </td>

                  <td className="p-0 relative" onMouseEnter={() => setHoveredColKey('taxRate')}>
                    <div className="h-full flex items-center justify-start px-4 gap-2 relative">
                      <div 
                        ref={el => { triggerRefs.current[t.id] = el; }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setTaxRateDropdownId(isTaxRateOpen ? null : t.id);
                        }}
                        className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all w-full ${isCellEditable('taxRate') || isTaxRateOpen ? 'bg-white border-[#1E6F73] text-[#000000] shadow-sm' : 'border-transparent text-[#616A6B]'}`}
                      >
                         <span className="font-medium text-[13px]">{t.taxRate.split(':')[0]}</span>
                         <CaretDown size={14} className={`text-[#9CA3AF] ${isTaxRateOpen ? 'rotate-180' : isRowHovered ? 'opacity-100' : 'opacity-0'}`} />
                      </div>

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
                                className={`w-full px-4 py-2.5 text-left text-[12px] text-[#000000] font-normal hover:bg-[#F9FAFB] transition-colors ${selectedVat === opt ? 'bg-[#F9FAFB] font-medium' : ''}`}
                                onClick={() => {
                                    setSelectedVat(opt);
                                }}
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

                  <td className="p-0" onMouseEnter={() => setHoveredColKey('vat')}>
                    <div className="h-full flex items-center justify-end px-4 relative">
                      <span className="text-[#616A6B] font-medium text-[13px]">{formatCurrency(t.vat)}</span>
                    </div>
                  </td>

                  <td className="p-0" onMouseEnter={() => setHoveredColKey('subtotal')}>
                    <div className="h-full flex items-center justify-end px-4 relative">
                      {isCellEditable('subtotal') ? (
                        <div className="relative w-full animate-in fade-in duration-150">
                           <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-[12px]">€</span>
                           <input 
                             type="number"
                             value={t.subtotal}
                             onChange={(e) => handleUpdateTransaction(t.id, { subtotal: parseFloat(e.target.value) || 0 })}
                             className="w-full h-[36px] pl-6 pr-8 bg-white border border-[#1E6F73] rounded-lg text-[13px] font-medium text-[#000000] text-left focus:outline-none focus:ring-1 focus:ring-[#1E6F73]"
                           />
                           <InlineSaveButton visible={modifiedCells.has(`${t.id}-subtotal`)} />
                        </div>
                      ) : (
                        <span className="text-[#000000] font-medium text-[13px]">{formatCurrency(t.subtotal)}</span>
                      )}
                    </div>
                  </td>

                  <td className="p-0" onMouseEnter={() => setHoveredColKey('verified')}>
                    <div className="h-full flex items-center justify-center px-4">
                      <SealCheck size={20} weight="fill" className={t.isVerified ? "text-[#1E6F73]" : "text-[#E5E7EB]"} />
                    </div>
                  </td>

                  <td className="p-0" onMouseEnter={() => setHoveredColKey('aiVerified')}>
                    <div className="h-full flex items-center justify-center px-4">
                      <SealCheck size={20} weight="fill" className={t.isAiVerified ? "text-[#1E6F73]" : "text-[#E5E7EB]"} />
                    </div>
                  </td>

                  <td className="p-0 text-center" onMouseEnter={() => setHoveredColKey('actions')}>
                    <div className="h-full flex items-center justify-center px-4">
                      {isRowHovered && (
                        <div className="flex items-center gap-1">
                           <button 
                             onClick={() => handleSaveAll()}
                             className="text-[#9CA3AF] hover:text-[#166534] transition-colors p-1.5 hover:bg-green-50 rounded-lg"
                           >
                            <Check size={18} weight="bold" />
                          </button>
                          <button className="text-[#9CA3AF] hover:text-red-600 transition-colors p-1.5 hover:bg-red-50 rounded-lg">
                            <Trash size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <SaleDocumentModal 
        isOpen={!!selectedDocTransaction} 
        onClose={() => setSelectedDocTransaction(null)} 
        transaction={selectedDocTransaction} 
      />
    </div>
  );
};

export default TransactionTable;