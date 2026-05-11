import { useEffect, useState } from "react"
import api from "../services/api"
import Navbar from "../components/navbar"
import "../styles/Alternatif.css"

export default function Alternatif() {
  const [data, setData] = useState<any[]>([])
  const [name, setName] = useState("")
  const [editId, setEditId] =
    useState<number | null>(null)

  const load = async () => {
    try {
      const res = await api.get("/alternatives")
      setData(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const save = async () => {
    if (!name.trim()) {
      alert("Nama alternatif wajib diisi")
      return
    }

    try {
      if (editId) {
        await api.put(
          `/alternatives/${editId}`,
          {
            name,
          }
        )

        alert("Alternatif berhasil diupdate")
      } else {
        await api.post("/alternatives", {
          name,
        })

        alert("Alternatif berhasil ditambahkan")
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
  }

  const del = async (id: number) => {
    const confirmDelete = confirm(
      "Hapus alternatif ini?"
    )

    if (!confirmDelete) return

    try {
      await api.delete(`/alternatives/${id}`)
      load()
    } catch (error) {
      console.error(error)
    }
  }

  const resetForm = () => {
    setEditId(null)
    setName("")
  }

  return (
    <div className="alternatif-page">
      <Navbar />

      <div className="alternatif-container">
        <h1>☕ Alternatif Kopi</h1>

        <div className="form-card">
          <h2>
            {editId
              ? "✏️ Edit Alternatif"
              : "➕ Tambah Alternatif"}
          </h2>

          <div className="form-group">
            <input
              type="text"
              placeholder="Nama Kopi"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
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
                <th>Nama Alternatif</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>

                  <td>{item.name}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        edit(item)
                      }
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
                  <td colSpan={3}>
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