require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDBStore = require('connect-mongo')(session)
const passport = require('passport')


const homeRoutes = require('./routes/home')
const offersRoutes = require('./routes/offers')
const loginRoutes = require('./routes/login')
const registerRoutes = require('./routes/register')
const cartRoutes = require('./routes/cart') 

const quest = require('./app/middlewares/quest')


// Connect to MongoDB

const url = process.env.MONGODB_URI;
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Databse conected...');
}).catch(err => {
  console.log('Connection failed...');
})

// Используем шаблонизатор EJS

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// Sesion store

let mongoStore = new MongoDBStore({
  mongooseConnection: connection,
  collection: 'session'
})

// Session config

app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: mongoStore,
  cookie: { maxAge: 1000 * 60 * 60 * 24} //24 hours
}))

// Passport config

const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// Статические файлы

app.use(express.static(path.join(__dirname, '/public')))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//  Глобал мидлвейр

app.use((req, res, next) => {
  res.locals.session = req.session
  res.locals.user = req.user
  next()
})

//   Роуты

app.use('/', homeRoutes)
app.use('/offers', offersRoutes)
app.use('/login', quest, loginRoutes)
app.use('/register', quest,  registerRoutes)
app.use('/cart', cartRoutes)

app.use('/update-cart', cartRoutes)
app.use('/', loginRoutes) 


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})