import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createTransaction } from '../actions/transactions';

const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createTransaction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['stats']
      });

      toast.success('Transactions created successfully', {
        richColors: true
      });
    },

    onError: error => {
      toast.error(error.message, {
        richColors: true
      });
    }
  });

  return { mutate, isPending };
};

export default useCreateTransaction;
