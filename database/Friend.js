const mongoose = require('mongoose')

const Friend = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		friend_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		isRequested: {
			type: Boolean
		},
		isAccepted: {
			type: Boolean
		},
		wasRequested: {
			type: Boolean
		}
	},
	{
		timestamps: true
	}
)

module.exports = Friend
