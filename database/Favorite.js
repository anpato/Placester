const mongoose = require('mongoose')

const FavoriteSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		location_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Place'
		}
	},
	{
		timestamps: true
	}
)

module.exports = FavoriteSchema
