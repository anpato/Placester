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
		}
	},
	{
		timestamps: true
	}
)

module.exports = CategorySchema
