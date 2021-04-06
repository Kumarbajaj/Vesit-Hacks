const express = require('express')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const passport = require('passport')
const connectDB = require('./config/db')
const session = require('express-session')
const cors = require("cors");

// Creates an express app
const app = express()


// Passport config
require('./config/passport')(passport)

// Public path
app.use(express.static(path.join(__dirname + 'public')))
// Setting up view engine
app.use(expressLayout)
app.set('view engine', 'ejs')

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Session middleware
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// MongoDB 
connectDB()

// Routes

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


// Listening to server
const PORT = 3000
app.listen(PORT, () => {
 console.log(`Listening to http://localhost:${PORT}`);
})