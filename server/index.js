require('dotenv').config()
const express = require('express')
const session = require('express-session')
const masssive = require('massive')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const app = express()
const authCtrl = require('./controllers/authController')
const treasCtrl = require('./controllers/treasureController')
const auth = require('./middleware/authMiddleware')

//TOP LEVEL MIDDLEWARE
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

//ENDPOINTS
app.post('/auth/register', authCtrl.register) //register user
app.post('/auth/login', authCtrl.login) //login user
app.get('/auth/logout', authCtrl.logout) //logout user
app.get('/api/treasure/dragon', treasCtrl.dragonTreasure) //gets dragon treasure
app.get('/api/treasure/user', auth.usersOnly, treasCtrl.getUserTreasure) //gets user treasure
app.post('/api/treasure/user', auth.usersOnly, treasCtrl.addUserTreasure) //adds user treasure


//DATABASE CONNECTION
masssive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})
//LISTENER
app.listen(SERVER_PORT, () => console.log(`Captain's Log #${SERVER_PORT}: We are lost in space...`))