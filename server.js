const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const PORT = process.env.PORT || 3000

const homeRoutes = require('./routes/home')
const offersRoutes = require('./routes/offers')
const loginRoutes = require('./routes/login')
const registerRoutes = require('./routes/register')
const cartRoutes = require('./routes/cart') 

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

// Connect to MongoDB

// const connectToMongoDB = require('./keys/config.js');

// const MongoClient = require('mongodb').MongoClient;
// const uri = connectToMongoDB.MONGODB_URI;
// const client = new MongoClient(uri, { 
//   useNewUrlParser: true, 
//   useUnifiedTopology: true
// });
// client.connect((err, result) => {
//   const collection = client.db("menu").collection("devices");
  
//   if(err) {
//     client.close();
//     return console.log(err);
//   } else {
//      app.listen(PORT, () => {
//      console.log(`Listening on port ${PORT}`)
//   })}
// });

app.listen(PORT, () => {
console.log(`Listening on port ${PORT}`)});