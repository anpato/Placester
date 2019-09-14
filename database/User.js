const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema(
	{
		name: {
			first: {
				type: String,
				required: true
			},
			last: {
				type: String,
				required: true
			}
		},
		password: {
			type: String,
			required: true
		},
		email: {
			type: String,
			lowercase: true,
			unique: true,
			required: [true, "can't be blank"],
			match: [/\S+@\S+\.\S+/, 'is invalid'],
			index: true
		},
		username: {
			type: String,
			lowercase: true,
			unique: true,
			required: [true, "can't be blank"],
			match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
			index: true
		},
		facebook_id: {
			type: String
		},
		google_id: {
			type: String
		},
		profile_image: {
			type: String
		}
	},
	{
		timestamps: true
	}
)
UserSchema.plugin(uniqueValidator, { message: 'is already taken.' })
module.exports = UserSchema
