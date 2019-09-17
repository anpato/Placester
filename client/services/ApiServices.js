import Axios from 'axios'
import { setUser, getUserId, getToken } from './config/Credentials'
import { CLIENT_SECRET, CLIENT_ID } from 'react-native-dotenv'
const BASE_URL = 'http:///192.168.1.6:3001'
const JwtToken = 'token'

const Api = Axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: `Bearer ${JwtToken}`,
		'Access-Control-Allow-Origin': '*'
	}
})

export const loginUser = async (data) => {
	try {
		const resp = await Api.post('/auth/login', data)
		await setUser(resp.data.user._id, resp.data.token)
		return { status: resp.status }
	} catch (error) {
		throw error
	}
}

export const signUpUser = async (data) => {
	try {
		const resp = await Api.post('/auth/signup', data)
		return resp.status
	} catch (error) {
		throw error
	}
}

export const getCategories = async () => {
	try {
		const resp = await Api.get('/categories')
		return resp.data
	} catch (error) {
		throw error
	}
}

export const searchPlaces = async (query) => {
	try {
		const resp = await Api.get(`/places?search=${query}`)
		return resp.data
	} catch (error) {
		throw error
	}
}
