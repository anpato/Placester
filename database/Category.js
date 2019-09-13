const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema(
	{
		name: {
			type: String
		},
		pluralName: {
			type: String
		},
		rating: {
			type: Number
		},
		image_url: {
			type: String
		}
	},
	{
		timestamps: true
	}
)

module.exports = CategorySchema
