'use client';

import { useTheme } from 'next-themes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { CirclePlus, SquareDashedMousePointer } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Typography } from '@/components/ui/typography';
import {
  categorySchema,
  CategorySchema
} from '@/features/dashboard/schema/category-schema';
import { LoadingButton } from '@/components';

import { useCreateCategory } from '../../hooks';
import { useAddModalStore } from '../../store';

const CreateCategoryForm = () => {
  const { theme } = useTheme();
  const { mutate, isPending } = useCreateCategory();
  const setOpen = useAddModalStore(state => state.setOpen);

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'income',
      icon: ''
    },
    mode: 'all'
  });

  const { watch, control, handleSubmit, reset } = form;
  const { isSubmitting } = form.formState;

  const onSubmit = async (data: CategorySchema) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        setOpen(false);
      }
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    autoComplete="on"
                    placeholder="Ex: Salary, Rent, Food"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Input
                    id="description"
                    autoComplete="on"
                    placeholder="Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="type">Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="icon">Icon</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger id="icon" asChild>
                      <Button
                        variant="outline"
                        size="lg"
                        className="h-28 w-full border-dashed bg-background/50 hover:bg-background"
                      >
                        {watch('icon') ? (
                          <div className="space-y-2">
                            <Typography as="span" variant="h2">
                              {field.value}
                            </Typography>
                            <Typography variant="body2" color="muted">
                              Click to change icon
                            </Typography>
                          </div>
                        ) : (
                          <div className="flex-horizontally flex-col gap-y-2">
                            <SquareDashedMousePointer className="!size-6 text-muted-foreground" />
                            <Typography variant="body2" color="muted">
                              Click to select icon
                            </Typography>
                          </div>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                      <Picker
                        data={data}
                        theme={theme}
                        onEmojiSelect={({ native }: { native: string }) =>
                          field.onChange(native)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <LoadingButton
        isLoading={isPending || isSubmitting}
        loadingText="Creating"
        onClick={handleSubmit(onSubmit)}
      >
        <CirclePlus />
        Add Category
      </LoadingButton>
    </div>
  );
};

export default CreateCategoryForm;
