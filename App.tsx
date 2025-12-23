import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import TransactionTable from './components/TransactionTable';
import ExpensesTable from './components/ExpensesTable';
import ClientTable from './components/ClientTable';
import VatReturnsTable from './components/VatReturnsTable';
import TaxReturnTable from './components/TaxReturnTable';
import BankTransactionsTable from './components/BankTransactionsTable';
import InvitationsTable from './components/InvitationsTable';
import MileagesList from './components/MileagesList';
import Reports from './components/Reports';
import InvoicesTable from './components/InvoicesTable';
import Chat from './components/Chat';
import Account from './components/Account';
import Login from './components/Login';
import AISupport from './components/AISupport';
import Dashboard from './components/Dashboard';
import Welcome from './components/Welcome';
import CreateExpenseModal from './components/CreateExpenseModal';
import CreateIncomeModal from './components/CreateIncomeModal';
import ChooseExpensesModal from './components/ChooseExpensesModal';
import { NavItemType, IncomeTransaction, Client, ExpenseTransaction, VatReturn, TaxReturnRow, BankTransaction, DashboardData, Invitation, MileageTrip, MOCK_INVOICES } from './types';
import { 
  Tray, 
  TrendUp, 
  CheckCircle, 
  Clock,
  Funnel,
  MagnifyingGlass,
  CaretDown,
  DownloadSimple,
  Plus,
  Upload,
  WarningCircle,
  Handshake,
  Car,
  XCircle,
  Package,
  Buildings,
  Check,
  CalendarBlank,
  SteeringWheel,
  FileText
} from '@phosphor-icons/react';

// Mock Data remains unchanged for logic
const INITIAL_INCOME_DATA: IncomeTransaction[] = [
  { id: '1', date: '20.11.2025', customer: 'Cash sale - no customer', category: 'Business Income', typeId: 'Sale 570', hasDocument: true, reference: 'POS-001', reconciled: true, subtotal: 200.00, taxRate: '0%: €0.00', vat: 0.00, totalAmount: 200.00, isVerified: true, isAiVerified: true, paymentMethod: 'Cash', dueDate: '20.11.2025', project: 'Store 1', costCenter: 'Sales', createdBy: 'Sami Kletta' },
  { id: '2', date: '20.11.2025', customer: 'Manual entry - no customer', description: 'Torstai Timma Myynti 25,5%', category: 'Business Income', typeId: 'Manual Entry 62720', hasDocument: false, reference: 'DAILY-02', reconciled: false, subtotal: 796.81, taxRate: '25.5%: ', vat: 203.19, totalAmount: 1000.00, isVerified: true, isAiVerified: true, paymentMethod: 'Manual', dueDate: '20.11.2025', project: 'HQ', costCenter: 'Ops', createdBy: 'Sami Kletta' },
  { id: '3', date: '19.11.2025', customer: 'TechSolutions Inc.', description: 'Q4 Consulting Retainer', category: 'Consulting Fees', typeId: 'Inv-1024', hasDocument: true, reference: 'PO-9921', reconciled: true, subtotal: 4500.00, taxRate: '24%: ', vat: 1080.00, totalAmount: 5580.00, isVerified: true, isAiVerified: true, paymentMethod: 'Bank Transfer', dueDate: '19.12.2025', project: 'Consulting', costCenter: 'Services', createdBy: 'Admin User' },
  { id: '4', date: '18.11.2025', customer: 'Nordic Design Studio', description: 'Web Development Services', category: 'Service Income', typeId: 'Inv-1023', hasDocument: true, reference: 'REF-882', reconciled: false, subtotal: 1250.00, taxRate: '24%: ', vat: 300.00, totalAmount: 1550.00, isVerified: false, isAiVerified: true, paymentMethod: 'Stripe', dueDate: '18.12.2025', project: 'Web Dev', costCenter: 'IT', createdBy: 'Sami Kletta' },
  { id: '5', date: '15.11.2025', customer: 'Stripe Payout', description: 'Weekly settlement', category: 'Online Sales', typeId: 'Payout 22', hasDocument: false, reference: 'STR-9912', reconciled: true, subtotal: 890.50, taxRate: '0%: €0.00', vat: 0.00, totalAmount: 890.50, isVerified: true, isAiVerified: false, paymentMethod: 'Stripe', dueDate: '15.11.2025', project: 'Online', costCenter: 'Sales', createdBy: 'System' },
  { id: '6', date: '14.11.2025', customer: 'Local Cafe Partnership', description: 'Merchandise reselling', category: 'Merchandise', typeId: 'Sale 562', hasDocument: true, reference: 'INV-009', reconciled: false, subtotal: 320.00, taxRate: '14%: ', vat: 44.80, totalAmount: 364.80, isVerified: true, isAiVerified: true, paymentMethod: 'Cash', dueDate: '14.11.2025', project: 'Retail', costCenter: 'Sales', createdBy: 'Sami Kletta' },
  { id: '7', date: '12.11.2025', customer: 'Consulting Project Alpha', description: 'Milestone 2 payment', category: 'Consulting Fees', typeId: 'Inv-1021', hasDocument: true, reference: 'MST-2', reconciled: true, subtotal: 2100.00, taxRate: '24%: ', vat: 504.00, totalAmount: 2604.00, isVerified: true, isAiVerified: true, paymentMethod: 'Bank Transfer', dueDate: '12.12.2025', project: 'Alpha', costCenter: 'Consulting', createdBy: 'Admin User' },
  { id: '8', date: '10.11.2025', customer: 'Cash sale - no customer', category: 'Business Income', typeId: 'Sale 555', hasDocument: false, reference: 'POS-002', reconciled: true, subtotal: 150.00, taxRate: '0%: €0.00', vat: 0.00, totalAmount: 150.00, isVerified: true, isAiVerified: true, paymentMethod: 'Cash', dueDate: '10.11.2025', project: 'Store 1', costCenter: 'Sales', createdBy: 'Sami Kletta' },
  { id: '9', date: '08.11.2025', customer: 'Marketing GIG', description: 'Ad campaign management', category: 'Service Income', typeId: 'Inv-1019', hasDocument: true, reference: 'AD-2025', reconciled: false, subtotal: 5000.00, taxRate: '24%: ', vat: 1200.00, totalAmount: 6200.00, isVerified: false, isAiVerified: false, paymentMethod: 'Bank Transfer', dueDate: '08.12.2025', project: 'Marketing', costCenter: 'Services', createdBy: 'Sami Kletta' },
  { id: '10', date: '05.11.2025', customer: 'Subscription Renewal', description: 'Yearly SaaS License', category: 'Software Sales', typeId: 'Sub-441', hasDocument: true, reference: 'LIC-99', reconciled: true, subtotal: 800.00, taxRate: '24%: ', vat: 192.00, totalAmount: 992.00, isVerified: true, isAiVerified: true, paymentMethod: 'Credit Card', dueDate: '05.11.2025', project: 'SaaS', costCenter: 'IT', createdBy: 'System' },
  { id: '11', date: '02.11.2025', customer: 'Manual entry - Adjustment', description: 'Correction for Oct', category: 'Other Income', typeId: 'Adj-01', hasDocument: false, reference: 'MEMO-01', reconciled: true, subtotal: 50.00, taxRate: '0%: €0.00', vat: 0.00, totalAmount: 50.00, isVerified: true, isAiVerified: true, paymentMethod: 'N/A', dueDate: '02.11.2025', project: 'Internal', costCenter: 'Admin', createdBy: 'Sami Kletta' },
  { id: '12', date: '01.11.2025', customer: 'StartUp Grant', description: 'Government assistance', category: 'Grants', typeId: 'Gov-2025', hasDocument: true, reference: 'FIN-GRANT', reconciled: true, subtotal: 8000.00, taxRate: '0%: €0.00', vat: 0.00, totalAmount: 8000.00, isVerified: true, isAiVerified: true, paymentMethod: 'Grant', dueDate: '01.11.2025', project: 'Funding', costCenter: 'Finance', createdBy: 'Admin User' }
];

const MOCK_INCOME_DATA: IncomeTransaction[] = [
  ...INITIAL_INCOME_DATA,
  ...INITIAL_INCOME_DATA.map(item => ({ ...item, id: item.id + '_dup1', date: '01.10.2025' })),
  ...INITIAL_INCOME_DATA.map(item => ({ ...item, id: item.id + '_dup2', date: '28.09.2025' })),
];

const MOCK_EXPENSES_DATA: ExpenseTransaction[] = [
  { id: 'e1', date: '12.05.2025', customer: 'Test', category: 'Non-allowable expenses', receipt: 'Manual entry 5280', document: null, reconciled: false, subtotal: 978.00, taxRate: '14%: €10.00', vat: 22.00, totalAmount: 1000.00, verified: true, aiVerified: true },
  { id: 'e2', date: '21.03.2025', customer: 'Autokulut', category: 'Vehicle cost', receipt: 'Manual entry 5162', document: null, reconciled: false, subtotal: 5000.00, taxRate: '0%', vat: 0.00, totalAmount: 5000.00, verified: true, aiVerified: true },
  { id: 'e3', date: '01.02.2025', customer: 'Kulu', category: 'Purchases and inventory changes', receipt: 'Manual entry 5219', document: null, reconciled: false, subtotal: 4385.96, taxRate: '14%', vat: 614.04, totalAmount: 5000.00, verified: true, aiVerified: true },
  { id: 'e4', date: '01.02.2025', customer: 'Welcome Keele Break North Group Fct', category: 'Other deductible expenses', receipt: 'Receipt 202520001', document: 'doc1.jpg', reconciled: true, subtotal: 21.65, taxRate: 'Exempted from VAT', vat: 0.00, totalAmount: 21.65, verified: false, aiVerified: false },
  { id: 'e5', date: '01.02.2025', customer: 'WHSmith', category: 'External services', receipt: 'Receipt 202520002', document: 'doc2.jpg', reconciled: true, subtotal: 13.49, taxRate: '0%', vat: 0.00, totalAmount: 13.49, verified: false, aiVerified: false },
  { id: 'e6', date: '08.01.2025', customer: 'Kulu', category: 'External services', receipt: 'Manual entry 5220', document: null, reconciled: false, subtotal: 4385.96, taxRate: '14%', vat: 614.04, totalAmount: 5000.00, verified: true, aiVerified: true },
  { id: 'e7', date: '01.01.2025', customer: 'Private car 25% depreciation', category: 'Vehicle depreciation', receipt: 'Manual entry 4812', document: null, reconciled: false, subtotal: 750.00, taxRate: '0%', vat: 0.00, totalAmount: 750.00, verified: true, aiVerified: true },
];

const EXPENSE_SUMMARY = [
    { id: 'All', label: 'All expenses', value: 29626.26, icon: Tray },
    { id: 'Vehicle cost', label: 'Vehicle cost', value: 5000.00, icon: Car },
    { id: 'External services', label: 'External services', value: 4399.45, icon: Handshake },
    { id: 'Non-allowable expenses', label: 'Non-allowable expenses', value: 978.00, icon: XCircle },
    { id: 'Purchases and inventory changes', label: 'Purchases & inventory', value: 4385.96, icon: Package },
    { id: 'Rents', label: 'Rents', value: 415.00, icon: Buildings },
    { id: 'Vehicle depreciation', label: 'Vehicle depreciation', value: 16750.00, icon: Check },
    { id: 'Other deductible expenses', label: 'Other deductible', value: 21.65, icon: FileText },
];

const MOCK_BANK_TRANSACTIONS: BankTransaction[] = [
  { id: '12748', date: '15.12.2025', amount: -5.40, description: 'Uber 063015 SF**POOL**', reference: '', reconciled: true, reconciledItems: [{ id: 'r1', type: 'Expense', amount: -5.40, date: '15.12.2025', label: 'Expenses 62925', description: 'Uber 063015 SF*...', categoryLabel: 'Car, van and travel expenses', pillColor: 'gray' }] },
  { id: '12733', date: '13.12.2025', amount: 500.00, description: 'United Airlines', reference: '', reconciled: false },
  { id: '12726', date: '12.12.2025', amount: -4.33, description: 'Starbucks', reference: '', reconciled: false },
];

const MOCK_VAT_RETURNS_DATA: VatReturn[] = [
  { id: '1', email: 'sami@kletta.com', companyName: 'Sami Tmi', firstName: 'Sami', lastName: 'Kletta', utr: '12345 67890', isUtrVerified: true, taxPeriod: 'Q1 2025', edited: '2 days ago' },
];

const MOCK_TAX_RETURNS_DATA: TaxReturnRow[] = [
  { id: '1', sendStatus: 'SENT', email: 'sami@kletta.com', companyName: 'Sami Tmi', firstName: 'Sami', lastName: 'Kletta', plan: 'Kletta Solo', status: 'Submitted', utr: '12345 67890', isUtrVerified: true, year: 2024 },
];

const MOCK_DASHBOARD_DATA: DashboardData = {
  kpi: { income: 45250.50, expenses: 12400.00, profit: 32850.50 },
  chart: [
    { month: 'Jan', income: 5000, expenses: 2000, profit: 3000 },
    { month: 'Feb', income: 7500, expenses: 2500, profit: 5000 },
  ]
};

const MOCK_INVITATIONS: Invitation[] = [
  { id: '1', email: 'invitee@test.com', phone: '+358 50 1234567', firstName: 'Test', lastName: 'Invitee', status: 'INVITE SENT', lastUpdated: '1 hour ago', paymentLink: 'https://kletta.com/pay/1' },
];

const MOCK_MILEAGES: MileageTrip[] = [
  { id: '1', startAddress: 'Mannerheimintie 1', endAddress: 'Fredrikinkatu 42', startCityCountry: 'Helsinki, Finland', endCityCountry: 'Helsinki, Finland', duration: '15 min', distanceKm: 2.5, claimAmount: 1.13, vehicle: 'Toyota Yaris', drivePurpose: 'Client Meeting', country: 'Finland', date: '20.11.2025' },
];

const MOCK_CLIENT_DATA: Client[] = [
  { id: 1, email: 'sami@kletta.com', countryCode: 'FI', plan: 'Kletta Solo', utr: '12345', isUtrVerified: true, isPrepaymentRegistered: true, companyName: 'Sami Tmi', firstName: 'Sami', lastName: 'Kletta', phone: '0401234567', salesPerson: 'Sami', cardAddedDate: '2024-01-01', bankName: 'Nordea', profession: 'Dev', city: 'Helsinki' },
];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeItem, setActiveItem] = useState<NavItemType>(NavItemType.INCOME);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [expenseFilterCategory, setExpenseFilterCategory] = useState<string>('All');
  const [transactionsFilter, setTransactionsFilter] = useState<'All' | 'Reconciled' | 'Unreconciled'>('All');
  const [vatSearch, setVatSearch] = useState('');
  const [taxReturnTab, setTaxReturnTab] = useState<'SENT' | 'NOT SENT'>('SENT');
  const [taxReturnYear, setTaxReturnYear] = useState('2024');
  const [taxReturnSearch, setTaxReturnSearch] = useState('');
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState<'All' | 'Open' | 'Paid' | 'Due'>('All');
  const [isCreateExpenseModalOpen, setIsCreateExpenseModalOpen] = useState(false);
  const [isCreateIncomeModalOpen, setIsCreateIncomeModalOpen] = useState(false);
  const [isChooseExpensesModalOpen, setIsChooseExpensesModalOpen] = useState(false);
  const [selectedTransactionForReconciliation, setSelectedTransactionForReconciliation] = useState<BankTransaction | null>(null);

  const filteredTransactions = useMemo(() => {
    if (!filterCategory) return MOCK_INCOME_DATA;
    return MOCK_INCOME_DATA.filter(t => t.category === filterCategory);
  }, [filterCategory]);

  const filteredExpenses = useMemo(() => {
    if (expenseFilterCategory === 'All') return MOCK_EXPENSES_DATA;
    return MOCK_EXPENSES_DATA.filter(t => t.category === expenseFilterCategory);
  }, [expenseFilterCategory]);

  const filteredBankTransactions = useMemo(() => {
    if (transactionsFilter === 'All') return MOCK_BANK_TRANSACTIONS;
    if (transactionsFilter === 'Reconciled') return MOCK_BANK_TRANSACTIONS.filter(t => t.reconciled);
    if (transactionsFilter === 'Unreconciled') return MOCK_BANK_TRANSACTIONS.filter(t => !t.reconciled);
    return MOCK_BANK_TRANSACTIONS;
  }, [transactionsFilter]);

  const filteredVatReturns = useMemo(() => {
    if (!vatSearch) return MOCK_VAT_RETURNS_DATA;
    const lowerSearch = vatSearch.toLowerCase();
    return MOCK_VAT_RETURNS_DATA.filter(row => row.email.toLowerCase().includes(lowerSearch) || row.companyName.toLowerCase().includes(lowerSearch));
  }, [vatSearch]);

  const filteredTaxReturns = useMemo(() => {
    let data = MOCK_TAX_RETURNS_DATA.filter(r => r.sendStatus === taxReturnTab);
    data = data.filter(r => r.year.toString() === taxReturnYear);
    if (taxReturnSearch) {
      const lower = taxReturnSearch.toLowerCase();
      data = data.filter(r => r.email.toLowerCase().includes(lower) || r.companyName.toLowerCase().includes(lower));
    }
    return data;
  }, [taxReturnTab, taxReturnYear, taxReturnSearch]);

  const bankTransactionsSummary = useMemo(() => {
    const all = MOCK_BANK_TRANSACTIONS;
    const reconciled = all.filter(t => t.reconciled);
    const unreconciled = all.filter(t => !t.reconciled);
    return {
      all: { count: all.length, amount: all.reduce((sum, t) => sum + t.amount, 0) },
      reconciled: { count: reconciled.length, amount: reconciled.reduce((sum, t) => sum + t.amount, 0) },
      unreconciled: { count: unreconciled.length, amount: unreconciled.reduce((sum, t) => sum + t.amount, 0) },
    };
  }, []);

  const totalBusinessIncome = MOCK_INCOME_DATA.filter(t => t.category === 'Business Income')
    .reduce((sum, t) => sum + t.totalAmount, 0);

  const handleOpenReconcile = (tx: BankTransaction) => {
    setSelectedTransactionForReconciliation(tx);
    setIsChooseExpensesModalOpen(true);
  };

  const handleReconcileConfirm = (expenseId: string) => {
    console.log(`Reconciling transaction ${selectedTransactionForReconciliation?.id} with expense ${expenseId}`);
    setIsChooseExpensesModalOpen(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    if (activeItem === NavItemType.WELCOME) return <main className="flex-1 overflow-hidden flex flex-col"><Welcome /></main>;
    if (activeItem === NavItemType.CHAT) return <main className="flex-1 overflow-hidden flex flex-col"><Chat /></main>;
    if (activeItem === NavItemType.ACCOUNT) return <main className="flex-1 overflow-hidden flex flex-col"><Account /></main>;
    if (activeItem === NavItemType.AI_SUPPORT) return <main className="flex-1 overflow-hidden flex flex-col"><AISupport /></main>;
    if (activeItem === NavItemType.DASHBOARD) return <main className="flex-1 overflow-hidden flex flex-col"><Dashboard data={MOCK_DASHBOARD_DATA} /></main>;
    if (activeItem === NavItemType.REPORTS) return <main className="flex-1 overflow-hidden flex flex-col"><Reports /></main>;

    if (activeItem === NavItemType.VAT_RETURNS) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col px-6 py-4">
           <div className="mb-6 flex items-center justify-between">
             <h1 className="text-2xl font-medium text-[#000000]">VAT Returns</h1>
             <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#616A6B]">
                  <MagnifyingGlass size={16} />
                </div>
                <input 
                  type="text" 
                  value={vatSearch}
                  onChange={(e) => setVatSearch(e.target.value)}
                  placeholder="Search..."
                  className="h-[42px] pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] placeholder-[#616A6B] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors w-[260px] focus:outline-none font-medium"
                />
             </div>
           </div>
           <VatReturnsTable data={filteredVatReturns} />
        </main>
      );
    }

    if (activeItem === NavItemType.TAX_RETURN) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col px-6 py-4">
           <div className="mb-6 flex items-center justify-between">
             <div className="flex flex-col gap-4">
               <h1 className="text-2xl font-medium text-[#000000]">Tax return</h1>
               <div className="inline-flex bg-[#F3F4F6] p-1 rounded-xl self-start">
                 <button onClick={() => setTaxReturnTab('SENT')} className={`px-5 py-2 text-[14px] font-medium rounded-lg transition-all ${taxReturnTab === 'SENT' ? 'bg-white text-[#000000] shadow-sm' : 'text-[#616A6B] hover:text-[#000000]'}`}>Sent</button>
                 <button onClick={() => setTaxReturnTab('NOT SENT')} className={`px-5 py-2 text-[14px] font-medium rounded-lg transition-all ${taxReturnTab === 'NOT SENT' ? 'bg-white text-[#000000] shadow-sm' : 'text-[#616A6B] hover:text-[#000000]'}`}>Not sent</button>
               </div>
             </div>
             <div className="flex items-center gap-4 self-start mt-1">
                <div className="flex items-center gap-2">
                   <span className="text-[14px] text-[#616A6B] font-medium">Tax return year</span>
                   <div className="relative">
                      <select value={taxReturnYear} onChange={(e) => setTaxReturnYear(e.target.value)} className="h-[42px] pl-4 pr-10 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] font-medium focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors appearance-none cursor-pointer">
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#616A6B]">
                        <CaretDown size={14} weight="bold" />
                      </div>
                   </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#616A6B]">
                    <MagnifyingGlass size={16} />
                  </div>
                  <input type="text" value={taxReturnSearch} onChange={(e) => setTaxReturnSearch(e.target.value)} placeholder="Search..." className="h-[42px] pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] placeholder-[#616A6B] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors w-[260px] focus:outline-none font-medium" />
                </div>
             </div>
           </div>
           <TaxReturnTable data={filteredTaxReturns} />
        </main>
      );
    }

    if (activeItem === NavItemType.INVITATIONS) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col px-6 py-4">
           <div className="mb-6 flex items-center justify-between">
             <h1 className="text-2xl font-medium text-[#000000]">Invitations</h1>
           </div>
           <div className="mb-4 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]">
                   All statuses
                   <CaretDown size={14} className="text-[#616A6B]" />
                </button>
             </div>
             <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#616A6B]">
                    <MagnifyingGlass size={16} />
                  </div>
                  <input type="text" placeholder="Search invitations..." className="h-[42px] pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] placeholder-[#616A6B] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors w-[260px] focus:outline-none font-medium" />
                </div>
                <button className="h-[42px] px-5 bg-[#F7D84A] hover:bg-[#FCD34D] text-[#0F3A3E] text-[14px] font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm">
                   <Plus size={16} weight="bold" />
                   Create Invitation
                </button>
             </div>
           </div>
           <InvitationsTable invitations={MOCK_INVITATIONS} />
        </main>
      );
    }
    
    if (activeItem === NavItemType.MILEAGES) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col px-6 py-4">
           <div className="mb-6 flex items-center justify-between">
             <h1 className="text-2xl font-medium text-[#000000]">Mileage</h1>
           </div>
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                  <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]">
                    Last 30 days
                    <CaretDown size={14} className="text-[#616A6B]" />
                  </button>
                  <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]">
                    <Car size={16} className="text-[#616A6B]" />
                    All Vehicles
                    <CaretDown size={14} className="text-[#616A6B]" />
                  </button>
              </div>
              <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#616A6B]">
                          <MagnifyingGlass size={16} />
                        </div>
                        <input type="text" placeholder="Search..." className="h-[42px] pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] placeholder-[#616A6B] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors w-[220px] focus:outline-none font-medium" />
                    </div>
                    <button className="h-[42px] px-5 bg-[#F7D84A] hover:bg-[#FCD34D] text-[#0F3A3E] text-[14px] font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap">
                       <Plus size={16} weight="bold" />
                       Add Trip
                    </button>
              </div>
           </div>
           <div className="flex-1 overflow-y-auto custom-scrollbar">
              <MileagesList mileages={MOCK_MILEAGES} />
           </div>
        </main>
      );
    }
    
    if (activeItem === NavItemType.INVOICES) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col px-6 py-4">
           <div className="mb-6 flex items-center justify-between">
             <h1 className="text-2xl font-medium text-[#000000]">Invoices</h1>
           </div>
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                  <div className="bg-[#F3F4F6] p-1 rounded-xl flex">
                      {(['All', 'Open', 'Paid', 'Due'] as const).map((status) => (
                        <button key={status} onClick={() => setInvoiceStatusFilter(status)} className={`px-5 py-2 text-[14px] font-medium rounded-lg transition-all ${invoiceStatusFilter === status ? 'bg-white text-[#000000] shadow-sm' : 'text-[#616A6B] hover:text-[#000000]'}`}>{status}</button>
                      ))}
                  </div>
              </div>
               <div className="flex items-center gap-3">
                    <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]">
                       Last 30 days
                       <CaretDown size={14} className="text-[#616A6B]" />
                    </button>
                    <button className="h-[42px] px-5 bg-[#F7D84A] hover:bg-[#FCD34D] text-[#0F3A3E] text-[14px] font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm">
                       <Plus size={16} weight="bold" />
                       Create Invoice
                    </button>
               </div>
           </div>
           <InvoicesTable invoices={MOCK_INVOICES} statusFilter={invoiceStatusFilter} />
        </main>
      );
    }

    if (activeItem === NavItemType.TRANSACTIONS) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col px-6 py-4">
           <div className="mb-4">
             <h1 className="text-2xl font-medium text-[#000000]">Transactions</h1>
           </div>
           <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                  <div className="relative">
                     <select className="h-[42px] pl-4 pr-10 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] font-medium focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors appearance-none cursor-pointer min-w-[280px]">
                        <option>£100.00 Plaid Standard Current Account</option>
                     </select>
                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#616A6B]">
                        <CaretDown size={14} weight="bold" />
                     </div>
                  </div>
                  <div className="flex items-center gap-2 h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl transition-colors cursor-pointer hover:border-[#D1D5DB]">
                     <span className="text-[#616A6B] text-[13px] font-normal mr-1">First fetch date</span>
                     <span className="text-[13px] text-[#000000] font-medium">6 April 2025</span>
                     <CalendarBlank size={16} className="text-[#616A6B] ml-2" />
                  </div>
              </div>
           </div>
           <div className="flex gap-4 mb-6">
              <div onClick={() => setTransactionsFilter('All')} className={`flex items-center gap-4 px-5 py-4 rounded-xl border cursor-pointer min-w-[200px] transition-all bg-[#F9FAFB] border-[#E5E7EB] hover:border-[#D1D5DB] ${transactionsFilter === 'All' ? 'ring-2 ring-[#1E6F73]/20 border-[#1E6F73]' : ''}`}>
                 <div className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center flex-shrink-0">
                    <FileText size={20} className="text-[#000000]" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[14px] font-medium text-[#000000]">All {bankTransactionsSummary.all.count}</span>
                    <span className="text-[12px] text-[#616A6B] font-medium">-£45,169.00</span>
                 </div>
              </div>
              <div onClick={() => setTransactionsFilter('Reconciled')} className={`flex items-center gap-4 px-5 py-4 rounded-xl border cursor-pointer min-w-[200px] transition-all bg-white border-[#E5E7EB] hover:border-[#D1D5DB] ${transactionsFilter === 'Reconciled' ? 'ring-2 ring-[#1E6F73]/20 border-[#1E6F73]' : ''}`}>
                 <div className="w-10 h-10 rounded-full bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center flex-shrink-0">
                    <Check size={20} weight="bold" className="text-[#166534]" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[14px] font-medium text-[#000000]">Reconciled {bankTransactionsSummary.reconciled.count}</span>
                    <span className="text-[12px] text-[#616A6B] font-medium">-£4,492.58</span>
                 </div>
              </div>
              <div className="ml-auto mt-auto">
                 <input type="text" placeholder="Search by amount or description" className="h-[42px] px-4 w-[280px] bg-white border border-[#E5E7EB] rounded-xl text-[13px] text-[#000000] placeholder-[#616A6B] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors focus:outline-none font-medium" />
              </div>
           </div>
           <BankTransactionsTable data={filteredBankTransactions} onReconcile={handleOpenReconcile} />
           <ChooseExpensesModal isOpen={isChooseExpensesModalOpen} onClose={() => setIsChooseExpensesModalOpen(false)} onConfirm={handleReconcileConfirm} transaction={selectedTransactionForReconciliation} />
        </main>
      );
    }

    if (activeItem === NavItemType.EXPENSES) {
      return (
            <main className="flex-1 overflow-hidden flex flex-col px-6 py-4">
               <div className="mb-6 flex items-center justify-between">
                 <h1 className="text-2xl font-medium text-[#000000]">Expenses</h1>
               </div>
               <div className="flex gap-4 mb-6 overflow-x-auto custom-scrollbar pb-2">
                 {EXPENSE_SUMMARY.map((card) => {
                    const isActive = expenseFilterCategory === card.id;
                    return (
                        <div key={card.id} onClick={() => setExpenseFilterCategory(card.id)} className={`relative overflow-hidden rounded-xl pl-5 pr-10 py-4 border flex items-center gap-4 min-w-[240px] shadow-sm hover:shadow-md transition-all group cursor-pointer flex-shrink-0 ${isActive ? 'bg-[#FFF7D6] border-[#F7D84A] ring-1 ring-[#F7D84A]/50' : 'bg-white border-[#E5E7EB] hover:border-[#D1D5DB]'}`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-colors ${isActive ? 'bg-white border border-[#e6dac0] text-[#0F3A3E]' : 'bg-[#F9FAFB] border border-[#E5E7EB] text-[#616A6B]'}`}>
                            <card.icon size={22} weight="fill" className={isActive ? "opacity-100" : "opacity-60"} />
                        </div>
                        <div className="flex flex-col z-10">
                            <span className={`text-[13px] font-medium tracking-wide transition-colors truncate max-w-[180px] ${isActive ? 'text-[#000000] opacity-90' : 'text-[#616A6B]'}`}>{card.label}</span>
                            <span className="text-[18px] text-[#000000] font-medium leading-none mt-1 ">€{card.value.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        </div>
                    );
                 })}
               </div>
               <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]">Last 30 days<CaretDown size={14} className="text-[#616A6B]" /></button>
              <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]"><Funnel size={16} className="text-[#616A6B]" />Filters<CaretDown size={14} className="text-[#616A6B]" /></button>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#616A6B]"><MagnifyingGlass size={16} /></div>
                <input type="text" placeholder="Search" className="h-[42px] pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] placeholder-[#616A6B] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors w-[260px] focus:outline-none font-medium" />
              </div>
              <button onClick={() => setIsCreateExpenseModalOpen(true)} className="h-[42px] px-5 bg-[#F7D84A] hover:bg-[#FCD34D] text-[#0F3A3E] text-[14px] font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap"><Plus size={16} weight="bold" />Create expense</button>
            </div>
          </div>
               <ExpensesTable transactions={filteredExpenses} />
            </main>
        );
    }

    if (activeItem === NavItemType.ALL_CLIENTS) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col px-6 py-4 ">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-medium text-[#000000]">Clients</h1>
          </div>
          <div className="flex gap-4 mb-6">
             <div className="relative overflow-hidden rounded-xl pl-5 pr-10 py-4 border flex items-center gap-4 min-w-[240px] shadow-sm bg-white border-[#E5E7EB]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-colors bg-[#F9FAFB] border border-[#E5E7EB] text-[#616A6B]"><CheckCircle size={22} weight="fill" className="opacity-80" /></div>
                <div className="flex flex-col z-10">
                   <span className="text-[13px] font-medium tracking-wide text-[#616A6B]">Paying customers</span>
                   <span className="text-[18px] text-[#000000] font-medium leading-none mt-1">19</span>
                </div>
             </div>
          </div>
          <div className="mb-4 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]">All statuses<CaretDown size={14} className="text-[#616A6B]" /></button>
             </div>
             <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#616A6B]"><MagnifyingGlass size={16} /></div>
                  <input type="text" placeholder="Search clients..." className="h-[42px] pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] placeholder-[#616A6B] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors w-[220px] focus:outline-none font-medium" />
                </div>
                <button className="h-[42px] px-5 bg-[#F7D84A] hover:bg-[#FCD34D] text-[#0F3A3E] text-[14px] font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm"><Plus size={16} weight="bold" />Invite client</button>
             </div>
          </div>
          <ClientTable clients={MOCK_CLIENT_DATA} />
        </main>
      );
    }

    return (
      <main className="flex-1 overflow-hidden flex flex-col px-6 py-4">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-medium text-[#000000]">Income</h1>
          </div>
          <div className="flex gap-4 mb-6">
            <div onClick={() => setFilterCategory(null)} className={`relative overflow-hidden rounded-xl pl-5 pr-10 py-4 border flex items-center gap-4 min-w-[240px] shadow-sm hover:shadow-md transition-all group cursor-pointer ${filterCategory === null ? 'bg-[#FFF7D6] border-[#F7D84A] ring-1 ring-[#F7D84A]/50' : 'bg-white border-[#E5E7EB] hover:border-[#D1D5DB]'}`}>
               <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-colors ${filterCategory === null ? 'bg-white border border-[#e6dac0] text-[#0F3A3E]' : 'bg-[#F9FAFB] border border-[#E5E7EB] text-[#616A6B]'}`}>
                  <Tray size={22} weight="fill" className={filterCategory === null ? "opacity-100" : "opacity-60"} />
               </div>
               <div className="flex flex-col z-10">
                  <span className={`text-[13px] font-medium tracking-wide transition-colors ${filterCategory === null ? 'text-[#000000] opacity-90' : 'text-[#616A6B]'}`}>All income</span>
                  <span className="text-[18px] text-[#000000] font-medium mt-1">€29,626.26</span>
               </div>
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]">Last 30 days<CaretDown size={14} className="text-[#616A6B]" /></button>
              <button className="h-[42px] px-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] font-medium flex items-center gap-2 transition-colors hover:border-[#D1D5DB]"><Funnel size={16} className="text-[#616A6B]" />Filters<CaretDown size={14} className="text-[#616A6B]" /></button>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#616A6B]"><MagnifyingGlass size={16} /></div>
                <input type="text" placeholder="Search" className="h-[42px] pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-[14px] text-[#000000] placeholder-[#616A6B] focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] transition-colors w-[260px] focus:outline-none font-medium" />
              </div>
              <button onClick={() => setIsCreateIncomeModalOpen(true)} className="h-[42px] px-5 bg-[#F7D84A] hover:bg-[#FCD34D] text-[#0F3A3E] text-[14px] font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap"><Plus size={16} weight="bold" />Create income</button>
            </div>
          </div>
          <TransactionTable transactions={filteredTransactions} />
      </main>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} onLogout={() => setIsAuthenticated(false)} />
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <TopHeader />
        {renderContent()}
      </div>
    </div>
  );
};

export default App;