import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { dark, background } from '../../styles/Colors'
export default class HomeScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>Home</Text>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: background,
		justifyContent: 'center',
		alignItems: 'center'
	}
})
