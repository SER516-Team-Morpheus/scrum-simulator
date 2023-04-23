import React, { useEffect, useRef, useState } from "react"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js"
import { Line } from "react-chartjs-2"
import { getCFD } from "../apis"
import { useLocation, useParams } from "react-router-dom"
import { PuffLoader } from "react-spinners"
import Cookies from "js-cookie"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function getColor(i, type){
  const rgba = {
    0: {
      background: "rgba(245, 229, 27, 0.5)",
      border: "rgba(245, 229, 27, 1)",
    },
    1: {
      background: "rgba(22, 69, 62, 0.5)",
      border: "rgba(22, 69, 62, 1)",
    },
    2: {
      background: "rgba(189, 155, 25, 0.5)",
      border: "rgba(189, 155, 25, 1)",
    },
    3: {
      background: "rgba(44, 130, 201, 0.5)",
      border: "rgba(44, 130, 201, 1)",
    },
    4: {
      background: "rgba(30, 130, 76, 0.5)",
      border: "rgba(30, 130, 76, 1)",
    },
    5: {
      background: "rgba(214, 69, 65, 0.5)",
      border: "rgba(214, 69, 65, 1)",
    },
    6: {
      background: "rgba(57, 46, 74, 0.5)",
      border: "rgba(57, 46, 74, 1)",
    },
    7: {
      background: "rgba(130, 94, 92, 0.5)",
      border: "rgba(130, 94, 92, 1)",
    },
  };
  if (i > 7){
    i = i%7
  }
    return rgba[i][type]
}

function CfdDiagram() {
  const chartRef = useRef()
  const { projectId } = useParams()
  const token = Cookies.get("token")
  const [cfdChartData, setcfdChartData] = useState(null)
  const [cfdChartData15days, setcfdChartData15days] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleChart = async () => {
      getCFD(token, projectId)
        .then((data) => {
          data = data.data
          const labels = data.dates
          const datasets = data.status.map((statusObj, i) => ({
            label: statusObj.key,
            data: statusObj.value,
            backgroundColor: getColor(i, "background"),
            borderColor: getColor(i, "border"),
            borderWidth: 1,
            fill: true
          }))

          setcfdChartData({ labels, datasets })

          const labels2 = [...labels]
          const labels15days = labels2.slice(-15)
          const dataCopy = { ...data }

          const datasets15days = dataCopy.status.map((statusObj, i) => ({
            label: statusObj.key,
            data: statusObj.value.slice(-15),
            backgroundColor: getColor(i, "background"),
            borderColor: getColor(i, "border"),
            borderWidth: 1,
            fill: true
          }))
          setcfdChartData15days({
            labels: labels15days,
            datasets: datasets15days,
          })
          setIsLoading(false)
        })
        .catch(function (error) {
          setIsLoading(false)
          setHasError(true)
        })
    }

    handleChart()
  }, [token, projectId])

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
            There was an error fetching the CFD data. Please refresh the page or
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
              data={cfdChartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Last 30 Days",
                  },
                },
                scales: {
                  y: {
                    stacked: true,
                  },
                },
              }}
            />
          </div>
          <div style={{ margin: 25 }}>
            <Line
              data={cfdChartData15days}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Last 15 Days",
                  },
                },
                scales: {
                  y: {
                    stacked: true,
                  },
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );

}

export default CfdDiagram
