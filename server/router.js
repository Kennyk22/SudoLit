const router = require('express').Router()
const controllers = require('./Controllers/controllers');
const authMiddleware = require('./middleware/Auth')

router.get('/flowchart/:email', controllers.getOne)

router.post('/postflow', controllers.postOne)

router.put('/save', controllers.saveOne)

module.exports = router