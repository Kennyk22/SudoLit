const router = require('express').Router()
const controllers = require('./Controllers/controllers');

router.get('/flowchart/:_id', controllers.getOne)

router.get('/flowchartlist/:email', controllers.getAll)

router.post('/postflow', controllers.postOne)

router.post('/cloud', controllers.cloudUp)

router.put('/save',controllers.saveOne)

module.exports = router