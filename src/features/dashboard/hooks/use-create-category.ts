import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createCategory } from '../actions/category';

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories']
      });

      toast.success('Category created successfully', {
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

export default useCreateCategory;
