const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

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
			lng: {
				type: Number
			},
			lat: {
				type: Number
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
		],
		rating: {
			type: Number
		}
	},
	{
		timestamps: true
	}
)
PlaceSchema.plugin(uniqueValidator)

module.exports = PlaceSchema
