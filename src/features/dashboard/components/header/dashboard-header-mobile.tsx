import Link from 'next/link';

import { Logo, ModeToggle } from '@/components';

import DashboardHeaderUser from './dashboard-header-user';

const DashboardHeaderMobile = () => {
  return (
    <header className="fixed top-0 z-50 h-[77px] w-full border-b bg-card px-4 sm:px-6">
      <div className="flex-between size-full">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex-center gap-2">
          <ModeToggle />
          <DashboardHeaderUser />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeaderMobile;
