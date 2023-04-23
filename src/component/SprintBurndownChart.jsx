import React, { useEffect, useRef, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getSB } from "../apis";
import { useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import Cookies from "js-cookie";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


function SBChart() {
  const { sprintID } = useParams();
  const token = Cookies.get("token");
  const [SBChartData, setSBChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleChart = async () => {
      getSB(token, sprintID)
        .then((data) => {
          data = data.data;
          console.log('data return', data)
          const labels = data.dayLabels;
          const openPoints = data.openPoints;
          const optimalPoints = data.optimalPoints;
          console.log(labels,openPoints,optimalPoints);
          const datasets = [
                            {
                                label: 'Actual',
                                data: openPoints,
                                fill: true,
                                backgroundColor: 'rgba(75,192,192,0.5)',
                                borderColor: 'rgba(75,192,192,1)',
                                borderWidth: 2,
                                tension: 0.4,
                            },
                            {
                                label: 'Optimal',
                                data: optimalPoints,
                                fill: true,
                                backgroundColor: 'rgba(255,99,132,0.2)',
                                borderColor: 'rgba(255,99,132,1)',
                                borderWidth: 2,
                                tension: 0.4,
                            },
                            ]

          setSBChartData({ labels, datasets });
          setIsLoading(false);
        })
        .catch(function (error) {
          setIsLoading(false);
          setHasError(true);
        });
    };

    handleChart();
  }, [token, sprintID]);

  return (
    <div>
      {hasError ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#8C1C3F",
              color: "#fff",
              borderRadius: "4px",
              maxWidth: "80vw",
              textAlign: "center",
            }}
          >
            There was an error fetching the SB data. Please refresh the page or
            check your network.
          </div>
        </div>
      ) : isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <PuffLoader color="#3f51b5" size={150} />
        </div>
      ) : (
        <div style={{ margin: 25 }}>
          <Line
            data={SBChartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Sprint Burndown Chart",
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
            height={300}
            width={1000}
          />
        </div>
      )}
    </div>
  );
}

export default SBChart;
