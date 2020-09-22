const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('home', {
    title: 'Pizza Man'
  })
})

module.exports = router