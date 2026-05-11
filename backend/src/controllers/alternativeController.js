const prisma = require('../lib/prisma')

// ===============================
// GET ALL
// ===============================
exports.getAlternatives = async (req, res) => {
  try {
    const data = await prisma.alternative.findMany({
      orderBy: {
        id: 'asc',
      },
    })

    res.json(data)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Gagal mengambil alternatif',
    })
  }
}

// ===============================
// CREATE
// ===============================
exports.createAlternative = async (req, res) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({
        error: 'Nama alternatif wajib diisi',
      })
    }

    const alternative =
      await prisma.alternative.create({
        data: {
          name,
        },
      })

    res.json(alternative)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Gagal menambah alternatif',
    })
  }
}

// ===============================
// UPDATE
// ===============================
exports.updateAlternative = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const { name } = req.body

    const updated =
      await prisma.alternative.update({
        where: {
          id,
        },
        data: {
          name,
        },
      })

    res.json(updated)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Gagal update alternatif',
    })
  }
}

// ===============================
// DELETE
// ===============================
exports.deleteAlternative = async (req, res) => {
  try {
    const id = Number(req.params.id)

    // hapus score terkait
    await prisma.score.deleteMany({
      where: {
        alternativeId: id,
      },
    })

    // hapus alternatif
    await prisma.alternative.delete({
      where: {
        id,
      },
    })

    res.json({
      message: 'Alternatif berhasil dihapus',
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Gagal menghapus alternatif',
    })
  }
}