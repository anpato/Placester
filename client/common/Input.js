import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { Platform } from '@unimodules/core'

export const Input = ({
	placeholder,
	secureTextEntry,
	onChangeText,
	placeholderTextColor,
	selectionColor,
	value,
	style
}) => {
	return (
		<TextInput
			autoCompleteType="off"
			spellCheck={false}
			selectionColor={selectionColor}
			placeholderTextColor={placeholderTextColor}
			style={[style, styles.input]}
			secureTextEntry={secureTextEntry}
			placeholder={placeholder}
			onChangeText={onChangeText}
			value={value}
		/>
	)
}

const styles = StyleSheet.create({
	input: {
		fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
		letterSpacing: 1.6
	}
})
