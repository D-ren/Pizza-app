const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')

const homeRoutes = require('./routes/home')
const offersRoutes = require('./routes/offers')
const loginRoutes = require('./routes/login')
const registerRoutes = require('./routes/register')
const cartRoutes = require('./routes/cart') 

// Connect to MongoDB

const connectToMongoDB = require('./app/config/config.js');

const url = connectToMongoDB.MONGODB_URI;
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

app.use(express.static(path.join(__dirname, '/public')))

//   Роуты

app.use('/', homeRoutes)
app.use('/offers', offersRoutes)
app.use('/login', loginRoutes)
app.use('/register', registerRoutes)
app.use('/cart', cartRoutes)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})