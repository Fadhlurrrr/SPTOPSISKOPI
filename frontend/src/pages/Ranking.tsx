import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import api from "../services/api"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

import { Bar } from "react-chartjs-2"

import "../styles/Ranking.css"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function Ranking() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      const res = await api.get(
        "/topsis/ranking"
      )

      setData(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const chartData = {
    labels: data.map(
      (d) => d.alternative
    ),

    datasets: [
      {
        label: "Nilai TOPSIS",
        data: data.map((d) => d.score),
        backgroundColor: [
          "#3b82f6",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
        borderRadius: 10,
      },
    ],
  }

  const options = {
    responsive: true,

    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },

      y: {
        ticks: {
          color: "white",
        },
      },
    },
  }

  return (
    <div className="ranking-page">
      <Navbar />

      <div className="ranking-container">
        <h1>
          🏆 Ranking TOPSIS
        </h1>

        <div className="chart-card">
          <Bar
            data={chartData}
            options={options}
          />
        </div>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Alternatif</th>
                <th>Nilai</th>
              </tr>
            </thead>

            <tbody>
              {data.map((r, index) => (
                <tr key={index}>
                  <td>
                    #{r.rank}
                  </td>

                  <td>
                    {r.alternative}
                  </td>

                  <td>
                    {typeof r.score ===
                    "number"
                      ? r.score.toFixed(4)
                      : "0.0000"}
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td colSpan={3}>
                    Belum ada ranking
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}