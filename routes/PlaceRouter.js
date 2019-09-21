const express = require('express')
const PlaceRouter = express.Router()
const { Place, Category } = require('../database/Schema')

PlaceRouter.get('/', async (req, res, next) => {
	try {
		const location = { lat: req.query.lat, lng: req.query.lng }
		if (req.query.search || req.query.page || (location.lat && location.lng)) {
			if (req.query.search) {
				await Place.find().exec((err, data) => {
					const place = data.filter(
						(item) =>
							item.name
								.toLowerCase()
								.includes(req.query.search.toLowerCase()) ||
							item.location.city
								.toLowerCase()
								.includes(req.query.search.toLowerCase()) ||
							item.location.state
								.toLowerCase()
								.includes(req.query.search.toLowerCase())
					)
					if (place.length) res.send(place)
					else {
						let err = new Error(
							`No place found with name of ${req.query.search}`
						)
						err.status = 400
						return next(err)
					}
				})
			}
			if (location.lat && location.lng) {
				await Place.find().exec((err, data) => {
					const places = data.filter(
						(place) =>
							(place.location.lat >= parseFloat(location.lat) + 0.2 &&
								place.location.lng >= parseFloat(location.lng) + 0.2) ||
							(place.location.lat <= parseFloat(location.lat) - 0.2 &&
								place.location.lng <= parseFloat(location.lng) + 0.2)
					)
					if (places.length) res.send(places)
					else {
						let err = new Error(`No places found nearby.`)
						err.status = 400
						return next(err)
					}
				})
			}
		}
	} catch (error) {
		res.json({ error: error })
	}
})

PlaceRouter.get('/all', async (req, res) => {
	try {
		const limit = 10
		const page = req.query.page || 1
		await Place.find()
			.skip(limit * page - page)
			.limit(limit)
			.exec(async (err, places) => {
				if (err) res.status(400).send({ err })
				else {
					await Place.countDocuments().exec((err, count) =>
						res.send({ places, page, pages: Math.ceil(count / limit) })
					)
				}
			})
	} catch (error) {
		res.json({ error: error })
	}
})

PlaceRouter.get('/:place_id', async (req, res) => {
	try {
		await Place.find()
			.where({ _id: req.params.place_id })
			.populate({ path: 'categories', model: Category })
			.exec((err, places) =>
				err ? res.status(400).send({ err: err }) : res.send(places)
			)
	} catch (error) {
		throw error
	}
})

PlaceRouter.post('/', async (req, res) => {
	try {
		const place = await Place.findOne().where({ name: req.body.name })
		if (place) res.status(400).send({ err: `${req.body.name} already exists!` })
		else {
			const newPlace = await new Place(req.body)
			await newPlace.save()
			res.send(newPlace)
		}
	} catch (error) {
		throw error
	}
})

PlaceRouter.put('/:place_id', async (req, res) => {
	try {
		const place = await Place.findByIdAndUpdate(req.params.place_id, req.body, {
			useFindAndModify: false,
			new: true
		})
		await place.save()
		res.send(place)
	} catch (error) {
		throw error
	}
})

PlaceRouter.delete('/:place_id', async (req, res) => {
	try {
		const place = await Place.findById(req.params.place_id)
		await place.remove()
		res.send({ msg: `Successfully removed ${place.name}` })
	} catch (error) {
		throw error
	}
})

PlaceRouter.post('/populate', async (req, res) => {
	try {
		await Place.insertMany(req.body, { ordered: false })
		res.send({ msg: 'Documents Inserted' })
	} catch (error) {
		throw error
	}
})

module.exports = PlaceRouter
