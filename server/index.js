require('dotenv').config()
const express = require('express')
const session = require('express-session')
const masssive = require('massive')
const {PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const app = express()

//TOP LEVEL MIDDLEWARE
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

//DATABASE CONNECTION
masssive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})
//LISTENER
app.listen(PORT, () => console.log(`Captain's Log #${PORT}: We are lost in space...`))