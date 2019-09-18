const DevRouter = require('express').Router()
const { Place, Category } = require('../database/schema')

DevRouter.put('/', async (req, res) => {
	try {
		await Place.find().exec((err, data) => {
			const places = data.filter(async (place) => {
				if (place.name.toLowerCase().includes(req.query.name.toLowerCase())) {
					const newPlaces = await Place.findByIdAndUpdate(place._id, {
						categories: [req.query.category]
					})
					return newPlaces
				} else {
					return null
				}
			})
			res.send(places)
			console.log(places)
		})
	} catch (error) {
		throw error
	}
})

module.exports = DevRouter
