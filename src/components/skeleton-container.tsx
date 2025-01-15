import { Skeleton } from './ui/skeleton';

interface Props extends Children {
  isLoading: boolean;
}

const SkeletonContainer = ({ isLoading, children }: Props) => {
  if (!isLoading) {
    return children;
  }

  return (
    <Skeleton>
      <div className="opacity-0">{children}</div>
    </Skeleton>
  );
};

export default SkeletonContainer;
