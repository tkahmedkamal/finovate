'use client';

import { useFormStatus } from 'react-dom';
import { Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props extends Children {
  fullWidth?: boolean;
}

const SubmitButton = ({ fullWidth, children }: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className={cn(fullWidth && 'w-full')}>
      {pending ? (
        <>
          <Loader className="animate-spin" />
          Please wait
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
