import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
	const location = navigator.geolocation.getCurrentPosition(
		(loc) => loc.coords.latitude,
		(err) => err
	)
	console.log(location)
	return (
		<View style={styles.container}>
			<Text>{location}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
})
