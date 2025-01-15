'use client';

import { useState } from 'react';
import Link from 'next/link';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { currencies } from '@/lib/constants';
import { Button } from '@/components/ui/button';

import { useSubscription, useUpdateUserConfig } from '../hooks';
import Image from 'next/image';

interface Props {
  currency: string;
}

const SelectCurrencies = ({ currency }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useUpdateUserConfig();
  const { data } = useSubscription();

  const isSubscribed = data?.data && data?.data.status === 'active';

  const onChange = (value: string) => {
    mutate({ currency: value });
  };

  return (
    <Select
      onValueChange={onChange}
      defaultValue={currency}
      disabled={isPending}
      open={open}
      onOpenChange={setOpen}
    >
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select Currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map(({ currency, label, icon }) => {
          const disabled = !isSubscribed && currency !== 'EGP';
          return (
            <SelectItem key={currency} value={currency} disabled={disabled}>
              <span className="flex-horizontally gap-1.5 overflow-hidden truncate">
                <Image src={icon} width={16} height={16} alt={label} />
                {label}
              </span>
            </SelectItem>
          );
        })}

        {!isSubscribed && (
          <Button
            asChild
            className="fixed bottom-0 left-0 w-full"
            onClick={() => setOpen(false)}
          >
            <Link href="/billing">Subscribe Now</Link>
          </Button>
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectCurrencies;
