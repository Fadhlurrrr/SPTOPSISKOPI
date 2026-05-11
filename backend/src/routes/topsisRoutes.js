const express = require('express')

const router = express.Router()

const topsisController = require('../controllers/topsisController')

router.get('/ranking', topsisController.getRanking)

router.get('/process', topsisController.getProcess)

module.exports = router