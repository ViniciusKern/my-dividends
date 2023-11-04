import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

import { ChartData, ChartOptions } from "@/types/chart-options.type";

interface DividendChartProps {
  chartData: ChartData;
  options: ChartOptions;
}

function DividendChart({ chartData, options }: DividendChartProps) {
  const currency = options.country === "US" ? "U$" : "R$";

  const series: ApexAxisChartSeries = [
    {
      name: "Dividends",
      data: chartData.values,
      color: "#099268",
    },
  ];

  const apexOptions: ApexCharts.ApexOptions = {
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
          fontSize: "10px",
          fontWeight: 700,
        },
        groups: Array.from(chartData.groups, ([key, value]) => ({
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
        formatter: (cashAmount: number) =>
          `${currency} ${cashAmount.toFixed(2)}`,
      },
    },
  };

  return (
    <div id="chart">
      <Chart options={apexOptions} series={series} type="bar" height={400} />
    </div>
  );
}

export default DividendChart;
