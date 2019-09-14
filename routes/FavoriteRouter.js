const FavoriteRouter = require('express').Router()
const { Favorite, Place } = require('../database/schema')

FavoriteRouter.get('/:user_id', async (req, res) => {
	try {
		await Favorite.find()
			.where({
				user_id: req.params.user_id
			})
			.populate({ path: 'places', model: Place })
			.exec((err, places) =>
				err ? res.status(400).send({ err: err }) : res.send(places)
			)
	} catch (error) {
		throw error
	}
})

FavoriteRouter.post('/:user_id', async (req, res) => {
	try {
		const favorite = await Favorite.findOne().where({
			user_id: req.params.user_id
		})
		if (!favorite || !favorite.places.includes(req.body.places)) {
			const newFavorite = await new Favorite({
				user_id: req.params.user_id,
				places: req.body.places
			})
			await newFavorite.save()
			res.send(newFavorite)
		} else
			res.status(400).send({ msg: `You've already favorited that location.` })
	} catch (error) {
		throw error
	}
})

FavoriteRouter.delete('/user/:user_id/location/:place_id', async (req, res) => {
	try {
		const place = await Place.findById(req.params.place_id)
		const favorite = await Favorite.findOne().where({
			user_id: req.params.user_id,
			places: req.params.place_id
		})
		if (favorite) {
			await Favorite.findOneAndDelete().where({ places: req.params.place_id })
			res.send({ msg: `Removed ${place.name} from your favorites` })
		} else res.send({ msg: `${place.name} is not in your favorites.` })
	} catch (error) {
		throw error
	}
})

module.exports = FavoriteRouter
