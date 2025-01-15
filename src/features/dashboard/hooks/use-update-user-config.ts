import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateUserConfig } from '../actions/user';

const useUpdateUserConfig = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserConfig,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-config']
      });
      queryClient.invalidateQueries({
        queryKey: ['stats', 'transactions']
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

export default useUpdateUserConfig;
