import { Loader } from 'lucide-react';

import { Button } from './ui/button';

interface Props extends Children {
  isLoading: boolean;
  loadingText: string;
  isDestructive?: boolean;
  onClick?: () => void;
}

const LoadingButton = ({
  isLoading,
  loadingText,
  children,
  isDestructive,
  onClick
}: Props) => {
  return (
    <Button
      variant={isDestructive ? 'destructive' : 'default'}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <Loader className="animate-spin" />
          {loadingText}...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
