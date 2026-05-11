const prisma = require('../lib/prisma')

// ===============================
// GET ALL CRITERIA
// ===============================
exports.getCriterias = async (req, res) => {
  try {
    const data = await prisma.criteria.findMany({
      orderBy: {
        id: 'asc',
      },
    })

    res.json(data)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Gagal mengambil data kriteria',
    })
  }
}

// ===============================
// CREATE CRITERIA
// ===============================
exports.createCriteria = async (req, res) => {
  try {
    const { name, weight, type } = req.body

    if (!name || !weight || !type) {
      return res.status(400).json({
        error: 'Semua field wajib diisi',
      })
    }

    const criteria = await prisma.criteria.create({
      data: {
        name,
        weight: Number(weight),
        type,
      },
    })

    res.json(criteria)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Gagal menambah kriteria',
    })
  }
}

// ===============================
// UPDATE CRITERIA
// ===============================
exports.updateCriteria = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const { name, weight, type } = req.body

    const updated = await prisma.criteria.update({
      where: {
        id,
      },
      data: {
        name,
        weight: Number(weight),
        type,
      },
    })

    res.json(updated)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Gagal update kriteria',
    })
  }
}

// ===============================
// DELETE CRITERIA
// ===============================
exports.deleteCriteria = async (req, res) => {
  try {
    const id = Number(req.params.id)

    // hapus score terkait dulu
    await prisma.score.deleteMany({
      where: {
        criteriaId: id,
      },
    })

    // hapus criteria
    await prisma.criteria.delete({
      where: {
        id,
      },
    })

    res.json({
      message: 'Kriteria berhasil dihapus',
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Gagal menghapus kriteria',
    })
  }
}