import { useState } from "react";
import { DatesRangeValue, MonthPickerInput } from "@mantine/dates";

import { ChartOptions } from "@/types/chart-options.type";
import SegmentedControl from "../common/segmented-control";
import { formatDateToISO } from "@/utils/date-utils";

interface DividendChartOptionsProps {
  options: ChartOptions;
  onChangeChartOptions: (options: Partial<ChartOptions>) => void;
}

function DividendChartOptions({
  options,
  onChangeChartOptions,
}: DividendChartOptionsProps) {
  const [country, setCountry] = useState<ChartOptions["country"]>(
    options.country
  );
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    options.startDate,
    options.endDate,
  ]);

  function handleDateRangeChange(range: DatesRangeValue) {
    setDateRange(range);
    const [startDate, endDate] = range;

    if (startDate && endDate) {
      onChangeChartOptions({
        startDate,
        endDate,
        startDateISO: formatDateToISO(startDate),
        endDateISO: formatDateToISO(endDate),
      });
    }
  }

  function handleCountryChange(value: string) {
    const newCountryValue = value as ChartOptions["country"];
    setCountry(newCountryValue);
    onChangeChartOptions({
      country: newCountryValue,
    });
  }

  return (
    <div className="my-4 flex flex-col gap-4 sm:gap-12 sm:flex-row  ">
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm">Period:</span>
        <MonthPickerInput
          type="range"
          valueFormat="MM/YYYY"
          value={dateRange}
          onChange={handleDateRangeChange}
          maw={160}
        />
      </div>

      <SegmentedControl
        value={country}
        onChange={handleCountryChange}
        options={[
          { label: "Consolidated 💲", value: "all" },
          { label: "BR 🇧🇷", value: "BR" },
          { label: "US 🇺🇸", value: "US" },
        ]}
      />
    </div>
  );
}

export default DividendChartOptions;
