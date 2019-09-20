import React from 'react'
import { TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { primary } from '../styles/Colors'

export const FloatingAction = (props) => {
	return <TouchableOpacity {...props} style={styles.button} />
}

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		backgroundColor: primary,
		paddingHorizontal: 5,
		height: 60,
		width: 60,
		borderRadius: 100,
		bottom: 5
	}
})
