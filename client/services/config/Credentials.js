import { AsyncStorage } from 'react-native'

export const setUser = async (userId, token) => {
	try {
		await AsyncStorage.multiSet([
			['user_id', userId.toString()],
			['token', token]
		])
	} catch (error) {
		console.log(error)
	}
}

export const getToken = async () => {
	try {
		const token = await AsyncStorage.getItem('token')
		if (token) token
		else {
			let err = new Error('No Token')
			return err
		}
	} catch (error) {
		console.log(error)
	}
}

export const getUserId = async () => {
	try {
		const userId = await AsyncStorage.getItem('user_id')
		return userId
	} catch (error) {
		console.log(error)
	}
}

export const logOut = async () => {
	try {
		await AsyncStorage.clear()
	} catch (error) {
		console.log(error)
	}
}
