import { cn } from '@/lib/utils';

const ChartStatsLegend = () => {
  return (
    <div className="flex-horizontally gap-6">
      {['income', 'expense'].map(type => (
        <div key={type} className="flex-horizontally gap-2 text-sm">
          <div
            className={cn(
              'size-[14px] rounded-sm',
              type === 'income' ? 'bg-primary' : 'bg-third'
            )}
          />
          {type}
        </div>
      ))}
    </div>
  );
};

export default ChartStatsLegend;
