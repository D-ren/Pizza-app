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


const homeRoutes = require('./routes/home')
const offersRoutes = require('./routes/offers')
const loginRoutes = require('./routes/login')
const registerRoutes = require('./routes/register')
const cartRoutes = require('./routes/cart') 


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

app.use(flash())

// Статические файлы

app.use(express.static(path.join(__dirname, '/public')))

app.use(express.json())

//  Глобал мидлвейр

app.use((req, res, next) => {
  res.locals.session = req.session
  next()
})

//   Роуты

app.use('/', homeRoutes)
app.use('/offers', offersRoutes)
app.use('/login', loginRoutes)
app.use('/register', registerRoutes)
app.use('/cart', cartRoutes)
app.use('/update-cart', cartRoutes)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})