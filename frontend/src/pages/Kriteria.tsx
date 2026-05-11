import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import api from "../services/api"
import "../styles/Kriteria.css"

export default function Kriteria() {
  const [data, setData] = useState<any[]>([])

  const [name, setName] = useState("")
  const [weight, setWeight] = useState("")
  const [type, setType] = useState("benefit")

  const [editId, setEditId] = useState<number | null>(null)

  const load = async () => {
    try {
      const res = await api.get("/criterias")
      setData(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const save = async () => {
    if (!name || !weight) {
      alert("Semua field wajib diisi")
      return
    }

    try {
      if (editId) {
        await api.put(`/criterias/${editId}`, {
          name,
          weight,
          type,
        })

        alert("Kriteria berhasil diupdate")
      } else {
        await api.post("/criterias", {
          name,
          weight,
          type,
        })

        alert("Kriteria berhasil ditambahkan")
      }

      resetForm()
      load()
    } catch (error) {
      console.error(error)
    }
  }

  const edit = (item: any) => {
    setEditId(item.id)
    setName(item.name)
    setWeight(item.weight)
    setType(item.type)
  }

  const del = async (id: number) => {
    const confirmDelete = confirm(
      "Hapus kriteria ini?"
    )

    if (!confirmDelete) return

    try {
      await api.delete(`/criterias/${id}`)
      load()
    } catch (error) {
      console.error(error)
    }
  }

  const resetForm = () => {
    setEditId(null)
    setName("")
    setWeight("")
    setType("benefit")
  }

  return (
    <div className="kriteria-page">
      <Navbar />

      <div className="kriteria-container">
        <h1>⚖️ Kriteria TOPSIS</h1>

        <div className="form-card">
          <h2>
            {editId
              ? "✏️ Edit Kriteria"
              : "➕ Tambah Kriteria"}
          </h2>

          <div className="form-group">
            <input
              type="text"
              placeholder="Nama Kriteria"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Bobot"
              value={weight}
              onChange={(e) =>
                setWeight(e.target.value)
              }
            />

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
            >
              <option value="benefit">
                Benefit
              </option>

              <option value="cost">
                Cost
              </option>
            </select>
          </div>

          <div className="button-group">
            <button
              className="save-btn"
              onClick={save}
            >
              {editId ? "Update" : "Tambah"}
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
                <th>Nama</th>
                <th>Bobot</th>
                <th>Tipe</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>

                  <td>{item.name}</td>

                  <td>{item.weight}</td>

                  <td>{item.type}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => edit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        del(item.id)
                      }
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
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