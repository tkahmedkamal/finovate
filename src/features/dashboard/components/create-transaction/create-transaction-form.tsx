'use client';

import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon, CirclePlus } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
import { cn } from '@/lib/utils';
import { LoadingButton } from '@/components';
import useCreateTransaction from '@/features/dashboard/hooks/use-create-transaction';
import {
  transactionSchema,
  TransactionSchema
} from '@/features/dashboard/schema/transaction-schema';

import { useCategoriesData } from '../../hooks';
import { useAddModalStore } from '../../store';

const CreateTransactionForm = () => {
  const { mutate, isPending } = useCreateTransaction();
  const setOpen = useAddModalStore(state => state.setOpen);

  const form = useForm<TransactionSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: '',
      type: 'income',
      category: '',
      amount: 0,
      date: new Date()
    },
    mode: 'onSubmit'
  });

  const { control, handleSubmit, reset } = form;
  const { isSubmitting } = form.formState;
  const type = form.watch('type');

  const { data, isFetching } = useCategoriesData(type);
  const categories = data?.data || [];

  const onSubmit = (data: TransactionSchema) => {
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
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="amount">Amount</FormLabel>
                <FormControl>
                  <Input type="number" id="amount" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex-center gap-2">
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
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
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {!isFetching && categories.length > 0 ? (
                        categories?.map(({ id, name, icon }) => (
                          <SelectItem key={id} value={id}>
                            {icon} {name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-categories" disabled>
                          No categories found
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-1">
                <FormLabel htmlFor="date">Date</FormLabel>
                <Popover>
                  <PopoverTrigger id="date" asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
        Add Transaction
      </LoadingButton>
    </div>
  );
};

export default CreateTransactionForm;
