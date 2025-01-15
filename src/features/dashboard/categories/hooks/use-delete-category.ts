import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteCategory } from '../actions/category';

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteCategory(id);

      if (!res.ok) {
        throw new Error(res.error);
      }

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories']
      });

      queryClient.invalidateQueries({
        queryKey: ['stats']
      });

      toast.success('Categories deleted successfully', {
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

export default useDeleteCategory;
