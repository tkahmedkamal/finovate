import { ClerkProvider } from '@clerk/nextjs';

const AuthProvider = ({ children }: Children) => {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true
        },
        elements: {
          formButtonPrimary:
            'bg-primary text-primary-foreground !shadow-none py-[11px] hover:bg-primary/90',
          input: 'py-5 bg-card',
          card: 'bg-card rounded-none',
          cardBox: '!shadow-none',
          socialButtonsBlockButton: 'py-[11px]',
          alertText_danger: 'text-destructive',
          alertText__warning: 'text-third'
        }
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default AuthProvider;
