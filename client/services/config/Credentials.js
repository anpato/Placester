import { AsyncStorage } from 'react-native'
import { uploadFile } from 'react-s3'
import { awsConfig } from './AwsConfig'
import { DIRNAME } from 'react-native-dotenv'

export const setUser = async (userId, token) => {
	try {
		await AsyncStorage.multiSet(
			[['user_id', userId], ['user_token', token]],
			(err) => (err ? alert(err) : null)
		)
	} catch (error) {
		console.log(error)
	}
}

export const getToken = async () => {
	try {
		const token = await AsyncStorage.getItem('user_token')
		if (token) {
			return token
		}
	} catch (error) {
		throw error
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

export const uploadProfileImage = (file) =>
	uploadFile(file, awsConfig(DIRNAME))
		.then((data) => data.location)
		.catch((err) => err.toString())
