import { Grid2X2Plus } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

import { CreateCategoryForm } from './';

const CreateCategoryCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex-horizontally gap-3">
          <span className="flex-center size-10 shrink-0 rounded-lg bg-primary/5 text-primary">
            <Grid2X2Plus />
          </span>
          <CardTitle className="flex flex-col">
            <Typography as="h2" variant="h5" weight="semibold">
              Create Category
            </Typography>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <CreateCategoryForm />
      </CardContent>
    </Card>
  );
};

export default CreateCategoryCard;
