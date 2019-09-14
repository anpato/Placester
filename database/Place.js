const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema(
	{
		name: {
			required: true,
			type: String
		},
		location: {
			address: {
				type: String
			},
			city: {
				type: String
			},
			state: {
				type: String
			},
			lng: {
				type: Number
			},
			lat: {
				type: Number
			},
			postalCode: String,
			cc: {
				type: String
			}
		},
		images: {
			type: [{ type: String }]
		},
		categories: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Category'
			}
		]
	},
	{
		timestamps: true
	}
)

module.exports = PlaceSchema
