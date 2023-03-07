import "./index.css";
import { Chart as C } from "react-chartjs-2";
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

type ChartProps = {};

export const Chart = ( {} : ChartProps) => {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    datasets: [],
  });

  const gradient = (ctx: CanvasRenderingContext2D, area: ChartArea) => {
    const g = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    g.addColorStop(0, "#0097C7");
    g.addColorStop(1, "#10FFD4");
    return g;
  };
  
  const dataset = [
    { day: "01/02/2023", earns: 1 },
    { day: "02/02/2023", earns: 31 },
    { day: "03/02/2023", earns: 54 },
    { day: "04/02/2023", earns: 3 },
    { day: "05/02/2023", earns: 22 },
    { day: "06/02/2023", earns: 11 },
  ];


  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }

    const data = {
      labels: dataset.map((o) => o.day.toString()),
      datasets: [
        {
          label: "earns",
          data: dataset.map((o) => o.earns),
          backgroundColor: gradient(chart.ctx, chart.chartArea),
        },
      ],
    };
    setChartData(data);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      xAxes: [{
          barThickness: 6,  // number (pixels) or 'flex'
          maxBarThickness: 8 // number (pixels)
      }],
      x: {
        barThickness: 0.4,
        display: false,
      },
      y: {
        display: false,
      },
    }
  };
  return <C ref={chartRef} type='bar' data={chartData} options={options} />;
};

export default Chart;
