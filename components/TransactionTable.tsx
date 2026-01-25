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
  ChatCenteredText,
  GasPump,
  Bank,
  Taxi,
  X,
  Check
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
  
  // Track which cells have been modified to show the save button
  const [modifiedCells, setModifiedCells] = useState<Set<string>>(new Set());
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const vatDropdownRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  // CRITICAL: Update internal state when props change (e.g. from filtering)
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
    
    // Mark as modified if an update occurs
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
    setModifiedCells(new Set()); // Clear modification state
  };

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
    handleSaveAll(); // Auto save after selecting VAT
  };

  // Small contextual save button component positioned inside inputs - Outlined (Stroke) style
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

  // Helper to render Reconciliation Pill matching screenshot
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
              
              <th className="px-4 py-3 font-normal text-[13px] w-[60px] text-center align-middle">Doc</th>
              
              <th className="px-4 py-3 font-normal text-[13px] w-[220px] align-middle">
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
              <th className="px-4 py-3 font-normal text-[13px] w-[80px] text-center align-middle">AI Verified</th>
              <th className="px-4 py-3 font-normal text-[13px] w-[80px] text-center align-middle"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {transactions.map((t, index) => {
              const isRowHovered = hoveredRowId === t.id;
              const isDropdownOpen = openDropdownId === t.id;
              const isTaxRateOpen = taxRateDropdownId === t.id;

              const isCellEditable = (colKey: string) => isRowHovered && hoveredColKey === colKey;

              return (
                <tr 
                  key={t.id} 
                  className={`group transition-all border-b border-[#E5E7EB] h-[64px] ${isRowHovered ? 'bg-[#EFF6F7]' : 'bg-white'}`} 
                  onMouseEnter={() => setHoveredRowId(t.id)} 
                  onMouseLeave={() => { setHoveredRowId(null); setHoveredColKey(null); }}
                >
                  <td className="p-0" onMouseEnter={() => setHoveredColKey('totalAmount')}>
                    <div className="h-full flex items-center justify-start px-4 relative">
                      {isCellEditable('totalAmount') ? (
                        <div className="relative w-full animate-in fade-in duration-150">
                           <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-[12px]">€</span>
                           <input 
                             type="number"
                             value={t.totalAmount}
                             onChange={(e) => handleUpdateTransaction(t.id, { totalAmount: parseFloat(e.target.value) || 0 })}
                             className="w-full h-[36px] pl-6 pr-8 bg-white border border-[#1E6F73] rounded-lg text-[14px] font-bold text-[#000000] focus:outline-none focus:ring-1 focus:ring-[#1E6F73]"
                           />
                           <InlineSaveButton visible={modifiedCells.has(`${t.id}-totalAmount`)} />
                        </div>
                      ) : (
                        <span className="font-bold text-[#000000] text-[14px]">{formatCurrency(t.totalAmount)}</span>
                      )}
                    </div>
                  </td>

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

                  <td className="p-0 relative" onMouseEnter={() => setHoveredColKey('category')}>
                    <div 
                      className="h-full flex items-center px-4 cursor-pointer relative"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(isDropdownOpen ? null : t.id);
                      }}
                    >
                      <div className={`flex items-center justify-between w-full h-[36px] px-3 rounded-lg border transition-all ${isDropdownOpen || isCellEditable('category') ? 'border-[#1E6F73] bg-white ring-1 ring-[#1E6F73]' : 'border-transparent'}`}>
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
                                  handleUpdateTransaction(t.id, { category: opt.label });
                                  setOpenDropdownId(null);
                                  handleSaveAll();
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
                        <span className="text-[#616A6B] text-[13px] font-normal">{t.date}</span>
                      )}
                    </div>
                  </td>

                  <td className="p-0" onMouseEnter={() => setHoveredColKey('customer')}>
                    <div className="h-full flex flex-col justify-center px-4 overflow-hidden relative">
                      {isCellEditable('customer') ? (
                        <div className="space-y-1 py-2 animate-in fade-in duration-150 relative pr-6">
                           <input 
                             type="text"
                             value={t.customer}
                             placeholder="Customer name"
                             onChange={(e) => handleUpdateTransaction(t.id, { customer: e.target.value })}
                             className="w-full h-[28px] px-2 bg-white border border-[#1E6F73] rounded text-[13px] font-medium text-[#000000] focus:outline-none"
                           />
                           <input 
                             type="text"
                             value={t.description || ''}
                             placeholder="Description"
                             onChange={(e) => handleUpdateTransaction(t.id, { description: e.target.value })}
                             className="w-full h-[24px] px-2 bg-white border border-[#1E6F73]/50 rounded text-[11px] font-normal text-[#616A6B] focus:outline-none"
                           />
                           <InlineSaveButton visible={modifiedCells.has(`${t.id}-customer`) || modifiedCells.has(`${t.id}-description`)} />
                        </div>
                      ) : (
                        <>
                          <div className="text-[#000000] font-medium truncate text-[13px]">{t.customer}</div>
                          {t.description && (
                            <div className="text-[#616A6B] text-[11px] truncate mt-0.5 font-normal">{t.description}</div>
                          )}
                        </>
                      )}
                    </div>
                  </td>

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
                        <span className="text-[#616A6B] text-[13px] font-normal truncate">{t.typeId}</span>
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
                        ref={el => triggerRefs.current[t.id] = el}
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
                                className={`w-full px-4 py-2.5 text-left text-[12px] text-[#000000] font-normal hover:bg-[#F9FAFB] transition-colors ${selectedVat === opt ? 'bg-[#EFF6F7] font-medium' : ''}`}
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
                      {/* VAT column is now read-only as per screenshot instructions */}
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
                             className="w-full h-[36px] pl-6 pr-8 bg-white border border-[#1E6F73] rounded-lg text-[13px] font-bold text-[#000000] text-left focus:outline-none focus:ring-1 focus:ring-[#1E6F73]"
                           />
                           <InlineSaveButton visible={modifiedCells.has(`${t.id}-subtotal`)} />
                        </div>
                      ) : (
                        <span className="text-[#000000] font-bold text-[13px]">{formatCurrency(t.subtotal)}</span>
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