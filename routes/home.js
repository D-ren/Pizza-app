const {Router} = require('express')
const router = Router()
const Menu = require('../app/models/menu')

router.get('/', async (req, res) => {
  const pizzas = await Menu.find()
  res.render('home', {
    title: 'Pizza Man',
    pizzas: pizzas
  })
})

module.exports = router