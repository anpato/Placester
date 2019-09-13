const express = require('express')
const PlaceRouter = express.Router()
const { Place, User } = require('../database/Schema')

PlaceRouter.get('/', async (req, res) => {
	try {
		const places = await Place.find()
		res.send(places)
	} catch (error) {
		throw error
	}
})

PlaceRouter.get('/:place_id', async (req, res) => {
	try {
		const place = await Place.findById(req.params.place_id)
		res.send(place)
	} catch (error) {
		throw error
	}
})

PlaceRouter.post('/', async (req, res) => {
	try {
		const place = await Place.findOne().where({ name: req.body.name })
		if (place) res.status(400).send({ err: `${req.body.name} already exists!` })
		await res.send()
	} catch (error) {}
})

module.exports = PlaceRouter
