const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const PORT = process.env.PORT || 3000

const homeRoutes = require('./routes/home')
const offersRoutes = require('./routes/offers')
const loginRoutes = require('./routes/login')
const registerRoutes = require('./routes/register')
const emptyCartRoutes = require('./routes/cart') 

// Используем шаблонизатор EJS

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.static(path.join(__dirname, '/public')))

//   Роуты

app.use('/', homeRoutes)
app.use('/offers', offersRoutes)
app.use('/login', loginRoutes)
app.use('/register', registerRoutes)
app.use('/cart', emptyCartRoutes)



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
