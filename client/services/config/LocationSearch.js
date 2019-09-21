import { HERE_KEY, HERE_APPID } from 'react-native-dotenv'
import Axios from 'axios'
import { Api } from '../ApiServices'

const HereApi = Axios.create({
	baseURL: `https://places.cit.api.here.com/places/v1`
})

const populate = (arr) => {
	arr.splice(0, 1)
	return arr.map((location) => {
		const address = location.vicinity.replace('<br/>', ',').split(',')
		const state = address[2] !== undefined ? address[2].split(' ') : ''
		console.log(state)
		const obj = {
			name: location.title,
			location: {
				lat: location.position[0],
				lng: location.position[1],
				address: address[0],
				postalCode: state[2],
				city: address[1],
				state: state[0]
			}
		}
		return obj
	})
}

export const getNearbyPlaces = async (coords, query) => {
	try {
		const resp = await HereApi.get(
			`/autosuggest?at=${coords.lat},${coords.lng}&q=restaurants&app_id=${HERE_APPID}&app_code=${HERE_KEY}&pretty`
		)
		resp.data.results.splice(0, 1)
		const data = populate(resp.data.results)
		await Api.post('/places/populate', data)
		console.log(data)
	} catch (error) {
		console.log(error)
	}
}
