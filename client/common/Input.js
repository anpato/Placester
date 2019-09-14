import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { primary } from '../styles/Colors'

export const Input = ({
	placeholder,
	secureTextEntry,
	onChangeText,
	style
}) => {
	return (
		<TextInput
			style={[styles.input, style]}
			secureTextEntry={secureTextEntry}
			placeholder={placeholder}
			onChangeText={onChangeText}
		/>
	)
}

const styles = StyleSheet.create({
	input: {
		borderWidth: 2
		// borderColor: primary
	}
})
