import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createTransaction } from '../actions/transactions';
import { TransactionSchema } from '../schema/transaction-schema';

const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: TransactionSchema) => {
      const res = await createTransaction(data);

      if (!res.ok) {
        throw new Error(res.error);
      }

      return res.data;
    },

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
