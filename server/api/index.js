const router = require('express').Router()
module.exports = router

router.use('/character', require('./characters'))
router.use('/interaction', require('./interaction'))
router.use('/scoring', require('./inputScore'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
