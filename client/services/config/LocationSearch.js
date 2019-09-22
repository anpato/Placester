export const populate = async (arr, images) => {
	return await Promise.all(
		arr.map(async (location) => {
			const image = location.photos[0].photo_reference
				? await images(location.photos[0].photo_reference)
				: []
			const obj = {
				name: location.name,
				location: {
					lat: location.geometry.location.lat,
					lng: location.geometry.location.lng,
					address: location.vicinity
				},
				images: [image],
				rating: location.rating
			}
			// console.log('incoming data', obj)
			return obj
		})
	)
}

export const reverseGeoCode = (coords) => {}

// export const populateGoogle = (arr) => {
// 	return arr.map(location => {
// 		const obj = {
// 			name: location.name,
// 			location: {
// 				lat: location.geometry.location.lat,
// 				lng: location.geometry.location.lng,
// 				address:
// 			},
// 			rating: location.rating
// 		}
// 	})
// }
