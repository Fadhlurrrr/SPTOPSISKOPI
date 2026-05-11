import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import api from "../services/api"
import "../styles/Dashboard.css"

export default function Dashboard() {
  const [alternatives, setAlternatives] = useState(0)
  const [criterias, setCriterias] = useState(0)
  const [scores, setScores] = useState(0)
  const [best, setBest] = useState<any>(null)

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      const alt = await api.get("/alternatives")
      const crit = await api.get("/criterias")
      const score = await api.get("/scores")
      const rank = await api.get("/topsis/ranking")

      setAlternatives(alt.data.length)
      setCriterias(crit.data.length)
      setScores(score.data.length)

      if (rank.data.length > 0) {
        setBest(rank.data[0])
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-container">
        <h1 className="dashboard-title">
          ☕ Dashboard SPK TOPSIS
        </h1>

        <p className="dashboard-subtitle">
          Sistem Pendukung Keputusan Pemilihan Bean Kopi Terbaik
        </p>

        <div className="stats-grid">
          <div className="card">
            <h3>Alternatif</h3>
            <p>{alternatives}</p>
          </div>

          <div className="card">
            <h3>Kriteria</h3>
            <p>{criterias}</p>
          </div>

          <div className="card">
            <h3>Nilai</h3>
            <p>{scores}</p>
          </div>

          <div className="card">
            <h3>Terbaik</h3>
            <p>
              {best ? best.alternative : "-"}
            </p>
          </div>
        </div>

        <div className="info-card">
          <h2>📌 Tentang Sistem</h2>

          <p>
            Sistem ini menggunakan metode TOPSIS
            untuk menentukan bean kopi terbaik
            berdasarkan berbagai kriteria seperti
            harga, aroma, kualitas, dan kepuasan.
          </p>
        </div>

        <div className="best-card">
          <h2>🏆 Ranking Terbaik</h2>

          {best ? (
            <>
              <h3>{best.alternative}</h3>

              <p>
                Nilai Preferensi:
              </p>

              <strong>
                {typeof best.score === "number"
                  ? best.score.toFixed(4)
                  : "0.0000"}
              </strong>
            </>
          ) : (
            <p>Belum ada ranking</p>
          )}
        </div>
      </div>
    </div>
  )
}