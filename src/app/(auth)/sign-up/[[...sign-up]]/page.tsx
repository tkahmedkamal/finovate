'use client';

import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

const SignUpPage = () => {
  const { theme } = useTheme();

  return (
    <SignUp
      appearance={{
        baseTheme: theme !== 'light' ? dark : undefined
      }}
    />
  );
};

export default SignUpPage;
