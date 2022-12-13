import { Line } from "react-chartjs-2";
import s from "./Reports.module.scss";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const data = {
  labels: [
    "Red",
    "",
    "Blue",
    "",
    "Yellow",
    "",
    "Green",
    "",
    "Purple",
    "",
    "Orange",
    "",
  ],
  datasets: [
    {
      data: [8, 9, 7.8, 7.9, 6, 7, 8, 6, 5, 7.8, 5, 6],
      backgroundColor: "transparent",
      borderColor: "#f26c6d",
      pointBorderColor: "transparent",
      pointBorderWidth: 4,
      borderWidth: 3,
      tension: 0.5,
    },
  ],
};
const options = {
  plugins: { legend: false },
  scales: {
    x: {
      grid: { display: false },
    },
    y: {
      min: 2,
      max: 10,
      ticks: { stepSize: 2, callback: (value) => value + "00" },
    },
    grid: {
      borderDash: [10],
    },
  },
};
export default function LineChart() {
  return (
    <div className={s.LineChart}>
      <Line data={data} options={options} />
    </div>
  );
}
