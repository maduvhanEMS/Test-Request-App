import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { lineGraphData } from "../../Assets/Data/GraphData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip
);

const options = {
  rensposive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: true,
      text: "Shots per Vessel",
    },
  },
};

const BarPlot = ({ data }) => {
  return <Bar data={data} options={options} />;
};

export default BarPlot;
