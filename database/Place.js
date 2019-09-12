const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlaceSchema = new Schema(
	{
		name: {
			required: true,
			type: String
		},
		venue_type: {
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
			longitude: {
				type: String
			},
			latitude: {
				type: String
			}
		},
		images: {
			type: [{ type: String }]
		}
	},
	{
		timestamps: true
	}
)

module.exports = PlaceSchema
