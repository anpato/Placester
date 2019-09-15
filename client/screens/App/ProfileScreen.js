import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { background } from '../../styles/Colors'
export default class ProfileScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text> Profile</Text>
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
