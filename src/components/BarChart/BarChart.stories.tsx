import { BarChart as BarChartComponent } from "./BarChart";

export default {
  component: BarChartComponent,
};

  
const dataset = [
  { date: "01/02/2023", earnings: 1 },
  { date: "02/02/2023", earnings: 31 },
  { date: "03/02/2023", earnings: 54 },
  { date: "04/02/2023", earnings: 3 },
  { date: "05/02/2023", earnings: 22 },
  { date: "06/02/2023", earnings: 11 },
  { date: "07/02/2023", earnings: 9 },
];

export const BarChart = () => <BarChartComponent dataset={dataset} />;
