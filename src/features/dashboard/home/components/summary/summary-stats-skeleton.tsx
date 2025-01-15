import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const SummaryStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex-horizontally gap-3">
              <Skeleton className="size-10" />
              <CardTitle className="flex flex-col gap-y-1.5">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-4 w-36" />
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-horizontally flex-wrap gap-3">
            <Skeleton className="h-9 w-[168px]" />
            <Skeleton className="h-[22px] w-[79px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryStatsSkeleton;
