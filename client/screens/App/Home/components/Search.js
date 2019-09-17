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
	handleSubmit,
	handleBlur,
	searchQuery,
	inModal
}) => {
	return (
		<View style={styles.title}>
			<Text style={styles.titleText}>Search For Places</Text>
			<View style={styles.space}>
				<Input
					placeholder="Search"
					style={
						!blurred
							? [styles.input, styles.inputInactive]
							: [styles.input, styles.inputActive]
					}
					value={searchQuery}
					placeholderTextColor={primaryLight}
					selectionColor={inModal ? secondary : white}
					onChangeText={(text) => onChangeText('search', text)}
					onFocus={handleBlur}
					onBlur={handleBlur}
					onSubmitEditing={handleSubmit}
				/>
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	title: {
		flexDirection: 'row'
	},
	titleText: {
		fontSize: 24,
		flex: 1,
		marginHorizontal: 10,
		marginTop: 10,
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
	},
	inModal: {
		marginTop: 50
	}
})

export default Search
