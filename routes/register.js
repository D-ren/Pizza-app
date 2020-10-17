const {Router} = require('express')
const router = Router()
const User = require('../app/models/user')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
  res.render('register', {
    title: 'Register'
  })
})

router.post('/', async (req, res) => {
  const {name, password, email} = req.body

  //Вывод ошибки, елси поля не заполнены, при этом некоторые заполненые поля сохраняються

  if(!name || !password || !email) {
    req.flash('error', 'All fields are required')
    req.flash('name', name)
    req.flash('email', email)
    return res.redirect('/register')
  }

  //Проверка на существующее имя пользователя

  User.exists({name: name}, (err, result) => {
    if(result) {
      req.flash('error', 'Name already taken')
      req.flash('email', email)
      return res.redirect('/register')
    }
  })

  // Хеширование пароля
  const hashedPassword = await bcrypt.hash(password, 10)

  // Созданние пользователя
  const user = new User({
    name,
    password: hashedPassword,
    email
  })

  // Регистрирация пользователя

  user.save().then((user) => {
    // Login
    return res.redirect('/')
  }).catch(err => {
    req.flash('error', 'Something went wrong')
    return res.redirect('/register')
  })

})

module.exports = router