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
  const [otherMetrics, setotherMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleChart = async () => {
      getSB(token, sprintID)
        .then((data) => {
          data = data.data;

          const labels = data.dayLabels;
          const openPoints = data.openPoints;
          const optimalPoints = data.optimalPoints;
          const completedTasks = data.completedTasks;
          const completedUS = data.completedUS;
          const totalTasks = data.totalTasks;
          const totalUS = data.totalUS;
          const AUC = data.AUC;
          const name = data.name;
          console.log(AUC, totalUS, totalTasks, completedTasks, completedUS)
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
          setotherMetrics({
            AUC,
            completedTasks,
            totalTasks,
            completedUS,
            totalUS,
            name
          })
          setIsLoading(false);
        })
        .catch(function (error) {
          setIsLoading(false);
          setHasError(true);
        });
    };

    handleChart();
  }, [token, sprintID]);

  const textStyle = {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 300,
    fontSize: "18px",
    color: "#4a4a4a",
    marginBottom: "8px",
  };

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
        <>
          <div style={{ margin: 25 }}>
            <Line
              data={SBChartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: otherMetrics.name,
                    font: {
                      size: 24, // Adjust the font size (in pixels) as desired
                      weight: "bold", // Set the font weight to bold
                    },
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ marginTop: 10 }}>
              <p style={textStyle}>
                Area Under Curve : <strong>{otherMetrics.AUC}</strong>
              </p>
              <p style={textStyle}>
                Total Tasks : <strong>{otherMetrics.totalTasks}</strong>
              </p>
              <p style={textStyle}>
                Completed Tasks : <strong>{otherMetrics.completedTasks}</strong>
              </p>
              <p style={textStyle}>
                Total User Stories : <strong>{otherMetrics.totalUS}</strong>
              </p>
              <p style={textStyle}>
                Completed User Stories :{" "}
                <strong>{otherMetrics.completedUS}</strong>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SBChart;
