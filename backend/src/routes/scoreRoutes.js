const express = require('express')

const router = express.Router()

const scoreController = require('../controllers/scoreController')

router.get('/', scoreController.getScores)

router.post('/', scoreController.createScore)

router.put('/:id', scoreController.updateScore)

router.delete('/:id', scoreController.deleteScore)

module.exports = router