import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";

import { Dividend } from "@/types/dividend.type";
import { generateChartData, getInitialChartOptions } from "@/utils/chart-utils";
import { ChartOptions } from "@/types/chart-options.type";
import DividendDataTables from "./dividend-data-tables";
import DividendChart from "./dividend-chart";
import DividendChartOptions from "./dividend-chart-options";
import { useDividends } from "@/hooks/queries/useDividends";
import DividendEditor from "../dividend-editor";
import { addDividend } from "@/services/dividend.service";
import { useStocks } from "@/hooks/queries/useStocks";
import { showSuccess } from "@/utils/notification-utils";
import { Button } from "../common/button";
import { Modal } from "../common/modal";
import { Spinner } from "../common/spinner";
import emptyStateImage from "../../public/empty-state.svg";

function DividendView() {
  const [chartOptions, setChartOptions] = useState<ChartOptions>(
    getInitialChartOptions()
  );

  const queryClient = useQueryClient();
  const { data: stocks } = useStocks();
  const {
    data: dividends,
    refetch: refetchDividends,
    isFetching,
  } = useDividends({
    country: chartOptions.country,
    startDate: chartOptions.startDateISO,
    endDate: chartOptions.endDateISO,
  });

  const [isDividendModalOpen, setDividendModalOpen] = useState(false);

  const chartData = useMemo(() => {
    if (!dividends) return null;
    return generateChartData(dividends, chartOptions);
  }, [dividends, chartOptions]);

  function handleChartOptionsChange(newOptions: Partial<ChartOptions>) {
    setChartOptions((prevState) => ({ ...prevState, ...newOptions }));
  }

  async function handleSaveDividend(dividend: Dividend) {
    await addDividend(dividend);
    setDividendModalOpen(false);
    refetchDividends();
    queryClient.invalidateQueries(["dividendsList"]);
    queryClient.invalidateQueries(["statistics"]);
    showSuccess("Dividend successfully inserted!");
  }

  if (!stocks) {
    return <LoadingState />;
  }

  return (
    <>
      <Button
        className="gap-2 w-full sm:w-auto"
        size="sm"
        onClick={() => setDividendModalOpen(true)}
      >
        <PlusIcon className="w-6 h-6" /> New Dividend
      </Button>

      <DividendChartOptions
        options={chartOptions}
        onChangeChartOptions={handleChartOptionsChange}
      />

      {dividends && dividends?.length === 0 ? (
        <DividendsEmptyState />
      ) : (
        <>
          {isFetching || !dividends || !chartData ? (
            <LoadingState />
          ) : (
            <>
              <DividendChart chartData={chartData} options={chartOptions} />
              <DividendDataTables
                dividendsByMonth={chartData.dividendsByMonth}
              />
            </>
          )}
        </>
      )}

      <Modal
        title="New Dividend"
        isOpen={isDividendModalOpen}
        onClose={() => setDividendModalOpen(false)}
      >
        <DividendEditor
          stocks={stocks}
          onClose={() => setDividendModalOpen(false)}
          onSave={handleSaveDividend}
        />
      </Modal>
    </>
  );
}

function LoadingState() {
  return (
    <div className="h-[400px] flex items-center justify-center">
      <Spinner />
    </div>
  );
}

function DividendsEmptyState() {
  return (
    <div className="h-[400px] flex flex-col items-center justify-center">
      <Image src={emptyStateImage} alt="Empty state" />
      <p className="text-gray-700">No dividends found</p>
    </div>
  );
}

export default DividendView;
