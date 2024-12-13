import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Chart.js 컴포넌트 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StatusPage = () => {
  const data = {
    labels: ["Beginner", "Intermediate", "Advanced"],
    datasets: [
      {
        label: "운동 난이도별 분포",
        data: [5, 10, 2], // 예제 데이터
        backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"],
      },
    ],
  };

  return (
    <div>
      <h1>운동 통계</h1>
      <Bar data={data} />
    </div>
  );
};

export default StatusPage;
