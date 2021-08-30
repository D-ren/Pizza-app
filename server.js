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
require('dotenv').config()


const homeRoutes = require('./routes/home')
const offersRoutes = require('./routes/offers')
const loginRoutes = require('./routes/login')
const registerRoutes = require('./routes/register')
const cartRoutes = require('./routes/cart') 
const ordersRoutes = require('./routes/orders')
const adminOrdersRoutes = require('./routes/adminOrders')

const quest = require('./app/middlewares/quest')
const auth = require('./app/middlewares/auth')
const admin = require('./app/middlewares/admin')


// Connect to MongoDB

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true});
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
  secret: process.env.SESSION_SEC,
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

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// 

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

app.use('/orders', auth, ordersRoutes)
app.use('/admin-orders', admin, adminOrdersRoutes)

app.use('/update-cart', cartRoutes)
app.use('/', loginRoutes) 



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})