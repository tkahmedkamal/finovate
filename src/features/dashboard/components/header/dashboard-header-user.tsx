import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

const DashboardHeaderUser = () => {
  return (
    <div className="flex-center size-10">
      <ClerkLoading>
        <Loader2 size={14} className="animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton
          appearance={{
            elements: {
              button: 'rounded-md',
              avatarBox: 'size-10 rounded-md'
            }
          }}
        />
      </ClerkLoaded>
    </div>
  );
};

export default DashboardHeaderUser;
