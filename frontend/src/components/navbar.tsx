import { Link, useLocation } from "react-router-dom"
import "../styles/Navbar.css"

export default function Navbar() {
  const location = useLocation()

  return (
    <div className="navbar">
      <div className="logo">
        ☕ SPK TOPSIS
      </div>

      <div className="menu">
        <Link
          className={location.pathname === "/" ? "active" : ""}
          to="/"
        >
          Dashboard
        </Link>

        <Link
          className={location.pathname === "/alternatif" ? "active" : ""}
          to="/alternatif"
        >
          Alternatif
        </Link>

        <Link
          className={location.pathname === "/kriteria" ? "active" : ""}
          to="/kriteria"
        >
          Kriteria
        </Link>

        <Link
          className={location.pathname === "/nilai" ? "active" : ""}
          to="/nilai"
        >
          Nilai
        </Link>

        <Link
          className={location.pathname === "/ranking" ? "active" : ""}
          to="/ranking"
        >
          Ranking
        </Link>
      </div>
    </div>
  )
}