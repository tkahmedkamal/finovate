'use client';

import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

const SignInPage = () => {
  const { theme } = useTheme();

  return (
    <SignIn
      appearance={{
        baseTheme: theme !== 'light' ? dark : undefined
      }}
    />
  );
};

export default SignInPage;
