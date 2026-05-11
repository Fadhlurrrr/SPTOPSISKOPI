import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import api from "../services/api"

export default function ResultPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    api.get("/topsis/process")
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <Navbar />

        <div className="p-8">
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">
          📊 Proses Perhitungan TOPSIS
        </h1>

        {/* MATRIX */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Matriks Keputusan
          </h2>

          <div className="overflow-x-auto bg-slate-800 rounded-xl">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="p-4">Alternatif</th>

                  {data.criteria.map((c: any) => (
                    <th key={c.id} className="p-4">
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.alternatives.map((a: any) => (
                  <tr
                    key={a.id}
                    className="border-t border-slate-700"
                  >
                    <td className="p-4 font-semibold">
                      {a.name}
                    </td>

                    {data.criteria.map((c: any) => (
                      <td key={c.id} className="p-4">
                        {data.matrix[a.id][c.id]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* NORMALIZATION */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Matriks Normalisasi
          </h2>

          <div className="overflow-x-auto bg-slate-800 rounded-xl">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="p-4">Alternatif</th>

                  {data.criteria.map((c: any) => (
                    <th key={c.id} className="p-4">
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.alternatives.map((a: any) => (
                  <tr
                    key={a.id}
                    className="border-t border-slate-700"
                  >
                    <td className="p-4 font-semibold">
                      {a.name}
                    </td>

                    {data.criteria.map((c: any) => (
                      <td key={c.id} className="p-4">
                        {Number(
                          data.normalized[a.id][c.id]
                        ).toFixed(4)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* WEIGHTED */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Matriks Terbobot
          </h2>

          <div className="overflow-x-auto bg-slate-800 rounded-xl">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="p-4">Alternatif</th>

                  {data.criteria.map((c: any) => (
                    <th key={c.id} className="p-4">
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.alternatives.map((a: any) => (
                  <tr
                    key={a.id}
                    className="border-t border-slate-700"
                  >
                    <td className="p-4 font-semibold">
                      {a.name}
                    </td>

                    {data.criteria.map((c: any) => (
                      <td key={c.id} className="p-4">
                        {Number(
                          data.weighted[a.id][c.id]
                        ).toFixed(4)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}