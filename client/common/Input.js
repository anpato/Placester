import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { Platform } from '@unimodules/core'

export const Input = ({
	placeholder,
	secureTextEntry,
	onChangeText,
	placeholderTextColor,
	selectionColor,
	onSubmitEditing,
	onEndEditing,
	onFocus,
	onBlur,
	style
}) => {
	return (
		<TextInput
			autoCompleteType="off"
			spellCheck={false}
			selectionColor={selectionColor}
			placeholderTextColor={placeholderTextColor}
			placeHolderStyle={{ color: 'blue' }}
			style={[style, styles.input]}
			secureTextEntry={secureTextEntry}
			placeholder={placeholder}
			onChangeText={onChangeText}
			onBlur={onBlur}
			onSubmitEditing={onSubmitEditing}
			clearButtonMode="while-editing"
			keyboardAppearance="dark"
			onEndEditing={onEndEditing}
			enablesReturnKeyAutomatically
			onFocus={onFocus}
		/>
	)
}

const styles = StyleSheet.create({
	input: {
		fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
		letterSpacing: 1.6
	}
})
