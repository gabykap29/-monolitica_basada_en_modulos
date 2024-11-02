import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

export const GraficoReports = ({reports}) => {
  // Se registran los elementos para Chart.js
  ChartJS.register(ArcElement, Tooltip, Legend);
  // Para realizar el gráfico
  const reportTypes = ["Notificado de faltas", "Notificado de estado libre"];
  const reportCounts = reportTypes.map(
    (type) => reports.filter((report) => report.typeReport === type).length
  );

  const data = {
    labels: reportTypes,
    datasets: [
      {
        data: reportCounts,
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };
  return (
    <div className="d-flex justify-content-center d-none d-lg-block" style={{ width: "250px", height: "250px" }}>
        <Doughnut data={data} />
    </div>
  )
}
