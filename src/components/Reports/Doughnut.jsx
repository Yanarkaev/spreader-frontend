import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ item }) {
  const data = {
    labels: ["Новые", "В работе", "Выполнено"],
    datasets: [
      {
        label: "# of Votes",
        data: [item.new, item.inWork, item.closed],
        backgroundColor: ["#109CF1", "#FFB946", "#2ED47A"],

        borderWidth: 0,
        weight: 1,
      },
    ],
  };

  return <Pie data={data} />;
}

export default DoughnutChart;
