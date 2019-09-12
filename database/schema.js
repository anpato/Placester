const mongoose = require('mongoose')

// models
const userSchema = require('./User')
const placeSchema = require('./Place')
const favoriteSchema = require('./Favorite')
// models

// schemas
const User = mongoose.model('User', userSchema)
const Place = mongoose.model('places', placeSchema)
const Favorite = mongoose.model('favorites', favoriteSchema)
// schemas

module.exports = {
	Favorite,
	Place,
	User
}
