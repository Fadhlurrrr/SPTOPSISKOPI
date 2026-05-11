const prisma = require('../lib/prisma')

// ===============================
// GET RANKING TOPSIS
// ===============================
exports.getRanking = async (req, res) => {
  try {
    const alternatives = await prisma.alternative.findMany()
    const criteria = await prisma.criteria.findMany()
    const scores = await prisma.score.findMany()

    // ===============================
    // STEP 1: MATRIX
    // ===============================
    const matrix = {}

    alternatives.forEach((a) => {
      matrix[a.id] = {}

      criteria.forEach((c) => {
        const score = scores.find(
          (s) =>
            s.alternativeId === a.id &&
            s.criteriaId === c.id
        )

        matrix[a.id][c.id] = score
          ? score.value
          : 0
      })
    })

    // ===============================
    // STEP 2: NORMALIZATION
    // ===============================
    const normalized = {}

    criteria.forEach((c) => {
      const sumSquare = alternatives.reduce(
        (sum, a) => {
          return (
            sum +
            Math.pow(matrix[a.id][c.id], 2)
          )
        },
        0
      )

      const divisor = Math.sqrt(sumSquare)

      alternatives.forEach((a) => {
        if (!normalized[a.id]) {
          normalized[a.id] = {}
        }

        normalized[a.id][c.id] =
          divisor === 0
            ? 0
            : matrix[a.id][c.id] / divisor
      })
    })

    // ===============================
    // STEP 3: WEIGHTED MATRIX
    // ===============================
    const weighted = {}

    alternatives.forEach((a) => {
      weighted[a.id] = {}

      criteria.forEach((c) => {
        weighted[a.id][c.id] =
          normalized[a.id][c.id] * c.weight
      })
    })

    // ===============================
    // STEP 4: IDEAL SOLUTION
    // ===============================
    const idealPositive = {}
    const idealNegative = {}

    criteria.forEach((c) => {
      const values = alternatives.map(
        (a) => weighted[a.id][c.id]
      )

      if (c.type === 'benefit') {
        idealPositive[c.id] = Math.max(...values)
        idealNegative[c.id] = Math.min(...values)
      } else {
        idealPositive[c.id] = Math.min(...values)
        idealNegative[c.id] = Math.max(...values)
      }
    })

    // ===============================
    // STEP 5: DISTANCE
    // ===============================
    const results = alternatives.map((a) => {
      let dPlus = 0
      let dMinus = 0

      criteria.forEach((c) => {
        dPlus += Math.pow(
          weighted[a.id][c.id] -
            idealPositive[c.id],
          2
        )

        dMinus += Math.pow(
          weighted[a.id][c.id] -
            idealNegative[c.id],
          2
        )
      })

      dPlus = Math.sqrt(dPlus)
      dMinus = Math.sqrt(dMinus)

      const score =
        dPlus + dMinus === 0
          ? 0
          : dMinus / (dPlus + dMinus)

      return {
        id: a.id,
        alternative: a.name,
        score,
      }
    })

    // ===============================
    // STEP 6: RANKING
    // ===============================
    results.sort((a, b) => b.score - a.score)

    const ranked = results.map((r, index) => ({
      rank: index + 1,
      alternative: r.alternative,
      score: r.score,
    }))

    res.json(ranked)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Gagal menghitung ranking TOPSIS',
    })
  }
}

// ===============================
// GET PROCESS TOPSIS
// ===============================
exports.getProcess = async (req, res) => {
  try {
    const alternatives = await prisma.alternative.findMany()
    const criteria = await prisma.criteria.findMany()
    const scores = await prisma.score.findMany()

    // ===============================
    // MATRIX
    // ===============================
    const matrix = {}

    alternatives.forEach((a) => {
      matrix[a.id] = {}

      criteria.forEach((c) => {
        const score = scores.find(
          (s) =>
            s.alternativeId === a.id &&
            s.criteriaId === c.id
        )

        matrix[a.id][c.id] = score
          ? score.value
          : 0
      })
    })

    // ===============================
    // NORMALIZATION
    // ===============================
    const normalized = {}

    criteria.forEach((c) => {
      const sumSquare = alternatives.reduce(
        (sum, a) => {
          return (
            sum +
            Math.pow(matrix[a.id][c.id], 2)
          )
        },
        0
      )

      const divisor = Math.sqrt(sumSquare)

      alternatives.forEach((a) => {
        if (!normalized[a.id]) {
          normalized[a.id] = {}
        }

        normalized[a.id][c.id] =
          divisor === 0
            ? 0
            : matrix[a.id][c.id] / divisor
      })
    })

    // ===============================
    // WEIGHTED MATRIX
    // ===============================
    const weighted = {}

    alternatives.forEach((a) => {
      weighted[a.id] = {}

      criteria.forEach((c) => {
        weighted[a.id][c.id] =
          normalized[a.id][c.id] * c.weight
      })
    })

    // ===============================
    // RESPONSE
    // ===============================
    res.json({
      alternatives,
      criteria,
      matrix,
      normalized,
      weighted,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Gagal mengambil proses TOPSIS',
    })
  }
}