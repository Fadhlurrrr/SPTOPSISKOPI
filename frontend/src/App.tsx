import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Alternatif from "./pages/Alternatif"
import Kriteria from "./pages/Kriteria"
import Ranking from "./pages/Ranking"
import ResultPage from "./pages/ResultPage"
import Nilai from "./pages/Nilai"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alternatif" element={<Alternatif />} />
        <Route path="/kriteria" element={<Kriteria />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/nilai" element={<Nilai />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App