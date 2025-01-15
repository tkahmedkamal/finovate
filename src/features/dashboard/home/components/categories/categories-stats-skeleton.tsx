import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const CategoriesStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index} className="h-full">
          <CardHeader>
            <div className="flex-horizontally gap-3">
              <Skeleton className="size-10 rounded-lg" />
              <Skeleton className="h-7 w-40 rounded-lg" />
            </div>
          </CardHeader>
          <CardContent>
            {Array.from({ length: 3 }).map((_, itemIndex) => (
              <div key={itemIndex} className="mb-6 flex flex-col gap-y-3">
                <div className="flex-between">
                  <div className="flex-horizontally gap-3">
                    <Skeleton className="size-10 rounded-lg" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </div>
                  <Skeleton className="h-[18px] w-[87px]" />
                </div>
                <Skeleton className="h-[6px] w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CategoriesStatsSkeleton;
