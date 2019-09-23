export const populate = async (arr, images) => {
	return await Promise.all(
		arr.map(async (location) => {
			const image = await images(location.id)
			const obj = {
				name: location.name,
				location: {
					lat: location.location.lat,
					lng: location.location.lng,
					address: location.location.formattedAddress[0],
					state: location.location.state,
					cc: location.location.cc,
					city: location.location.city
				},
				images: image ? [`${image.prefix}400x500${image.suffix}`] : [],
				rating: 0
			}
			console.log(obj)
			return obj
		})
	)
}

export const reverseGeoCode = (coords) => {}

export const retrieveFromFourSquare = async (arr, fourSquare) => {
	return await Promise.all(arr.map())
}
