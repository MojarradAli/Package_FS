import { Chart } from "chart.js";
import h337 from "heatmapjs";
import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";
import axios from "axios";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart - Multi Axis",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = [1, "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      yAxisID: "y",
    },
    {
      label: "Dataset 2",
      data: [
        5, 8, 9, 15, 15, 16, 17, 18, 19, 110, 11, 12, 13, 14, 15, 16, 17, 18,
        19, 20,
      ],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      yAxisID: "y1",
    },
  ],
};
function App() {
  useEffect(() => {
    var heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: document.querySelector(".App"),
    });
    // now generate some random data
    var points = [];
    var max = 0;
    var width = 840;
    var height = 630;
    var len = 200;

    while (len--) {
      var val = Math.floor(Math.random() * 100);
      max = Math.max(max, val);
      var point = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        value: val,
      };
      points.push(point);
    }
    // heatmap data format
    var data = {
      max: max,
      data: points,
    };
    // if you have a set of datapoints always use setData instead of addData
    // for data initialization
    heatmapInstance.setData(data);
  });
  const [filter, setFilter] = useState("");
  const [instances, setInstancesByCount] = useState([]);
  const [timeRange, setTimeRange] = useState([]);
  const [instancesByPositions, setInstancesByPositions] = useState([]);
  useEffect(() => {
    axios
      .get("instances/byCount")
      .then((res) => setInstancesByCount(res.data.data));
  }, []);
  useEffect(() => {
    axios.get("timeRange").then((res) => setTimeRange(res.data.data));
  }, []);
  useEffect(() => {
    axios
      .get("instances/byPositions")
      .then((res) => setInstancesByPositions(res.data.data));
  }, []);
  return (
    <>
      <div className="App">
        <Line
          options={options}
          data={data}
          style={{ position: "absolute", zIndex: "10" }}
        />
      </div>
      <div className="dropdown">
        <select>
          <option>Number of human</option>
          <option>x position of human</option>
        </select>
      </div>
    </>
  );
}

export default App;
