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

  const _getRedirectUrl = (req) => {
    return req.user.role === 'admin' ? '/admin-orders' : '/orders'
  }

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

    req.logIn(user, (err) => {
      if(err) {
        return next(err)
      }
      return res.redirect(_getRedirectUrl(req))
    })
    
  })(req, res, next)
})

// Завершает сеанс входа в систему

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router