import { useMemo, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Button, Center, Loader, Modal } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { Plus } from 'tabler-icons-react';

import { Dividend } from '@/types/dividend.type';
import { generateChartData, getInitialChartOptions } from '@/utils/chart-utils';
import { ChartOptions } from '@/types/chart-options.type';
import DividendDataTables from './dividend-data-tables';
import DividendChart from './dividend-chart';
import DividendChartOptions from './dividend-chart-options';
import { useDividends } from '@/hooks/queries/useDividends';
import DividendEditor from '../dividend-editor';
import { addDividend } from '@/services/dividend.service';
import { useStocks } from '@/hooks/queries/useStocks';
import { showSuccess } from '@/utils/notification-utils';

function DividendView() {
  const [chartOptions, setChartOptions] = useState<ChartOptions>(getInitialChartOptions());

  const queryClient = useQueryClient();
  const { data: stocks } = useStocks();
  const { data: dividends, refetch: refetchDividends } = useDividends({
    country: chartOptions.country,
    startDate: chartOptions.startDate,
    endDate: chartOptions.endDate,
  });

  const [isDividendModalOpen, { open: openDividendModal, close: closeDividendModal }] =
    useDisclosure(false);

  const chartData = useMemo(() => {
    if (!dividends) return null;
    return generateChartData(dividends, chartOptions);
  }, [dividends, chartOptions]);

  function handleChartOptionsChange(newOptions: Partial<ChartOptions>) {
    setChartOptions(prevState => ({ ...prevState, ...newOptions }));
  }

  async function handleSaveDividend(dividend: Dividend) {
    await addDividend(dividend);
    closeDividendModal();
    refetchDividends();
    queryClient.invalidateQueries(['statistics']);
    showSuccess('Dividendo inserido com sucesso!');
  }

  if (!stocks || !dividends || !chartData) {
    return (
      <Center h={500}>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <Button variant='light' leftIcon={<Plus />} onClick={openDividendModal}>
        Novo Dividendo
      </Button>

      <DividendChartOptions
        options={chartOptions}
        onChangeChartOptions={handleChartOptionsChange}
      />
      <DividendChart chartData={chartData} options={chartOptions} />
      <DividendDataTables dividendsByMonth={chartData.dividendsByMonth} />

      <Modal
        opened={isDividendModalOpen}
        onClose={closeDividendModal}
        size='md'
        withCloseButton={false}
      >
        <DividendEditor stocks={stocks} onClose={closeDividendModal} onSave={handleSaveDividend} />
      </Modal>
    </>
  );
}

export default DividendView;
