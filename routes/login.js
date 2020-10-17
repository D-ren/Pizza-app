const {Router} = require('express')
const router = Router()
const passport = require('passport')

router.get('/', (req, res) => {
  res.render('login', {
    title: 'Login'
  })
})

router.post('/', (req, res, next) => {

  const {name , password} = req.body

  //Вывод ошибки, если поля не заполнены

  if(!name || !password) {
    req.flash('error', 'All fields are required')
    return res.redirect('/login')
  }

  // Аутентификая пользователя

  passport.authenticate('local', (err, user, info) => {
    if(err) {
      req.flash('error', info.message)
      return next(err)
    }

    if(!user) {
      req.flash('error', info.message)
      res.redirect('/login')
    }

    // Вход в аккаунт

    req.login(user, (err) => {
      if(err) {
        req.flash('error', info.message)
        return next(err)
      }
      res.redirect('/')
    })
    
  })(req, res, next)
})

// Завершает сеанс входа в систему

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router