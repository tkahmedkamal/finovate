import {
  ArrowUpDown,
  CircleDollarSignIcon,
  Layers2,
  LayoutGrid
} from 'lucide-react';

import { GetSummaryStatsResponse } from '@/app/api/stats/summary/route';

export const DASHBOARD_NAV_ItEMS = [
  {
    name: 'Dashboard',
    value: 'dashboard',
    href: '/',
    icon: LayoutGrid
  },
  {
    name: 'Transactions',
    value: 'transactions',
    href: '/transactions',
    icon: ArrowUpDown
  },
  {
    name: 'Categories',
    value: 'categories',
    href: '/categories',
    icon: Layers2
  },
  {
    name: 'Billing',
    value: 'billing',
    href: '/billing',
    icon: CircleDollarSignIcon
  }
] as const;

export const currencies = [
  {
    currency: 'EGP',
    label: 'Egyptian Pound',
    icon: '/images/egypt.png'
  },
  {
    currency: 'DZD',
    label: 'Algerian Dinar',
    icon: '/images/algeria.png'
  },
  {
    currency: 'JOD',
    label: 'Jordanian Dinar',
    icon: '/images/jordan.png'
  },
  {
    currency: 'BHD',
    label: 'Bahraini Dinar',
    icon: '/images/bahrain.png'
  },
  {
    currency: 'LBP',
    label: 'Lebanese Pound',
    icon: '/images/lebanon.png'
  },
  {
    currency: 'MAD',
    label: 'Moroccan Dirham',
    icon: '/images/morocco.png'
  },
  {
    currency: 'SSP',
    label: 'South Sudanese Pound',
    icon: '/images/south-sudan.png'
  },
  {
    currency: 'SDG',
    label: 'Sudanese Pound',
    icon: '/images/sudan.png'
  },
  {
    currency: 'LYD',
    label: 'Libyan Dinar',
    icon: '/images/libya.png'
  },
  {
    currency: 'IQD',
    label: 'Iraqi Dinar',
    icon: '/images/iraq.png'
  },
  {
    currency: 'SYP',
    label: 'Syrian Pound',
    icon: '/images/syria.png'
  },
  {
    currency: 'AED',
    label: 'United Arab Emirates Dirham',
    icon: '/images/united-arab-emirates.png'
  },
  {
    currency: 'ILS',
    label: 'Palestine',
    icon: '/images/palestine.png'
  },
  {
    currency: 'KWD',
    label: 'Kuwaiti Dinar',
    icon: '/images/kuwait.png'
  },
  {
    currency: 'OMR',
    label: 'Omani Rial',
    icon: '/images/oman.png'
  },
  {
    currency: 'QAR',
    label: 'Qatari Rial',
    icon: '/images/qatar.png'
  },
  {
    currency: 'SAR',
    label: 'Saudi Riyal',
    icon: '/images/saudi-arabia.png'
  },
  {
    currency: 'USD',
    label: 'Dollar',
    icon: '/images/united-states.png'
  }
];

export const timeZoneCurrencies = {
  'Africa/Cairo': 'EGP',
  'Africa/Algiers': 'DZD',
  'Africa/Amman': 'JOD',
  'Africa/Bahrain': 'BHD',
  'Africa/Casablanca': 'MAD',
  'Africa/Juba': 'SSP',
  'Africa/Khartoum': 'SDG',
  'Africa/Tripoli': 'LYD',
  'Asia/Baghdad': 'IQD',
  'Asia/Damascus': 'SYP',
  'Asia/Dubai': 'AED',
  'Asia/Gaza': 'ILS',
  'Asia/Kuwait': 'KWD',
  'Asia/Muscat': 'OMR',
  'Asia/Qatar': 'QAR',
  'Asia/Riyadh': 'SAR',
  'Asia/Beirut': 'LBP'
};

export const months = [
  {
    month: 0,
    name: 'January'
  },
  {
    month: 1,
    name: 'February'
  },
  {
    month: 2,
    name: 'March'
  },
  {
    month: 3,
    name: 'April'
  },
  {
    month: 4,
    name: 'May'
  },
  {
    month: 5,
    name: 'June'
  },
  {
    month: 6,
    name: 'July'
  },
  {
    month: 7,
    name: 'August'
  },
  {
    month: 8,
    name: 'September'
  },
  {
    month: 9,
    name: 'October'
  },
  {
    month: 10,
    name: 'November'
  },
  {
    month: 11,
    name: 'December'
  }
] as const;

export const MAX_DATE_RANGE_DAYS = 90;

export const INITIAL_SUMMARY_STATS: GetSummaryStatsResponse['data'] = {
  income: 0,
  expense: 0,
  prevMonthIncomePercentage: 0,
  prevMonthExpensePercentage: 0
};

export const PLAN_ITEMS = [
  {
    id: 'item-1',
    title: 'Access to download transaction reports in CSV format.'
  },
  {
    id: 'item-2',
    title: 'Unlimited category creation (2 categories in free plan).'
  },
  {
    id: 'item-3',
    title: 'Ability to change the currency.'
  }
];
