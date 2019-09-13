const express = require('express')
const authRouter = express.Router()
const { passport, signToken } = require('../auth/auth')

authRouter.post('/login', async (req, res, next) => {
	passport.authenticate('login', async (err, user, info) => {
		try {
			if (err || !user) {
				const error = new Error('An Error Occurred')
				return next(error)
			}

			req.login(
				user,
				{
					session: false
				},
				async (error) => {
					if (error) return next(error)
					const { username, id } = user
					const payload = { username, id }
					const token = signToken(payload)
					// return the user object
					return res.json({ user, token })
				}
			)
		} catch (error) {
			return next(error)
		}
	})(req, res, next)
})

authRouter.post('/signup', async (req, res, next) => {
	passport.authenticate('signup', async (err, user, info) => {
		try {
			if (!user || err) {
				const msg = `${
					err.errors.username
						? err.errors.username.properties.value
						: err.errors.email.properties.value
				} ${
					err.errors.username
						? err.errors.username.message
						: err.errors.email.message
				}`
				const error = new Error(msg)
				error.status = 400
				return next(res.status(400).send({ error: msg }))
			}
			// console.log('looking for user', user)
			if (err || !user) {
				const error = new Error('Unsuccessful')
				return next(error)
			}
			return res.json({ msg: 'user created', user: user })
		} catch (error) {
			return next(error)
		}
	})(req, res, next)
})

module.exports = authRouter