const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlaceSchema = new Schema(
	{
		name: {
			required: true,
			unique: true,
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
				type: Schema.Types.ObjectId,
				ref: 'Category'
			}
		]
	},
	{
		timestamps: true
	}
)

PlaceSchema.index({ name: PlaceSchema.name }, { unique: true })

module.exports = PlaceSchema
