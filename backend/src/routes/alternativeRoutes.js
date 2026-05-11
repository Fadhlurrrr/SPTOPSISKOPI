const express = require('express')

const router = express.Router()

const alternativeController = require('../controllers/alternativeController')

router.get('/', alternativeController.getAlternatives)

router.post('/', alternativeController.createAlternative)

router.put('/:id', alternativeController.updateAlternative)

router.delete('/:id', alternativeController.deleteAlternative)

module.exports = router