import { AuthNavbar, AuthSidebar } from '@/features/auth/components';

const AuthLayout = ({ children }: Children) => {
  return (
    <>
      <AuthNavbar />
      <section className="flex h-screen">
        <div className="flex flex-1 flex-shrink-0 justify-center bg-card pt-20 xl:items-center xl:border-r xl:border-border">
          {children}
        </div>
        <AuthSidebar />
      </section>
    </>
  );
};

export default AuthLayout;
