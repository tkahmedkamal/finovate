import { download, generateCsv, mkConfig } from 'export-to-csv';
import { toast } from 'sonner';
import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SkeletonContainer } from '@/components';

import { useTransactionReportData } from '../hooks';

const TransactionsCsv = () => {
  const { data, isFetching } = useTransactionReportData();

  const transactionsReport = data?.data ?? [];

  const onClick = () => {
    if (data?.error) {
      toast.error(data.error, {
        richColors: true
      });
      return;
    }

    const csvConfig = mkConfig({
      useKeysAsHeaders: true,
      filename: 'finovate-transactions-report'
    });

    const exportData =
      transactionsReport?.map(transaction => ({
        category: transaction.category,
        description: transaction.description,
        date: transaction.date,
        type: transaction.type,
        amount: transaction.amount
      })) || [];

    if (exportData.length == 0) {
      toast.error('No data to export', {
        richColors: true
      });
      return;
    }

    download(csvConfig)(generateCsv(csvConfig)(exportData));
  };

  return (
    <SkeletonContainer isLoading={isFetching}>
      <Button onClick={onClick}>
        <Download />
        Download CSV
      </Button>
    </SkeletonContainer>
  );
};

export default TransactionsCsv;
