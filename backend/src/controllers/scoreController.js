const prisma = require('../lib/prisma')

// ===============================
// GET ALL SCORES
// ===============================
exports.getScores = async (req, res) => {
  try {
    const scores = await prisma.score.findMany({
      include: {
        alternative: true,
        criteria: true,
      },
      orderBy: {
        id: 'asc',
      },
    })

    res.json(scores)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Gagal mengambil score',
    })
  }
}

// ===============================
// CREATE SCORE
// ===============================
exports.createScore = async (req, res) => {
  try {
    const {
      alternativeId,
      criteriaId,
      value,
    } = req.body

    const score = await prisma.score.create({
      data: {
        alternativeId: Number(alternativeId),
        criteriaId: Number(criteriaId),
        value: Number(value),
      },
    })

    res.json(score)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Gagal menambah score',
    })
  }
}

// ===============================
// UPDATE SCORE
// ===============================
exports.updateScore = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const {
      alternativeId,
      criteriaId,
      value,
    } = req.body

    const updated = await prisma.score.update({
      where: {
        id,
      },
      data: {
        alternativeId: Number(alternativeId),
        criteriaId: Number(criteriaId),
        value: Number(value),
      },
    })

    res.json(updated)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Gagal update score',
    })
  }
}

// ===============================
// DELETE SCORE
// ===============================
exports.deleteScore = async (req, res) => {
  try {
    const id = Number(req.params.id)

    await prisma.score.delete({
      where: {
        id,
      },
    })

    res.json({
      message: 'Score berhasil dihapus',
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Gagal menghapus score',
    })
  }
}