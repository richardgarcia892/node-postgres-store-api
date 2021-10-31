const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('ListUsers')
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  res.send('userId' + id)
})


module.exports = router
