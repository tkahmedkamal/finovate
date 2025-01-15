import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateUserConfig } from '../actions/user';
import { UserConfigSchema } from '../schema/user-config-schema';

const useUpdateUserConfig = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UserConfigSchema) => {
      const res = await updateUserConfig(data);

      if (!res.ok) {
        throw new Error(res.error);
      }

      return res.data;
    },

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
