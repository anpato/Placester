const express = require('express')
const PlaceRouter = express.Router()
const { Place, Category } = require('../database/Schema')

PlaceRouter.get('/', async (req, res) => {
	try {
		const limit = 10
		const page = req.query.page || 1
		if (req.query.name || req.query.page) {
			if (req.query.name) {
				await Place.find().exec((err, data) => {
					const place = data.filter((location) =>
						location.name.toLowerCase().includes(req.query.name.toLowerCase())
					)
					if (place.length) res.send(place)
					else
						res
							.status(400)
							.send({ msg: `No place found with name of ${req.query.name}` })
				})
			} else {
				await Place.find()
					.skip(limit * page - page)
					.limit(limit)
					.exec(async (err, places) => {
						if (err) res.status(400).send({ err })
						await Place.count().exec((err, count) =>
							res.send({ places, page, pages: Math.ceil(count / limit) })
						)
					})
			}
		} else {
			res.send(await Place.find())
		}
	} catch (error) {
		throw error
	}
})

PlaceRouter.get('/:place_id', async (req, res) => {
	try {
		await Place.find()
			.where({ _id: req.params.place_id })
			.populate({ path: 'categories', model: Category })
			.exec((err, places) => res.send(places))
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

module.exports = PlaceRouter
