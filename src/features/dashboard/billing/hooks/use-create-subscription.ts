import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { createSubscription } from '../actions';

const useCreateSubscription = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: createSubscription,

    onSuccess: (data: string) => {
      router.push(data);
    },
    onError: error => {
      toast.error(error.message, {
        richColors: true
      });
    }
  });

  return { mutate, isPending };
};

export default useCreateSubscription;
