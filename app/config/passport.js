const localStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')


function init(passport) {
  passport.use(new localStrategy({usernameField: 'name'}, async (name, password, done) => {
    const user = await User.findOne({name: name})
    if(!user) {
      return done(null, false, {message: 'No user with this name'})
    }

    bcrypt.compare(password, user.password).then(match => { // Сверяет пароль введенный польз с паролем с БД
      if(match) {
        return done(null, user, {message: 'Logged in succesfully'})
      }
      return done(null, false, {message: 'Wrong name or password'})
    }).catch(err => {
      return done(null, false, {message: 'Something went wrong'})
    })
  }))

  passport.serializeUser((user, done) => {  //Привязка авторизации к пользоуктелю, сохраняет польз в сессию
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {  //Сохраняет польз если он не привязан к сессии
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

}

module.exports = init