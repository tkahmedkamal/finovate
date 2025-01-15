'use client';

import { Wallet, TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { formatCurrency, formatDateRange } from '@/lib/helpers';
import { useUserConfig } from '@/features/dashboard/hooks';

import { useDateRangeStore } from '../../../store';

type StatType = TransactionType | 'balance';
type StatVariant =
  | 'default'
  | 'success'
  | 'destructive'
  | 'secondary'
  | 'third'
  | 'outline';

interface Props {
  type: StatType;
  amount: number;
  statusValue?: number;
}

interface StatConfig {
  icon: LucideIcon;
  title: string;
}

const STAT_CONFIG: Record<StatType, StatConfig> = {
  balance: {
    icon: Wallet,
    title: 'Balance'
  },
  income: {
    icon: TrendingUp,
    title: 'Income'
  },
  expense: {
    icon: TrendingDown,
    title: 'Expense'
  }
};

const getBalanceTitle = (amount: number): string => {
  if (amount > 0) return 'Saving';
  if (amount === 0) return 'Balance';
  return 'Over Spending';
};

const getStatusColor = (type: StatType, value: number): StatVariant => {
  if (value === 0) return 'outline';

  const isPositiveGood = type === 'balance' || type === 'income';
  return value > 0
    ? isPositiveGood
      ? 'success'
      : 'destructive'
    : isPositiveGood
      ? 'destructive'
      : 'success';
};

const SummaryStatsCard = ({ type, amount, statusValue = 0 }: Props) => {
  const { data } = useUserConfig();
  const from = useDateRangeStore(state => state.from);
  const to = useDateRangeStore(state => state.to);
  const { currency = 'EGP' } = data?.data || {};

  const { icon: IconComponent, title } = STAT_CONFIG[type];
  const StatusIconComponent = statusValue >= 1 ? TrendingUp : TrendingDown;
  const formattedAmount = formatCurrency(currency).format(amount);
  const statusColor = getStatusColor(
    type,
    type === 'balance' ? amount : statusValue
  );
  const dateRange = formatDateRange(from, to);

  return (
    <Card>
      <CardHeader>
        <div className="flex-horizontally gap-3">
          <span className="flex-center size-10 shrink-0 rounded-lg bg-primary/5 text-primary">
            <IconComponent />
          </span>
          <CardTitle className="flex flex-col space-y-1.5">
            <Typography as="h2" variant="h5" weight="semibold">
              Total {title}
            </Typography>
            <Typography as="span" variant="body2" color="muted">
              {dateRange}
            </Typography>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-horizontally flex-wrap gap-3">
        <Typography as="div" variant="h2" weight="medium">
          {formattedAmount}
        </Typography>
        <Badge className="gap-x-1" variant={statusColor}>
          {type === 'balance' ? (
            getBalanceTitle(amount)
          ) : (
            <>
              {statusValue !== 0 ? `${statusValue}%` : '-'}
              {statusValue !== 0 && (
                <StatusIconComponent size={14} strokeWidth={3} />
              )}
            </>
          )}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default SummaryStatsCard;
