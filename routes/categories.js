const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  //TODO
  res.send('listCategories')
})

router.get('/:id', (req, res) => {
  //TODO
  const { id } = req.params
  res.json({ id })
})

module.exports = router
