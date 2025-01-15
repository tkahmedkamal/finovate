import { ChartNoAxesCombined } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

import {
  ChartStatsView,
  ChartStatsPeriodTabs,
  ChartStatsLegend,
  ChartStatsSelector
} from './';

const ChartStatsCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex-between flex-wrap">
          <div className="flex-horizontally gap-3">
            <span className="flex-center size-10 shrink-0 rounded-lg bg-primary/5 text-primary">
              <ChartNoAxesCombined />
            </span>
            <CardTitle className="flex flex-col">
              <Typography as="h2" variant="h5" weight="semibold">
                Statistics
              </Typography>
            </CardTitle>
          </div>
          <div className="flex-horizontally flex-wrap gap-3 sm:gap-6">
            <ChartStatsPeriodTabs />
            <ChartStatsSelector />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartStatsView />
      </CardContent>
      <CardFooter className="flex-center">
        <ChartStatsLegend />
      </CardFooter>
    </Card>
  );
};

export default ChartStatsCard;
