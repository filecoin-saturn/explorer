import { Chart as BarChartJS } from "react-chartjs-2";
import type { ChartData, ChartArea } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useRef, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type BarChartDataPoint = {
  date: string;
  earnings: number;
};

export const BarChart = ({ dataset }: { dataset: BarChartDataPoint[] }) => {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    datasets: [],
  });

  const gradientBackground = (
    ctx: CanvasRenderingContext2D,
    area: ChartArea
  ) => {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, "#0097C7");
    gradient.addColorStop(1, "#10FFD4");
    return gradient;
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }

    const data = {
      labels: dataset.map((o) => o.date),
      datasets: [
        {
          label: "Earnings",
          data: dataset.map((o) => o.earnings),
          backgroundColor: gradientBackground(chart.ctx, chart.chartArea),
          barPercentage: 0.9,
          categoryPercentage: 1,
        },
      ],
    };
    setChartData(data);
  }, [dataset]);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        displayColors: false,
        backgroundColor: "rgba(255,255,255,0.1)",
        borderColor: "rgba(255,255,255,0.8)",
        borderWidth: 0.5,
        padding: 8,
        bodyFont: {
            family: "'Space Grotesk', sans-serif;",
        },
      },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };
  return (
    <BarChartJS ref={chartRef} type="bar" data={chartData} options={options} />
  );
};

export default BarChart;
