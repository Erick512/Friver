const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const profileRoutes = require('./routes/profile')
const qrCodeRoutes = require('./routes/qrCode')
const feedRoutes = require('./routes/feed')
const cors = require('cors')

app.use(cors())

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash()) // requires sessions
  
app.use('/', mainRoutes)
app.use('/profile', profileRoutes)
app.use('/qrCode', qrCodeRoutes)
app.use('/feed', feedRoutes)
app.use((req, res, next) => {
  res.status(404).send(
      "<h1>Page not found on the server</h1>")
})
 
app.listen(process.env.PORT || 8000, ()=>{
    console.log('Server is running, you better catch it!')
})    