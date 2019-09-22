import Axios from 'axios'
import { setUser, getUserId, getToken } from './config/Credentials'
import {
	CURRENT_ADDRESS,
	HERE_KEY,
	HERE_APPID,
	GOOGLE_PLACES_KEY,
	MAPBOX_KEY
} from 'react-native-dotenv'
import { populate } from './config/LocationSearch'
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

const GoogleApi = Axios.create({
	baseURL: `https://maps.googleapis.com/maps/api/`
})

const HereApi = Axios.create({
	baseURL: `https://places.cit.api.here.com/places/v1`
})

const MapboxAPi = Axios.create({
	baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/`
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

export const geoCode = async (coords) => {
	try {
		const resp = await MapboxAPi.get(
			`${coords.lng},${coords.lat}.json?&access_token=${MAPBOX_KEY}`
		)
	} catch (error) {
		console.log(error)
	}
}

export const getPlacesImages = async (imageRef) => {
	try {
		const resp = await GoogleApi.post(
			`/place/photo?photoreference=${imageRef}&maxheight=300&key=${GOOGLE_PLACES_KEY}`
		)
		return resp.request.responseURL
	} catch (error) {
		throw error
	}
}

const getNearbyPlaces = async (coords, query) => {
	try {
		const resp = await GoogleApi.post(
			`place/nearbysearch/json?location=${coords.lat},${coords.lng}&radius=800&type=${query}&key=${GOOGLE_PLACES_KEY}`
		)
		const data = await populate(resp.data.results, getPlacesImages)
		await Api.post('/places/populate', data)
	} catch (error) {
		throw error
	}
}

export const getPlacesNearby = async (coords, query) => {
	try {
		if (query) await getNearbyPlaces(coords, query)
		const resp = await Api.get(`/places/?lat=${coords.lat}&lng=${coords.lng}`)
		return resp.data.splice(0, 10)
	} catch (error) {
		throw error
	}
}
