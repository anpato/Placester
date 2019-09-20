import Axios from 'axios'
import { setUser, getUserId, getToken } from './config/Credentials'
import { CLIENT_SECRET, CLIENT_ID, CURRENT_ADDRESS } from 'react-native-dotenv'
const BASE_URL = `http://${CURRENT_ADDRESS}:3001`
const JwtToken = 'token'
const today = new Date()
let dd = today.getDate()
let mm = today.getMonth()
dd < 10 ? (dd = `0${dd}`) : dd
mm < 10 ? (mm = `0${mm}`) : mm
const yyyy = today.getFullYear()
const date = `${yyyy}${mm}${dd}`

const Api = Axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: `Bearer ${JwtToken}`,
		'Access-Control-Allow-Origin': '*'
	}
})

const FourSquare = Axios.create({
	baseURL: 'https://api.foursquare.com/v2/venues'
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

export const getUserProfile = async () => {
	try {
		const userId = await getUserId()
		const resp = await Api.get(`/auth/${userId}`)
		return resp.data
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

const getFourSquarePlaces = async (coords) => {
	const resp = await FourSquare.get(
		`/search?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&ll=${coords.lat},
			${coords.lng}&v=${date}`
	)
	if (resp) {
		const data = resp.data.response.venues.map((place, index) => {
			const places = {
				name: place.name,
				location: {
					lat: place.location.lat,
					lng: place.location.lng,
					city: place.location.city,
					state: place.location.state,
					cc: place.location.cc
				}
			}
			return places
		})
		await Api.post('/places/populate', data)
	}
	return true
}

export const getPlacesNearby = async (coords) => {
	try {
		// await getFourSquarePlaces(coords)
		const resp = await Api.get(`/places/?lat=${coords.lat}&lng=${coords.lng}`)
		return resp.data.splice(0, 10)
	} catch (error) {
		throw error
	}
}
