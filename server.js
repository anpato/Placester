const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const passport = require('passport')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const AuthRouter = require('./routes/AuthRouter')
const { userAuthorized } = require('./auth/auth')
dotenv.config()

const PORT = process.env.PORT || 3001

const app = express()

// intializing Middleware
app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// App Routes
app.use('/auth', AuthRouter)
app.use('/app', userAuthorized)
app.use(passport.initialize())

// mongoose connection to mongo cloud db
const uri = process.env.DATABASE_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
	console.log(`connected to ${uri}`)
})
// Test Message
app.get('/', (req, res) => {
	try {
		res.send({ msg: 'Working' })
	} catch (error) {
		throw error
	}
})

// listening Port
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`)
})
