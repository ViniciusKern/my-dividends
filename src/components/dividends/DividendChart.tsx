import ReactApexChart from 'react-apexcharts';

import { Dividend } from '../../types/dividends.type';
import { generateChartData } from '../../utils/chartUtils';

type Props = {
  dividends: Dividend[];
  startDate: Date;
  endDate: Date;
};

export default function DividendChart({ dividends, startDate, endDate }: Props) {
  const currency = dividends[0].currency;
  const chartValues = generateChartData(dividends, startDate, endDate);

  const series: ApexAxisChartSeries = [
    {
      name: 'Dividends',
      data: chartValues.values,
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 390,
    },
    dataLabels: {
      formatter: (value: number) => value.toFixed(2),
    },
    xaxis: {
      labels: {
        formatter: (month: string) => month.substring(0, 3),
      },
      group: {
        style: {
          fontSize: '10px',
          fontWeight: 700,
        },
        groups: Array.from(chartValues.groups, ([key, value]) => ({
          title: String(key),
          cols: value,
        })),
      },
    },
    yaxis: {
      title: { text: currency },
    },
    tooltip: {
      y: {
        formatter: (cashAmount: number) => `${currency} ${cashAmount.toFixed(2)}`,
      },
    },
  };

  return (
    <div id='chart'>
      <ReactApexChart options={options} series={series} type='bar' height={400} />
    </div>
  );
}
