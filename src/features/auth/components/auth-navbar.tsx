import Link from 'next/link';

import { Logo, ModeToggle } from '@/components';

const AuthNavbar = () => {
  return (
    <nav className="flex-between fixed top-0 z-50 w-full bg-card/30 p-6 backdrop-blur-md xl:bg-transparent xl:backdrop-blur-0">
      <Link href="/sign-in">
        <Logo />
      </Link>
      <ModeToggle />
    </nav>
  );
};

export default AuthNavbar;
