import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input } from '../../../../common'
import {
	primary,
	primaryLight,
	white,
	secondary,
	dark
} from '../../../../styles/Colors'
import { Platform } from '@unimodules/core'

const Search = ({
	blurred,
	onChangeText,
	onSubmitEditing,
	onEndEditing,
	handleBlur,
	inModal
}) => {
	return (
		<View style={styles.title}>
			<Text style={styles.titleText}>Search For Places</Text>
			<View style={styles.space}>
				<Input
					placeholder="Search"
					style={
						(blurred
							? [styles.input, styles.inputInactive]
							: [styles.input, styles.inputActive],
						inModal
							? [styles.input, styles.inputActive]
							: [styles.input, styles.inputInactive])
					}
					placeholderTextColor={primaryLight}
					selectionColor={inModal ? secondary : white}
					onChangeText={onChangeText}
					onFocus={handleBlur}
					onEndEditing={onEndEditing}
					onSubmitEditing={onSubmitEditing}
					onBlur={handleBlur}
				/>
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	title: {
		flexDirection: 'row',
		marginTop: Platform.OS === 'ios' ? 40 : 0
	},
	titleText: {
		fontSize: 24,
		flex: 1,
		marginHorizontal: 10,

		color: secondary,
		fontFamily: Platform.OS === 'ios' ? 'Avenir-Heavy' : 'Roboto'
	},
	space: {
		flex: 2
	},
	inputActive: {
		borderBottomColor: primary
	},
	inputInactive: {
		borderBottomColor: dark
	},
	input: {
		borderBottomWidth: 2,
		marginTop: 10,
		marginHorizontal: 20,
		paddingVertical: 10,
		fontSize: 18,
		color: white
	}
})

export default Search
