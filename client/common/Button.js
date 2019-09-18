import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const Button = (props) => (
	<TouchableOpacity
		{...props}
		onPress={props.onPress}
		style={[styles.button, props.style]}
	/>
)

const styles = StyleSheet.create({
	button: {
		alignSelf: 'stretch'
	}
})
