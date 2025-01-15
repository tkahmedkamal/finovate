import { QueryClientProvider } from '@/components';
import {
  DashboardHeader,
  DashboardSettingsBar,
  DashboardTabBar
} from '@/features/dashboard/components';

const DashboardLayout = ({ children }: Children) => {
  return (
    <QueryClientProvider>
      <section className="relative h-screen">
        <DashboardHeader />
        <DashboardSettingsBar />
        <div className="min-h-full px-4 pb-28 pt-[101px] sm:px-6 xl:pb-6">
          {children}
        </div>
        <DashboardTabBar />
      </section>
    </QueryClientProvider>
  );
};

export default DashboardLayout;
