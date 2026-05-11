import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import api from "../services/api"
import "../styles/Nilai.css"

export default function Nilai() {
  const [scores, setScores] = useState<any[]>([])
  const [alternatives, setAlternatives] =
    useState<any[]>([])
  const [criterias, setCriterias] =
    useState<any[]>([])

  const [alternativeId, setAlternativeId] =
    useState("")
  const [criteriaId, setCriteriaId] =
    useState("")
  const [value, setValue] = useState("")

  const [editId, setEditId] =
    useState<number | null>(null)

  const load = async () => {
    try {
      const scoreRes =
        await api.get("/scores")

      const altRes =
        await api.get("/alternatives")

      const critRes =
        await api.get("/criterias")

      setScores(scoreRes.data)
      setAlternatives(altRes.data)
      setCriterias(critRes.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const save = async () => {
    if (
      !alternativeId ||
      !criteriaId ||
      !value
    ) {
      alert("Semua field wajib diisi")
      return
    }

    try {
      if (editId) {
        await api.put(`/scores/${editId}`, {
          alternativeId,
          criteriaId,
          value,
        })

        alert("Nilai berhasil diupdate")
      } else {
        await api.post("/scores", {
          alternativeId,
          criteriaId,
          value,
        })

        alert("Nilai berhasil ditambahkan")
      }

      resetForm()
      load()
    } catch (error) {
      console.error(error)
    }
  }

  const edit = (item: any) => {
    setEditId(item.id)

    setAlternativeId(
      item.alternativeId.toString()
    )

    setCriteriaId(
      item.criteriaId.toString()
    )

    setValue(item.value.toString())
  }

  const del = async (id: number) => {
    const confirmDelete = confirm(
      "Hapus nilai ini?"
    )

    if (!confirmDelete) return

    try {
      await api.delete(`/scores/${id}`)
      load()
    } catch (error) {
      console.error(error)
    }
  }

  const resetForm = () => {
    setEditId(null)
    setAlternativeId("")
    setCriteriaId("")
    setValue("")
  }

  return (
    <div className="nilai-page">
      <Navbar />

      <div className="nilai-container">
        <h1>🧮 Nilai Alternatif</h1>

        <div className="form-card">
          <h2>
            {editId
              ? "✏️ Edit Nilai"
              : "➕ Tambah Nilai"}
          </h2>

          <div className="form-group">
            <select
              value={alternativeId}
              onChange={(e) =>
                setAlternativeId(
                  e.target.value
                )
              }
            >
              <option value="">
                Pilih Alternatif
              </option>

              {alternatives.map((a) => (
                <option
                  key={a.id}
                  value={a.id}
                >
                  {a.name}
                </option>
              ))}
            </select>

            <select
              value={criteriaId}
              onChange={(e) =>
                setCriteriaId(
                  e.target.value
                )
              }
            >
              <option value="">
                Pilih Kriteria
              </option>

              {criterias.map((c) => (
                <option
                  key={c.id}
                  value={c.id}
                >
                  {c.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Nilai"
              value={value}
              onChange={(e) =>
                setValue(e.target.value)
              }
            />
          </div>

          <div className="button-group">
            <button
              className="save-btn"
              onClick={save}
            >
              {editId
                ? "Update"
                : "Tambah"}
            </button>

            {editId && (
              <button
                className="cancel-btn"
                onClick={resetForm}
              >
                Batal
              </button>
            )}
          </div>
        </div>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Alternatif</th>
                <th>Kriteria</th>
                <th>Nilai</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {scores.map((s, index) => (
                <tr key={s.id}>
                  <td>{index + 1}</td>

                  <td>
                    {s.alternative.name}
                  </td>

                  <td>
                    {s.criteria.name}
                  </td>

                  <td>{s.value}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        edit(s)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        del(s.id)
                      }
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}

              {scores.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    Belum ada data
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