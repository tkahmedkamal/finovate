import { FrownIcon } from 'lucide-react';

import { Card, CardHeader, CardTitle } from './ui/card';
import { Typography } from './ui/typography';

interface Props {
  message: string;
}

const ErrorMessage = ({ message }: Props) => {
  return (
    <Card className="w-full sm:max-w-lg">
      <CardHeader className="flex-center gap-4">
        <div className="flex-center size-20 rounded-full bg-destructive/5 text-destructive-foreground-hard">
          <FrownIcon size={48} />
        </div>
        <div className="space-y-2 text-center">
          <CardTitle>Error!</CardTitle>
          <Typography color="muted" variant="h5">
            {message}
          </Typography>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ErrorMessage;
