import { Typography } from './ui/typography';

const EmptyMessage = () => {
  return (
    <div className="text-center">
      <Typography as="h3" variant="h5" weight="bold">
        No Results
      </Typography>
      <Typography color="muted">
        No data found to display at the moment.
      </Typography>
    </div>
  );
};

export default EmptyMessage;
