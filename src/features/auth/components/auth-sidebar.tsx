import { Typography } from '@/components/ui/typography';

const AuthSidebar = () => {
  return (
    <aside className="xl:flex-center hidden flex-1 flex-shrink basis-1/4 flex-col px-5">
      <div className="max-w-lg space-y-4">
        <Typography as="h1" variant="h1" weight="bold">
          Start now and achieve your financial goals with confidence.
        </Typography>
        <Typography variant="h5" color="muted">
          Create an account now or log in to track your expenses and access
          comprehensive financial reports to achieve your goals with confidence.
        </Typography>
      </div>
    </aside>
  );
};

export default AuthSidebar;
