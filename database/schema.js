const mongoose = require('mongoose')

// models
const userSchema = require('./User')
const placeSchema = require('./Place')
const favoriteSchema = require('./Favorite')
const friendSchema = require('./Friend')
const categorySchema = require('./Category')
// models

// schemas
const Category = mongoose.model('category', categorySchema)
const User = mongoose.model('User', userSchema)
const Place = mongoose.model('places', placeSchema)
const Favorite = mongoose.model('favorites', favoriteSchema)
const Friend = mongoose.model('friends', friendSchema)
// schemas

module.exports = {
	Category,
	Favorite,
	Friend,
	Place,
	User
}
