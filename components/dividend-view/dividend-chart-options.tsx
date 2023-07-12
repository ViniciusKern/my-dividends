import { useState } from 'react';
import { Group, SegmentedControl, Text, createStyles } from '@mantine/core';
import { DatesRangeValue, MonthPickerInput } from '@mantine/dates';

import { ChartOptions } from '@/types/chart-options.type';

type Props = {
  options: ChartOptions;
  onChangeChartOptions: (options: Partial<ChartOptions>) => void;
};

function DividendChartOptions({ options, onChangeChartOptions }: Props) {
  const { classes } = useStyles();
  const [country, setCountry] = useState<ChartOptions['country']>(options.country);
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
      });
    }
  }

  function handleCountryChange(value: string) {
    const newCountryValue = value as ChartOptions['country'];
    setCountry(newCountryValue);
    onChangeChartOptions({
      country: newCountryValue,
    });
  }

  return (
    <div className={classes.container}>
      <Group spacing={'xs'}>
        <Text fz='sm'>Período:</Text>
        <MonthPickerInput
          type='range'
          valueFormat='MM/YYYY'
          value={dateRange}
          onChange={handleDateRangeChange}
          maw={160}
        />
      </Group>

      <SegmentedControl
        value={country}
        onChange={handleCountryChange}
        data={[
          { label: 'Consolidado 💲', value: 'all' },
          { label: 'BR 🇧🇷', value: 'BR' },
          { label: 'US 🇺🇸', value: 'US' },
        ]}
      />
    </div>
  );
}

const useStyles = createStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '48px',
    alignItems: 'center',
    paddingTop: theme.spacing.lg,
    paddingLeft: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
}));

export default DividendChartOptions;
