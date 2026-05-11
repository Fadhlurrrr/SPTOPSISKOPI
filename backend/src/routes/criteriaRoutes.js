const express = require('express')

const router = express.Router()

const criteriaController = require('../controllers/criteriaController')

router.get('/', criteriaController.getCriterias)

router.post('/', criteriaController.createCriteria)

router.put('/:id', criteriaController.updateCriteria)

router.delete('/:id', criteriaController.deleteCriteria)

module.exports = router