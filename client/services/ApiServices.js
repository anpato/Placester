import Axios from 'axios'
import { setUser, getUserId, getToken } from './config/Credentials'
import {
	CURRENT_ADDRESS,
	CLIENT_ID,
	CLIENT_SECRET,
	HERE_KEY,
	HERE_APPID,
	GOOGLE_PLACES_KEY,
	MAPBOX_KEY
} from 'react-native-dotenv'
import { populate } from './config/LocationSearch'
const BASE_URL = `http://192.168.2.6:3001`
const JwtToken = 'token'
const date = `20180802`

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

const FourSquareApi = Axios.create({
	baseURL: `https://api.foursquare.com/v2/venues`
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
		let resp
		if (query) {
			resp = await GoogleApi.post(
				`place/nearbysearch/json?location=${coords.lat},${coords.lng}&radius=800&q=${query}key=${GOOGLE_PLACES_KEY}`
			)
		} else {
			resp = await GoogleApi.post(
				`place/nearbysearch/json?location=${coords.lat},${coords.lng}&radius=800&key=${GOOGLE_PLACES_KEY}`
			)
		}

		return resp.data.results.map((location) => {
			const coords = {
				lat: location.geometry.location.lat,
				lng: location.geometry.location.lng
			}
			return coords
		})
	} catch (error) {
		throw error
	}
}

const fourSquarePlaces = async (data) => {
	try {
		let results = await Promise.all(
			await data.map(async (coord) => {
				const resp = await FourSquareApi.get(
					`/search/?ll=${coord.lat},${coord.lng}&radius=500&limit=10&client_secret=${CLIENT_SECRET}&client_id=${CLIENT_ID}&v=${date}`
				)
				return resp.data.response.venues
			})
		)
		return [...results[0]]
	} catch (error) {
		throw error
	}
}

const fourSquareImages = async (location_id) => {
	try {
		const resp = await FourSquareApi.get(
			`/${location_id}/photos?client_secret=${CLIENT_SECRET}&client_id=${CLIENT_ID}&v=${date}`
		)
		return resp.data.response.photos.items[1]
	} catch (error) {
		console.log(error)
	}
}

export const getPlacesNearby = async (coords, query) => {
	try {
		const data = await getNearbyPlaces(coords, query)
		const places = await fourSquarePlaces(data)
		const incomingData = await populate(places, fourSquareImages)
		const results = await Api.post('/places/populate', incomingData)
		return results.data
	} catch (error) {
		throw error
	}
}
