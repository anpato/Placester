const CategoryRouter = require('express').Router()
const { Category } = require('../database/schema')

CategoryRouter.get('/', async (req, res) => {
	try {
		res.send(
			await Category.find()
				.limit(5)
				.sort({ rating: 'descending' })
		)
	} catch (error) {
		throw error
	}
})

CategoryRouter.post('/', async (req, res) => {
	try {
		const currentCategory = await Category.findOne().where({
			name: req.body.name
		})
		if (currentCategory) {
			res.status(400).send({
				msg: `${req.body.name} already exists, would you like to add this place to ${req.body.name} instead?`
			})
		} else {
			const category = await new Category(req.body)
			await category.save()
			res.send(category)
		}
	} catch (error) {
		throw error
	}
})

module.exports = CategoryRouter
