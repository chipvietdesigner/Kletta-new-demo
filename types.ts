
export interface IncomeTransaction {
  id: string;
  date: string;
  customer: string;
  description?: string; // For sub-text like "Torstai Timma..."
  category: string;
  typeId: string;
  hasDocument: boolean;
  reference: string;
  reconciled: boolean;
  subtotal: number;
  taxRate: string;
  vat: number;
  totalAmount: number;
  isVerified: boolean;
  isAiVerified: boolean;
  // New fields for horizontal scroll
  paymentMethod: string;
  dueDate: string;
  project?: string;
  costCenter?: string;
  createdBy: string;
}

export interface ExpenseTransaction {
  id: string;
  date: string;
  customer: string;
  category: string;
  receipt: string;
  document: string | null;
  reconciled: boolean;
  subtotal: number;
  taxRate: string;
  vat: number;
  totalAmount: number;
  verified: boolean;
  aiVerified: boolean;
}

export interface BankTransaction {
  id: string;
  date: string;
  description: string;
  category: string;
  reconciled: boolean;
  reference: string;
  amount: number;
}

export interface VatReturn {
  id: string;
  email: string;
  companyName: string;
  firstName: string;
  lastName: string;
  utr: string;
  isUtrVerified: boolean;
  taxPeriod: string;
  edited: string;
}

export interface TaxReturnRow {
  id: string;
  sendStatus: 'SENT' | 'NOT SENT';
  email: string;
  companyName: string;
  firstName: string;
  lastName: string;
  plan: string;
  status: string;
  utr: string;
  isUtrVerified: boolean;
  year: number;
}

export interface Client {
  id: number;
  email: string;
  countryCode: string; // 'FI' or 'UK' for flag rendering
  plan: string;
  utr: string;
  isUtrVerified: boolean;
  isPrepaymentRegistered: boolean;
  companyName: string;
  firstName: string;
  lastName: string;
  phone: string;
  salesPerson: string;
  cardAddedDate: string;
  bankName: string;
  profession: string;
  city: string;
}

export interface DashboardData {
  kpi: {
    income: number;
    expenses: number;
    profit: number;
  };
  chart: {
    month: string;
    income: number;
    expenses: number;
    profit: number;
  }[];
}

export interface WelcomeSectionItem {
  title: string;
  description?: string;
  cta: string;
  secondary_cta?: string;
  image_url?: string;
  items?: string[]; // For list cards
}

export interface WelcomeData {
  sections: {
    get_started: WelcomeSectionItem[];
    quick_start: WelcomeSectionItem[];
    resources: WelcomeSectionItem[];
    support: WelcomeSectionItem[];
    community: WelcomeSectionItem[];
    newsletter: WelcomeSectionItem[];
  };
}

export enum NavItemType {
  WELCOME = 'Welcome',
  CHAT = 'Chat',
  ALL_CLIENTS = 'All clients',
  INVITATIONS = 'Invitations',
  ACCOUNT = 'Account',
  AI_SUPPORT = 'AI Support',
  TAX_RETURN = 'Tax return',
  DASHBOARD = 'Dashboard',
  TRANSACTIONS = 'Transactions',
  INCOME = 'Income',
  EXPENSES = 'Expenses',
  VAT_RETURNS = 'VAT Return',
  INVOICES = 'Invoices',
  REPORTS = 'Reports',
}
