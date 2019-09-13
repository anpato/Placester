const mongoose = require('mongoose')

// models
const userSchema = require('./User')
const placeSchema = require('./Place')
const favoriteSchema = require('./Favorite')
const friendSchema = require('./Friend')
// models

// schemas
const User = mongoose.model('User', userSchema)
const Place = mongoose.model('places', placeSchema)
const Favorite = mongoose.model('favorites', favoriteSchema)
const Friend = mongoose.model('friends', friendSchema)
// schemas

module.exports = {
	Favorite,
	Friend,
	Place,
	User
}
