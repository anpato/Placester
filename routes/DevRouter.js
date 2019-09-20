const DevRouter = require('express').Router()
const { Place, Category } = require('../database/schema')

DevRouter.put('/', async (req, res) => {
	try {
		const places = await Place.find()
		const categories = await Category.find()

		places.forEach((place) => {
			categories.forEach((category) => {
				if (
					place.name.toLowerCase().includes('family', 'park', 'museum', 'beach')
				) {
				}
			})
		})
	} catch (error) {
		throw error
	}
})

module.exports = DevRouter
