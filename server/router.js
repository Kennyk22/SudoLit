const router = require('express').Router()
const controller = require('./Controllers/controllers')

router.get('/flowchart', controller.getOne)
router.put('/save', controller.saveOne)