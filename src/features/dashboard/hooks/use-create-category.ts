import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createCategory } from '../actions/category';
import { CategorySchema } from '../schema/category-schema';

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CategorySchema) => {
      const res = await createCategory(data);

      if (!res.ok) {
        throw new Error(res.error);
      }

      return res.data;
    },

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
