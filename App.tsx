
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import TransactionTable from './components/TransactionTable';
import ExpensesTable from './components/ExpensesTable';
import ClientTable from './components/ClientTable';
import VatReturnsTable from './components/VatReturnsTable';
import TaxReturnTable from './components/TaxReturnTable';
import BankTransactionsTable from './components/BankTransactionsTable';
import Chat from './components/Chat';
import Account from './components/Account';
import Login from './components/Login';
import AISupport from './components/AISupport';
import Dashboard from './components/Dashboard';
import Welcome from './components/Welcome';
import { NavItemType, IncomeTransaction, Client, ExpenseTransaction, VatReturn, TaxReturnRow, BankTransaction, DashboardData } from './types';
import { 
  Tray, 
  TrendUp, 
  CheckCircle, 
  Clock,
  Play,
  Funnel,
  Stack,
  MagnifyingGlass,
  CaretDown,
  DownloadSimple,
  Plus,
  Upload,
  WarningCircle,
  CurrencyDollar,
  Handshake,
  Car,
  XCircle,
  Package,
  Buildings,
  Check,
  Bank,
  CalendarBlank
} from '@phosphor-icons/react';

// Mock Data based on the Income screenshot + Additional data
const INITIAL_INCOME_DATA: IncomeTransaction[] = [
  {
    id: '1',
    date: '20.11.2025',
    customer: 'Cash sale - no customer',
    category: 'Business Income',
    typeId: 'Sale 570',
    hasDocument: true,
    reference: 'POS-001',
    reconciled: true,
    subtotal: 200.00,
    taxRate: '0%: €0.00',
    vat: 0.00,
    totalAmount: 200.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Cash',
    dueDate: '20.11.2025',
    project: 'Store 1',
    costCenter: 'Sales',
    createdBy: 'Sami Kletta'
  },
  {
    id: '2',
    date: '20.11.2025',
    customer: 'Manual entry - no customer',
    description: 'Torstai Timma Myynti 25,5%',
    category: 'Business Income',
    typeId: 'Manual Entry 62720',
    hasDocument: false,
    reference: 'DAILY-02',
    reconciled: false,
    subtotal: 796.81,
    taxRate: '25.5%: ', 
    vat: 203.19,
    totalAmount: 1000.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Manual',
    dueDate: '20.11.2025',
    project: 'HQ',
    costCenter: 'Ops',
    createdBy: 'Sami Kletta'
  },
  {
    id: '3',
    date: '19.11.2025',
    customer: 'TechSolutions Inc.',
    description: 'Q4 Consulting Retainer',
    category: 'Consulting Fees',
    typeId: 'Inv-1024',
    hasDocument: true,
    reference: 'PO-9921',
    reconciled: true,
    subtotal: 4500.00,
    taxRate: '24%: ',
    vat: 1080.00,
    totalAmount: 5580.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Bank Transfer',
    dueDate: '19.12.2025',
    project: 'Consulting',
    costCenter: 'Services',
    createdBy: 'Admin User'
  },
  {
    id: '4',
    date: '18.11.2025',
    customer: 'Nordic Design Studio',
    description: 'Web Development Services',
    category: 'Service Income',
    typeId: 'Inv-1023',
    hasDocument: true,
    reference: 'REF-882',
    reconciled: false,
    subtotal: 1250.00,
    taxRate: '24%: ',
    vat: 300.00,
    totalAmount: 1550.00,
    isVerified: false,
    isAiVerified: true,
    paymentMethod: 'Stripe',
    dueDate: '18.12.2025',
    project: 'Web Dev',
    costCenter: 'IT',
    createdBy: 'Sami Kletta'
  },
  {
    id: '5',
    date: '15.11.2025',
    customer: 'Stripe Payout',
    description: 'Weekly settlement',
    category: 'Online Sales',
    typeId: 'Payout 22',
    hasDocument: false,
    reference: 'STR-9912',
    reconciled: true,
    subtotal: 890.50,
    taxRate: '0%: €0.00',
    vat: 0.00,
    totalAmount: 890.50,
    isVerified: true,
    isAiVerified: false,
    paymentMethod: 'Stripe',
    dueDate: '15.11.2025',
    project: 'Online',
    costCenter: 'Sales',
    createdBy: 'System'
  },
  {
    id: '6',
    date: '14.11.2025',
    customer: 'Local Cafe Partnership',
    description: 'Merchandise reselling',
    category: 'Merchandise',
    typeId: 'Sale 562',
    hasDocument: true,
    reference: 'INV-009',
    reconciled: false,
    subtotal: 320.00,
    taxRate: '14%: ',
    vat: 44.80,
    totalAmount: 364.80,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Cash',
    dueDate: '14.11.2025',
    project: 'Retail',
    costCenter: 'Sales',
    createdBy: 'Sami Kletta'
  },
  {
    id: '7',
    date: '12.11.2025',
    customer: 'Consulting Project Alpha',
    description: 'Milestone 2 payment',
    category: 'Consulting Fees',
    typeId: 'Inv-1021',
    hasDocument: true,
    reference: 'MST-2',
    reconciled: true,
    subtotal: 2100.00,
    taxRate: '24%: ',
    vat: 504.00,
    totalAmount: 2604.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Bank Transfer',
    dueDate: '12.12.2025',
    project: 'Alpha',
    costCenter: 'Consulting',
    createdBy: 'Admin User'
  },
  {
    id: '8',
    date: '10.11.2025',
    customer: 'Cash sale - no customer',
    category: 'Business Income',
    typeId: 'Sale 555',
    hasDocument: false,
    reference: 'POS-002',
    reconciled: true,
    subtotal: 150.00,
    taxRate: '0%: €0.00',
    vat: 0.00,
    totalAmount: 150.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Cash',
    dueDate: '10.11.2025',
    project: 'Store 1',
    costCenter: 'Sales',
    createdBy: 'Sami Kletta'
  },
  {
    id: '9',
    date: '08.11.2025',
    customer: 'Marketing GIG',
    description: 'Ad campaign management',
    category: 'Service Income',
    typeId: 'Inv-1019',
    hasDocument: true,
    reference: 'AD-2025',
    reconciled: false,
    subtotal: 5000.00,
    taxRate: '24%: ',
    vat: 1200.00,
    totalAmount: 6200.00,
    isVerified: false,
    isAiVerified: false,
    paymentMethod: 'Bank Transfer',
    dueDate: '08.12.2025',
    project: 'Marketing',
    costCenter: 'Services',
    createdBy: 'Sami Kletta'
  },
  {
    id: '10',
    date: '05.11.2025',
    customer: 'Subscription Renewal',
    description: 'Yearly SaaS License',
    category: 'Software Sales',
    typeId: 'Sub-441',
    hasDocument: true,
    reference: 'LIC-99',
    reconciled: true,
    subtotal: 800.00,
    taxRate: '24%: ',
    vat: 192.00,
    totalAmount: 992.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Credit Card',
    dueDate: '05.11.2025',
    project: 'SaaS',
    costCenter: 'IT',
    createdBy: 'System'
  },
  {
    id: '11',
    date: '02.11.2025',
    customer: 'Manual entry - Adjustment',
    description: 'Correction for Oct',
    category: 'Other Income',
    typeId: 'Adj-01',
    hasDocument: false,
    reference: 'MEMO-01',
    reconciled: true,
    subtotal: 50.00,
    taxRate: '0%: €0.00',
    vat: 0.00,
    totalAmount: 50.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'N/A',
    dueDate: '02.11.2025',
    project: 'Internal',
    costCenter: 'Admin',
    createdBy: 'Sami Kletta'
  },
  {
    id: '12',
    date: '01.11.2025',
    customer: 'StartUp Grant',
    description: 'Government assistance',
    category: 'Grants',
    typeId: 'Gov-2025',
    hasDocument: true,
    reference: 'FIN-GRANT',
    reconciled: true,
    subtotal: 8000.00,
    taxRate: '0%: €0.00',
    vat: 0.00,
    totalAmount: 8000.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Grant',
    dueDate: '01.11.2025',
    project: 'Funding',
    costCenter: 'Finance',
    createdBy: 'Admin User'
  }
];

// Generate more data for scrolling
const MOCK_INCOME_DATA: IncomeTransaction[] = [
  ...INITIAL_INCOME_DATA,
  ...INITIAL_INCOME_DATA.map(item => ({ ...item, id: item.id + '_dup1', date: '01.10.2025' })),
  ...INITIAL_INCOME_DATA.map(item => ({ ...item, id: item.id + '_dup2', date: '28.09.2025' })),
];

// EXPENSES DATA
const EXPENSE_CATEGORIES = [
  'All',
  'External services',
  'Non-allowable expenses',
  'Other deductible expenses',
  'Purchases and inventory changes',
  'Rents',
  'Vehicle cost',
  'Vehicle depreciation'
];

const INITIAL_EXPENSES_DATA: ExpenseTransaction[] = [
  {
    id: 'e1',
    date: '12.05.2025',
    customer: 'Test',
    category: 'Non-allowable expenses',
    receipt: 'Manual entry 5280',
    document: null,
    reconciled: false,
    subtotal: 978.00,
    taxRate: '14%: €10.00',
    vat: 22.00,
    totalAmount: 1000.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e2',
    date: '21.03.2025',
    customer: 'Autokulut',
    category: 'Vehicle cost',
    receipt: 'Manual entry 5162',
    document: null,
    reconciled: false,
    subtotal: 5000.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 5000.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e3',
    date: '01.02.2025',
    customer: 'Kulu',
    category: 'Purchases and inventory changes',
    receipt: 'Manual entry 5219',
    document: null,
    reconciled: false,
    subtotal: 4385.96,
    taxRate: '14%',
    vat: 614.04,
    totalAmount: 5000.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e4',
    date: '01.02.2025',
    customer: 'Welcome Keele Break North Group Fct',
    category: 'Other deductible expenses',
    receipt: 'Receipt 202520001',
    document: 'doc1.jpg',
    reconciled: true,
    subtotal: 21.65,
    taxRate: 'Exempted from VAT',
    vat: 0.00,
    totalAmount: 21.65,
    verified: false,
    aiVerified: false
  },
  {
    id: 'e5',
    date: '01.02.2025',
    customer: 'WHSmith',
    category: 'External services',
    receipt: 'Receipt 202520002',
    document: 'doc2.jpg',
    reconciled: true,
    subtotal: 13.49,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 13.49,
    verified: false,
    aiVerified: false
  },
  {
    id: 'e6',
    date: '08.01.2025',
    customer: 'Kulu',
    category: 'External services',
    receipt: 'Manual entry 5220',
    document: null,
    reconciled: false,
    subtotal: 4385.96,
    taxRate: '14%',
    vat: 614.04,
    totalAmount: 5000.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e7',
    date: '01.01.2025',
    customer: 'Private car 25% depreciation',
    category: 'Vehicle depreciation',
    receipt: 'Manual entry 4812',
    document: null,
    reconciled: false,
    subtotal: 750.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 750.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e8',
    date: '01.01.2025',
    customer: 'MKV-740 25% depreciation',
    category: 'Vehicle depreciation',
    receipt: 'Manual entry 4811',
    document: null,
    reconciled: false,
    subtotal: 2500.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 2500.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e9',
    date: '01.01.2025',
    customer: 'Auto 25% depreciation',
    category: 'Vehicle depreciation',
    receipt: 'Manual entry 4807',
    document: null,
    reconciled: false,
    subtotal: 1250.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 1250.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e10',
    date: '01.01.2025',
    customer: 'Kia 25% depreciation',
    category: 'Vehicle depreciation',
    receipt: 'Manual entry 4786',
    document: null,
    reconciled: false,
    subtotal: 2500.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 2500.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e11',
    date: '01.01.2025',
    customer: 'Lexus CT200h 25% depreciation',
    category: 'Vehicle depreciation',
    receipt: 'Manual entry 4785',
    document: null,
    reconciled: false,
    subtotal: 2500.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 2500.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e12',
    date: '01.01.2025',
    customer: 'Teollisuusviuouskone 25% depreciation',
    category: 'Vehicle depreciation',
    receipt: 'Manual entry 4780',
    document: null,
    reconciled: false,
    subtotal: 2500.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 2500.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e13',
    date: '01.01.2025',
    customer: 'New 25% depreciation',
    category: 'Vehicle depreciation',
    receipt: 'Manual entry 4779',
    document: null,
    reconciled: false,
    subtotal: 4000.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 4000.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e14',
    date: '01.01.2025',
    customer: 'Double tap 25% depreciation',
    category: 'Vehicle depreciation',
    receipt: 'Manual entry 4778',
    document: null,
    reconciled: false,
    subtotal: 2500.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 2500.00,
    verified: true,
    aiVerified: true
  },
  {
    id: 'e15',
    date: '01.01.2025',
    customer: 'Rents 1',
    category: 'Rents',
    receipt: 'Manual entry 9991',
    document: null,
    reconciled: false,
    subtotal: 415.00,
    taxRate: '0%',
    vat: 0.00,
    totalAmount: 415.00,
    verified: true,
    aiVerified: true
  },
];

const MOCK_EXPENSES_DATA: ExpenseTransaction[] = [
    ...INITIAL_EXPENSES_DATA,
    ...INITIAL_EXPENSES_DATA.map(e => ({ ...e, id: e.id + '_d1' })),
    ...INITIAL_EXPENSES_DATA.map(e => ({ ...e, id: e.id + '_d2' }))
];

const EXPENSE_SUMMARY = [
    { label: 'All', value: 94908.11, id: 'All', icon: Tray },
    { label: 'External services', value: 4399.45, id: 'External services', icon: Handshake },
    { label: 'Non-allowable expenses', value: 978.00, id: 'Non-allowable expenses', icon: XCircle },
    { label: 'Other deductible expenses', value: 305.23, id: 'Other deductible expenses', icon: Check },
    { label: 'Purchases and inventory changes', value: 4452.48, id: 'Purchases and inventory changes', icon: Package },
    { label: 'Rents', value: 415.00, id: 'Rents', icon: Buildings },
    { label: 'Vehicle cost', value: 5000.00, id: 'Vehicle cost', icon: Car },
    { label: 'Vehicle depreciation', value: 80335.94, id: 'Vehicle depreciation', icon: WarningCircle },
];

// NEW TRANSACTIONS (BANK) DATA
const MOCK_BANK_TRANSACTIONS: BankTransaction[] = [
  { id: "T0001", date: "02.12.2025", description: "Coffee shop purchase", category: "Meals", reconciled: false, reference: "COF-8821", amount: -4.50 },
  { id: "T0002", date: "02.12.2025", description: "Client payment – invoice 4582", category: "Income", reconciled: true, reference: "INV-4582", amount: 1200.00 },
  { id: "T0003", date: "01.12.2025", description: "Uber ride", category: "Transport", reconciled: false, reference: "UBR-3382", amount: -17.90 },
  { id: "T0004", date: "30.11.2025", description: "Laptop purchase", category: "Equipment", reconciled: true, reference: "RCPT-9921", amount: -899.00 },
  { id: "T0005", date: "29.11.2025", description: "Monthly subscription", category: "Software", reconciled: true, reference: "SUB-2025-11", amount: -19.99 },
  { id: "T0006", date: "27.11.2025", description: "Office supplies", category: "Supplies", reconciled: false, reference: "ST-1182", amount: -12.30 },
  { id: "T0007", date: "26.11.2025", description: "Refund from vendor", category: "Income", reconciled: true, reference: "RF-7712", amount: 32.00 },
  { id: "T0008", date: "25.11.2025", description: "Car fuel", category: "Vehicle expenses", reconciled: false, reference: "FUEL-2261", amount: -54.90 },
  { id: "T0009", date: "24.11.2025", description: "Restaurant meeting", category: "Meals", reconciled: false, reference: "MEET-5531", amount: -68.20 },
  { id: "T0010", date: "23.11.2025", description: "External consultant fee", category: "Services", reconciled: true, reference: "SRV-9012", amount: -430.00 },
  { id: "T0011", date: "22.11.2025", description: "Client payment – invoice 4481", category: "Income", reconciled: true, reference: "INV-4481", amount: 850.00 },
  { id: "T0012", date: "20.11.2025", description: "Online ads", category: "Marketing", reconciled: false, reference: "ADS-2301", amount: -120.00 }
];

const MOCK_VAT_RETURNS_DATA: VatReturn[] = [
  {
    id: '1',
    email: 'dmitri+klettauser@timma.fi',
    companyName: 'Dmitri Oy',
    firstName: '—',
    lastName: '—',
    utr: '1234567-1',
    isUtrVerified: true,
    taxPeriod: '01.10.2025–31.10.2025',
    edited: ''
  },
  {
    id: '2',
    email: 'origamhi@gmail.com',
    companyName: 'da nang',
    firstName: 'huy hank',
    lastName: 'razzle',
    utr: '2323421-2',
    isUtrVerified: true,
    taxPeriod: '01.10.2025–31.10.2025',
    edited: ''
  },
  {
    id: '3',
    email: 'sami+user@kletta.com',
    companyName: 'Sami Consulting',
    firstName: 'Sami',
    lastName: 'Tester',
    utr: '9876543-2',
    isUtrVerified: true,
    taxPeriod: '01.10.2025–31.10.2025',
    edited: ''
  },
  // Generate more rows
  ...Array.from({ length: 17 }).map((_, i) => ({
    id: `${i + 4}`,
    email: `user${i+4}@example.com`,
    companyName: i % 2 === 0 ? `Company ${i+4} Oy` : '—',
    firstName: i % 3 === 0 ? `First${i+4}` : '—',
    lastName: i % 3 === 0 ? `Last${i+4}` : '—',
    utr: `${1000000 + i}-1`,
    isUtrVerified: i % 4 !== 0,
    taxPeriod: '01.10.2025–31.10.2025',
    edited: i % 5 === 0 ? 'Yesterday' : ''
  }))
];

// NEW MOCK DATA FOR TAX RETURN
const MOCK_TAX_RETURNS_DATA: TaxReturnRow[] = [
  {
    id: '1',
    sendStatus: 'SENT',
    email: 'sami+918@kletta.com',
    companyName: '',
    firstName: 'Sami',
    lastName: 'Verkkopera',
    plan: 'PRO',
    status: 'TRIAL',
    utr: '1234567-8',
    isUtrVerified: true,
    year: 2024
  },
  {
    id: '2',
    sendStatus: 'SENT',
    email: 'origamih+6@gmail.com',
    companyName: '',
    firstName: '',
    lastName: '',
    plan: 'PRO',
    status: 'TRIAL',
    utr: '2123122-3',
    isUtrVerified: true,
    year: 2024
  },
  {
    id: '3',
    sendStatus: 'SENT',
    email: 'sami+3@kletta.com',
    companyName: 'Samin Hieronta',
    firstName: 'Sami',
    lastName: 'Verkkopera',
    plan: 'DUO_39',
    status: 'ACTIVE',
    utr: '2274938-9',
    isUtrVerified: true,
    year: 2024
  },
  {
    id: '4',
    sendStatus: 'SENT',
    email: 'danny+6@kletta.com',
    companyName: 'DanhpPC',
    firstName: 'Danny',
    lastName: 'Pham',
    plan: 'DUO',
    status: 'ACTIVE',
    utr: '9431516-4',
    isUtrVerified: true,
    year: 2024
  },
  {
    id: '5',
    sendStatus: 'NOT SENT',
    email: 'james.bond@mi6.co.uk',
    companyName: 'Universal Exports',
    firstName: 'James',
    lastName: 'Bond',
    plan: 'PRO',
    status: 'ACTIVE',
    utr: '0070070-7',
    isUtrVerified: true,
    year: 2024
  },
  // Generate more rows
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: `${i + 6}`,
    sendStatus: i % 3 === 0 ? 'NOT SENT' as const : 'SENT' as const,
    email: `user${i+6}@example.com`,
    companyName: i % 2 === 0 ? `Test Company ${i+6}` : '',
    firstName: `First${i+6}`,
    lastName: `Last${i+6}`,
    plan: i % 2 === 0 ? 'PRO' : 'DUO_39',
    status: i % 4 === 0 ? 'TRIAL' : 'ACTIVE',
    utr: `${2000000 + i}-X`,
    isUtrVerified: i % 5 !== 0,
    year: 2024
  }))
];

// DASHBOARD MOCK DATA
const MOCK_DASHBOARD_DATA: DashboardData = {
  kpi: {
    income: 7795.57,
    expenses: 94908.11,
    profit: -87112.54
  },
  chart: [
    { month: "Jan", income: 5000, expenses: 65000, profit: -60000 },
    { month: "Feb", income: 4000, expenses: 9000, profit: -5000 },
    { month: "Mar", income: 3000, expenses: 7000, profit: -4000 },
    { month: "Apr", income: 2000, expenses: 3000, profit: -1000 },
    { month: "May", income: 5500, expenses: 4000, profit: 1500 },
    { month: "Jun", income: 6000, expenses: 3500, profit: 2500 },
    { month: "Jul", income: 7000, expenses: 3000, profit: 4000 },
    { month: "Aug", income: 8000, expenses: 2500, profit: 5500 },
    { month: "Sep", income: 7500, expenses: 3000, profit: 4500 },
    { month: "Oct", income: 8500, expenses: 3500, profit: 5000 },
    { month: "Nov", income: 9000, expenses: 4000, profit: 5000 },
    { month: "Dec", income: 9500, expenses: 4500, profit: 5000 }
  ]
};

// Generate 50 mock clients
const generateMockClients = (): Client[] => {
  const plans = ['Kletta Solo', 'Kletta Care', 'PARTNER', 'COLLECT', 'UNSUBSCRIBED'];
  const countries = ['FI', 'UK'];
  const salesPersons = ['Danny', 'Sami', 'James', 'Not set'];
  
  const baseClients: Client[] = [
    {
      id: 1,
      email: 'sami+newmandate@kletta.com',
      countryCode: 'FI',
      plan: 'Kletta Solo',
      utr: '1234567-8',
      isUtrVerified: true,
      isPrepaymentRegistered: false,
      companyName: 'Sami Mandate',
      firstName: 'Sami',
      lastName: 'Mandate',
      phone: '+358 40 123 4567',
      salesPerson: 'Not set',
      cardAddedDate: '01.01.2025',
      bankName: 'Nordea',
      profession: 'Syömies',
      city: 'Helsinki'
    },
    {
      id: 2,
      email: 'timma+pro@business.com',
      countryCode: 'FI',
      plan: 'Kletta Care',
      utr: '9876543-2',
      isUtrVerified: true,
      isPrepaymentRegistered: true,
      companyName: 'Timma Oy',
      firstName: 'Tim',
      lastName: 'Ma',
      phone: '+358 50 999 8888',
      salesPerson: 'Sami',
      cardAddedDate: '15.02.2025',
      bankName: 'OP',
      profession: 'Barber',
      city: 'Espoo'
    },
     {
      id: 3,
      email: 'james.consulting@uk.co',
      countryCode: 'UK',
      plan: 'PARTNER',
      utr: 'GB123456789',
      isUtrVerified: true,
      isPrepaymentRegistered: false,
      companyName: 'James Consulting Ltd',
      firstName: 'James',
      lastName: 'Bond',
      phone: '+44 20 7946 0958',
      salesPerson: 'James',
      cardAddedDate: '10.03.2025',
      bankName: 'Barclays',
      profession: 'Consultant',
      city: 'London'
    }
  ];

  const generated: Client[] = [];
  for (let i = 0; i < 47; i++) {
    generated.push({
      id: i + 4,
      email: `user${i}@example.com`,
      countryCode: countries[i % 2],
      plan: plans[i % 5],
      utr: i % 3 === 0 ? `${1000000 + i}-1` : '',
      isUtrVerified: i % 3 === 0,
      isPrepaymentRegistered: i % 4 === 0,
      companyName: i % 2 === 0 ? `Company ${i}` : '',
      firstName: `First${i}`,
      lastName: `Last${i}`,
      phone: `+358 40 000 ${1000 + i}`,
      salesPerson: salesPersons[i % 4],
      cardAddedDate: '',
      bankName: '',
      profession: '',
      city: ''
    });
  }
  
  return [...baseClients, ...generated];
};

const MOCK_CLIENT_DATA = generateMockClients();

const App: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeItem, setActiveItem] = useState<NavItemType>(NavItemType.INCOME);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  
  // Expenses Filter State
  const [expenseFilterCategory, setExpenseFilterCategory] = useState<string>('All');
  
  // Transactions Filter State
  const [transactionsFilter, setTransactionsFilter] = useState<'All' | 'Reconciled' | 'Unreconciled'>('All');

  // VAT Returns Search
  const [vatSearch, setVatSearch] = useState('');

  // Tax Return State
  const [taxReturnTab, setTaxReturnTab] = useState<'SENT' | 'NOT SENT'>('SENT');
  const [taxReturnYear, setTaxReturnYear] = useState('2024');
  const [taxReturnSearch, setTaxReturnSearch] = useState('');

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
    return MOCK_VAT_RETURNS_DATA.filter(row => 
      row.email.toLowerCase().includes(lowerSearch) ||
      row.companyName.toLowerCase().includes(lowerSearch) ||
      row.firstName.toLowerCase().includes(lowerSearch) ||
      row.lastName.toLowerCase().includes(lowerSearch)
    );
  }, [vatSearch]);

  const filteredTaxReturns = useMemo(() => {
    let data = MOCK_TAX_RETURNS_DATA.filter(r => r.sendStatus === taxReturnTab);
    
    // Filter by year (mock data is mostly 2024 but logic is here)
    data = data.filter(r => r.year.toString() === taxReturnYear);

    if (taxReturnSearch) {
      const lower = taxReturnSearch.toLowerCase();
      data = data.filter(r => 
        r.email.toLowerCase().includes(lower) ||
        r.companyName.toLowerCase().includes(lower) ||
        r.firstName.toLowerCase().includes(lower) ||
        r.lastName.toLowerCase().includes(lower)
      );
    }
    return data;
  }, [taxReturnTab, taxReturnYear, taxReturnSearch]);

  const totalBusinessIncome = MOCK_INCOME_DATA.filter(t => t.category === 'Business Income')
    .reduce((sum, t) => sum + t.totalAmount, 0);

  // Transactions Summary Calculations
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

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // --- RENDER CONTENT BASED ON ACTIVE ITEM ---
  const renderContent = () => {
    if (activeItem === NavItemType.WELCOME) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col">
          <Welcome />
        </main>
      );
    }

    if (activeItem === NavItemType.CHAT) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col">
          <Chat />
        </main>
      );
    }
    
    if (activeItem === NavItemType.ACCOUNT) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col">
          <Account />
        </main>
      );
    }

    if (activeItem === NavItemType.AI_SUPPORT) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col">
          <AISupport />
        </main>
      );
    }

    if (activeItem === NavItemType.DASHBOARD) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col">
          <Dashboard data={MOCK_DASHBOARD_DATA} />
        </main>
      );
    }

    if (activeItem === NavItemType.VAT_RETURNS) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col px-6 py-4">
           <div className="mb-6 flex items-center justify-between">
             <h1 className="text-2xl font-bold text-[#002b31]">VAT Returns</h1>
             <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400">
                  <MagnifyingGlass size={14} />
                </div>
                <input 
                  type="text" 
                  value={vatSearch}
                  onChange={(e) => setVatSearch(e.target.value)}
                  placeholder="Search..."
                  className="h-[32px] pl-8 pr-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 placeholder-gray-400 focus:border-[#004d40] focus:ring-1 focus:ring-[#004d40] transition-colors w-[240px] shadow-sm focus:outline-none"
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
               <h1 className="text-2xl font-bold text-[#002b31]">Tax return</h1>
               
               {/* Segmented Toggle */}
               <div className="inline-flex bg-gray-100 p-1 rounded-lg self-start">
                 <button 
                   onClick={() => setTaxReturnTab('SENT')}
                   className={`px-4 py-1.5 text-[13px] font-medium rounded-md transition-all ${
                     taxReturnTab === 'SENT' 
                       ? 'bg-white text-[#002b31] shadow-sm' 
                       : 'text-gray-500 hover:text-gray-700'
                   }`}
                 >
                   Sent
                 </button>
                 <button 
                   onClick={() => setTaxReturnTab('NOT SENT')}
                   className={`px-4 py-1.5 text-[13px] font-medium rounded-md transition-all ${
                     taxReturnTab === 'NOT SENT' 
                       ? 'bg-white text-[#002b31] shadow-sm' 
                       : 'text-gray-500 hover:text-gray-700'
                   }`}
                 >
                   Not sent
                 </button>
               </div>
             </div>
             
             {/* Right Controls */}
             <div className="flex items-center gap-4 self-start mt-1">
                {/* Year Dropdown */}
                <div className="flex items-center gap-2">
                   <span className="text-[13px] text-gray-500 font-medium">Tax return year</span>
                   <div className="relative">
                      <select 
                        value={taxReturnYear}
                        onChange={(e) => setTaxReturnYear(e.target.value)}
                        className="h-[32px] pl-3 pr-8 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 font-medium focus:border-[#004d40] focus:ring-1 focus:ring-[#004d40] transition-colors appearance-none cursor-pointer shadow-sm"
                      >
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-gray-400">
                        <CaretDown size={12} weight="bold" />
                      </div>
                   </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400">
                    <MagnifyingGlass size={14} />
                  </div>
                  <input 
                    type="text" 
                    value={taxReturnSearch}
                    onChange={(e) => setTaxReturnSearch(e.target.value)}
                    placeholder="Search..."
                    className="h-[32px] pl-8 pr-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 placeholder-gray-400 focus:border-[#004d40] focus:ring-1 focus:ring-[#004d40] transition-colors w-[240px] shadow-sm focus:outline-none"
                  />
                </div>
             </div>
           </div>

           <TaxReturnTable data={filteredTaxReturns} />
        </main>
      );
    }

    if (activeItem === NavItemType.TRANSACTIONS) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col px-6 py-4">
           {/* Page Title */}
           <div className="mb-4">
             <h1 className="text-2xl font-bold text-[#002b31]">Transactions</h1>
           </div>

           {/* Wallet and Date Selectors */}
           <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                 <select className="h-[36px] pl-3 pr-8 bg-white border border-gray-200 hover:border-gray-300 rounded-md text-[13px] text-gray-700 font-medium focus:border-[#004d40] focus:ring-1 focus:ring-[#004d40] transition-colors appearance-none cursor-pointer shadow-sm min-w-[200px]">
                    <option>Main Wallet</option>
                    <option>Savings</option>
                 </select>
                 <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-gray-400">
                    <CaretDown size={12} weight="bold" />
                 </div>
              </div>
              <div className="flex items-center gap-2 h-[36px] px-3 bg-white border border-gray-200 hover:border-gray-300 rounded-md shadow-sm transition-colors cursor-pointer">
                 <CalendarBlank size={16} className="text-gray-500" />
                 <span className="text-[13px] text-gray-700 font-medium">First fetch date: 01.01.2025</span>
              </div>
           </div>

           {/* Filter Cards */}
           <div className="flex gap-4 mb-6">
              {[
                { id: 'All', label: 'All', data: bankTransactionsSummary.all, icon: Tray },
                { id: 'Reconciled', label: 'Reconciled', data: bankTransactionsSummary.reconciled, icon: CheckCircle },
                { id: 'Unreconciled', label: 'Unreconciled', data: bankTransactionsSummary.unreconciled, icon: WarningCircle },
              ].map((filter) => {
                 const isActive = transactionsFilter === filter.id;
                 return (
                    <div 
                      key={filter.id}
                      onClick={() => setTransactionsFilter(filter.id as any)}
                      className={`relative overflow-hidden rounded-lg pl-4 pr-10 py-3.5 border flex items-center gap-4 min-w-[240px] shadow-sm hover:shadow-md transition-all group cursor-pointer ${
                        isActive 
                          ? 'bg-[#fffdf5] border-[#fcd34d] ring-1 ring-[#fcd34d]/50' 
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-colors ${
                         isActive ? 'bg-white border border-[#e6dac0] text-[#002b31]' : 'bg-gray-50 border border-gray-200 text-gray-500'
                       }`}>
                          <filter.icon size={20} weight="fill" className={isActive ? "opacity-80" : "opacity-60"} />
                       </div>
                       <div className="flex flex-col z-10">
                          <span className={`text-[12px] font-regular tracking-wide transition-colors ${isActive ? 'text-black opacity-90' : 'text-gray-600'}`}>
                              {filter.label} ({filter.data.count})
                          </span>
                          <span className="text-[16px] text-[#002b31] font-bold leading-none mt-1">
                              €{filter.data.amount.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                       </div>
                       {isActive && (
                         <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#fcd34d] opacity-50"></div>
                       )}
                    </div>
                 );
              })}
           </div>

           {/* Logs-style Toolbar (Reused) */}
           <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="h-[32px] px-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 font-medium flex items-center gap-2 shadow-sm transition-colors">
                Last 30 days
                <CaretDown size={12} className="text-gray-400" />
              </button>
                <button className="h-[32px] px-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 font-medium flex items-center gap-2 shadow-sm transition-colors">
                <Funnel size={14} className="text-gray-500" />
                Filters
                <CaretDown size={12} className="text-gray-400" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400">
                  <MagnifyingGlass size={14} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search"
                  className="h-[32px] pl-8 pr-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 placeholder-gray-400 focus:border-[#004d40] focus:ring-1 focus:ring-[#004d40] transition-colors w-[220px] shadow-sm focus:outline-none"
                />
              </div>
              <button className="h-[32px] px-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 font-medium flex items-center gap-2 shadow-sm transition-colors">
                <DownloadSimple size={14} className="text-gray-500" />
                Export
              </button>
            </div>
          </div>

           <BankTransactionsTable data={filteredBankTransactions} />
        </main>
      );
    }

    if (activeItem === NavItemType.EXPENSES) {
      return (
            <main className="flex-1 overflow-hidden flex flex-col px-6 py-4">
               {/* Page Title */}
               <div className="mb-6 flex items-center justify-between">
                 <h1 className="text-2xl font-bold text-[#002b31]">Expenses</h1>
               </div>

               {/* Summary Cards - Scrollable */}
               <div className="flex gap-4 mb-6 overflow-x-auto custom-scrollbar pb-2">
                 {EXPENSE_SUMMARY.map((card) => {
                    const isActive = expenseFilterCategory === card.id;
                    return (
                        <div 
                        key={card.id}
                        onClick={() => setExpenseFilterCategory(card.id)}
                        className={`relative overflow-hidden rounded-lg pl-4 pr-10 py-3.5 border flex items-center gap-4 min-w-[240px] shadow-sm hover:shadow-md transition-all group cursor-pointer flex-shrink-0 ${
                            isActive 
                            ? 'bg-[#fffdf5] border-[#fcd34d] ring-1 ring-[#fcd34d]/50' 
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                        >
                        {/* ... card content ... */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-colors ${
                            isActive ? 'bg-white border border-[#e6dac0] text-[#002b31]' : 'bg-gray-50 border border-gray-200 text-gray-500'
                        }`}>
                            <card.icon size={20} weight="fill" className={isActive ? "opacity-80" : "opacity-60"} />
                        </div>
                        <div className="flex flex-col z-10">
                            <span className={`text-[12px] font-regular tracking-wide transition-colors truncate max-w-[180px] ${isActive ? 'text-black opacity-90' : 'text-gray-600'}`}>
                                {card.label}
                            </span>
                            <span className="text-[16px] text-[#002b31] font-bold leading-none mt-1 ">
                                €{card.value.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </div>
                        {isActive && (
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#fcd34d] opacity-50"></div>
                        )}
                        </div>
                    );
                 })}
               </div>

               {/* Logs-style Toolbar (Reused) */}
               <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="h-[32px] px-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 font-medium flex items-center gap-2 shadow-sm transition-colors">
                Last 30 days
                <CaretDown size={12} className="text-gray-400" />
              </button>
                <button className="h-[32px] px-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 font-medium flex items-center gap-2 shadow-sm transition-colors">
                <Funnel size={14} className="text-gray-500" />
                Filters
                <CaretDown size={12} className="text-gray-400" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400">
                  <MagnifyingGlass size={14} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search"
                  className="h-[32px] pl-8 pr-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 placeholder-gray-400 focus:border-[#004d40] focus:ring-1 focus:ring-[#004d40] transition-colors w-[220px] shadow-sm focus:outline-none"
                />
              </div>
              <button className="h-[32px] px-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 font-medium flex items-center gap-2 shadow-sm transition-colors">
                <DownloadSimple size={14} className="text-gray-500" />
                Export
              </button>
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
            <h1 className="text-2xl font-bold text-[#002b31]">Clients</h1>
          </div>
          {/* ... widgets ... */}
          <div className="flex gap-4 mb-6">
             <div className="relative overflow-hidden rounded-lg pl-4 pr-10 py-3.5 border flex items-center gap-4 min-w-[240px] shadow-sm bg-white border-gray-200">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-colors bg-gray-50 border border-gray-200 text-gray-500">
                   <CheckCircle size={20} weight="fill" className="opacity-80" />
                </div>
                <div className="flex flex-col z-10">
                   <span className="text-[12px] font-regular tracking-wide text-gray-600">Paying customers</span>
                   <span className="text-[16px] text-[#002b31] font-bold leading-none mt-1">19</span>
                </div>
             </div>
             <div className="relative overflow-hidden rounded-lg pl-4 pr-10 py-3.5 border flex items-center gap-4 min-w-[240px] shadow-sm bg-white border-gray-200">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-colors bg-gray-50 border border-gray-200 text-gray-500">
                   <Clock size={20} weight="fill" className="opacity-80" />
                </div>
                 <div className="flex flex-col z-10">
                   <span className="text-[12px] font-regular tracking-wide text-gray-600">MRR</span>
                   <span className="text-[16px] text-[#002b31] font-bold leading-none mt-1">€991.00</span>
                </div>
             </div>
          </div>
          {/* ... filter bar ... */}
          <div className="mb-2 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <button className="h-[32px] px-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 font-medium flex items-center gap-2 shadow-sm transition-colors">
                   All statuses
                   <CaretDown size={12} className="text-gray-400" />
                </button>
                <button className="h-[32px] px-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 font-medium flex items-center gap-2 shadow-sm transition-colors">
                   All countries
                   <CaretDown size={12} className="text-gray-400" />
                </button>
                <button className="h-[32px] px-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 font-medium flex items-center gap-2 shadow-sm transition-colors">
                   All plans
                   <CaretDown size={12} className="text-gray-400" />
                </button>
             </div>
             <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400">
                    <MagnifyingGlass size={14} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search clients..."
                    className="h-[32px] pl-8 pr-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 placeholder-gray-400 focus:border-[#004d40] focus:ring-1 focus:ring-[#004d40] transition-colors w-[200px] shadow-sm focus:outline-none"
                  />
                </div>
                <div className="h-4 w-px bg-gray-200 mx-1"></div>
                <button className="h-[32px] px-3 bg-[#fcd34d] hover:bg-[#fbbf24] border border-[#fbbf24] rounded text-[13px] text-[#002b31] font-bold flex items-center gap-2 shadow-sm transition-colors">
                   <Plus size={14} weight="bold" />
                   Invite client
                </button>
                <button className="h-[32px] px-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 font-medium flex items-center gap-2 shadow-sm transition-colors">
                   <Upload size={14} className="text-gray-500" />
                   Import Clients
                </button>
                <button className="h-[32px] px-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 font-medium flex items-center gap-2 shadow-sm transition-colors">
                   Invite with link
                </button>
             </div>
          </div>
          <ClientTable clients={MOCK_CLIENT_DATA} />
        </main>
      );
    }

    // Default Income View code repeated...
    return (
      <main className="flex-1 overflow-hidden flex flex-col px-6 py-4">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#002b31]">Income</h1>
          </div>
          {/* ... widgets ... */}
          <div className="flex gap-4 mb-6">
            <div 
              onClick={() => setFilterCategory(null)}
              className={`relative overflow-hidden rounded-lg pl-4 pr-10 py-3.5 border flex items-center gap-4 min-w-[240px] shadow-sm hover:shadow-md transition-all group cursor-pointer ${
                filterCategory === null 
                  ? 'bg-[#fffdf5] border-[#fcd34d] ring-1 ring-[#fcd34d]/50' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
               <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-colors ${
                 filterCategory === null ? 'bg-white border border-[#e6dac0] text-[#002b31]' : 'bg-gray-50 border border-gray-200 text-gray-500'
               }`}>
                  <Tray size={20} weight="fill" className={filterCategory === null ? "opacity-80" : "opacity-60"} />
               </div>
               <div className="flex flex-col z-10">
                  <span className={`text-[12px] font-regular tracking-wide transition-colors ${filterCategory === null ? 'text-black opacity-90' : 'text-gray-600'}`}>All income</span>
                  <span className="text-[16px] text-[#002b31] font-bold leading-none mt-1">€29,626.26</span>
               </div>
               {filterCategory === null && (
                 <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#fcd34d] opacity-50"></div>
               )}
            </div>
             <div 
               onClick={() => setFilterCategory('Business Income')}
               className={`relative overflow-hidden rounded-lg pl-4 pr-10 py-3.5 border flex items-center gap-4 min-w-[240px] shadow-sm hover:shadow-md transition-all group cursor-pointer ${
                 filterCategory === 'Business Income' 
                   ? 'bg-[#fffdf5] border-[#fcd34d] ring-1 ring-[#fcd34d]/50' 
                   : 'bg-white border-gray-200 hover:border-gray-300'
               }`}
             >
               <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-colors ${
                 filterCategory === 'Business Income' ? 'bg-white border border-[#e6dac0] text-[#002b31]' : 'bg-gray-50 border border-gray-200 text-gray-500'
               }`}>
                  <TrendUp size={20} weight="fill" className={filterCategory === 'Business Income' ? "opacity-80" : "opacity-60"} />
               </div>
               <div className="flex flex-col z-10">
                  <span className={`text-[12px] font-regular tracking-wide transition-colors ${filterCategory === 'Business Income' ? 'text-black opacity-90' : 'text-gray-600'}`}>Business income</span>
                  <span className="text-[16px] text-[#002b31] font-bold leading-none mt-1 ">€{totalBusinessIncome.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
               </div>
               {filterCategory === 'Business Income' && (
                 <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#fcd34d] opacity-50"></div>
               )}
            </div>
          </div>
          {/* ... toolbar ... */}
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="h-[32px] px-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 font-medium flex items-center gap-2 shadow-sm transition-colors">
                Last 30 days
                <CaretDown size={12} className="text-gray-400" />
              </button>
                <button className="h-[32px] px-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 font-medium flex items-center gap-2 shadow-sm transition-colors">
                <Funnel size={14} className="text-gray-500" />
                Filters
                <CaretDown size={12} className="text-gray-400" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400">
                  <MagnifyingGlass size={14} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search"
                  className="h-[32px] pl-8 pr-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 placeholder-gray-400 focus:border-[#004d40] focus:ring-1 focus:ring-[#004d40] transition-colors w-[220px] shadow-sm focus:outline-none"
                />
              </div>
              <button className="h-[32px] px-3 bg-white border border-gray-200 hover:border-gray-300 rounded text-[13px] text-gray-700 font-medium flex items-center gap-2 shadow-sm transition-colors">
                <DownloadSimple size={14} className="text-gray-500" />
                Export
              </button>
            </div>
          </div>
          <TransactionTable transactions={filteredTransactions} />
        </main>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar 
        activeItem={activeItem} 
        setActiveItem={setActiveItem} 
        onLogout={() => setIsAuthenticated(false)}
      />
      
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <TopHeader />
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
