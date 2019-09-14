const FriendRouter = require('express').Router()
const { Friend, User } = require('../database/schema')

FriendRouter.get('/:user_id', async (req, res) => {
	try {
		await Friend.find()
			.where({
				user_id: req.params.user_id,
				isAccepted: true
			})
			.populate({ path: 'friend_id', model: User })
			.exec((err, user) =>
				err
					? res.status(400).send({ err: err })
					: user
					? res.send(user)
					: res.send({ msg: 'No friends added!' })
			)
	} catch (error) {
		throw error
	}
})

FriendRouter.get('/:user_id/requests', async (req, res) => {
	try {
		if (req.query.sent) {
			await Friend.find()
				.where({
					user_id: req.params.user_id,
					isRequested: true
				})
				.populate({ path: 'friend_id', model: User })
				.exec((err, user) =>
					err
						? res.status(400).send({ err: err })
						: user.length
						? res.send(user)
						: res.send({ msg: 'No Requests' })
				)
		}
		if (req.query.requests) {
			await Friend.find()
				.where({
					user_id: req.params.user_id,
					wasRequested: true
				})
				.populate({ path: 'friend_id', model: User })
				.exec((err, user) =>
					err
						? res.status(400).send({ err: err })
						: user.length
						? res.send(user)
						: res.send({ msg: 'No Requests Sent' })
				)
		}
	} catch (error) {
		throw error
	}
})

FriendRouter.post('/:user_id/request/:friend_id', async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.user_id })
		const friend = await User.findOne({ _id: req.params.friend_id })

		const findRequest = await Friend.findOne().where({
			user_id: user._id,
			friend_id: friend._id
		})
		if (findRequest)
			res
				.status(400)
				.send({ err: `You've already sent a request to ${friend.username}.` })
		else {
			const createRequest = new Friend({
				user_id: user._id,
				friend_id: friend._id,
				isRequested: true,
				isAccepted: false,
				wasRequested: false
			})

			const sendRequest = new Friend({
				user_id: req.params.friend_id,
				friend_id: req.params.user_id,
				isAccepted: false,
				wasRequested: true,
				isRequested: false
			})
			await sendRequest.save()
			await createRequest.save()
			res.send(createRequest)
		}
	} catch (error) {
		throw error
	}
})

FriendRouter.put('/:user_id/accept/:friend_id', async (req, res) => {
	try {
		const setBools = {
			isAccepted: true,
			isRequested: false,
			wasRequested: false
		}

		const friend = await Friend.findOne().where({
			user_id: req.params.user_id,
			friend_id: req.params.friend_id
		})
		const requestedFriend = await Friend.findOne().where({
			user_id: req.params.friend_id,
			friend_id: req.params.user_id
		})
		await Friend.updateOne(setBools).where({
			user_id: req.params.user_id,
			friend_id: req.params.friend_id
		})
		await Friend.updateOne(setBools).where({
			user_id: req.params.friend_id,
			friend_id: req.params.user_id
		})
		res.send({ friend, requestedFriend })
	} catch (error) {
		throw error
	}
})

FriendRouter.delete('/:user_id/remove/:friend_id', async (req, res) => {
	try {
		await Friend.findOne()
			.where({
				user_id: req.params.user_id,
				friend_id: req.params.friend_id
			})
			.remove()
		await Friend.findOne()
			.where({
				user_id: req.params.friend_id,
				friend_id: req.params.user_id
			})
			.remove()
		res.send({ msg: 'Request Deleted' })
	} catch (error) {
		throw error
	}
})

module.exports = FriendRouter
