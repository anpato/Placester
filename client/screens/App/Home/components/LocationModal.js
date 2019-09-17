import React from 'react'
import { View, Text, Modal, StyleSheet, Dimensions } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import Search from './Search'
import { dark } from '../../../../styles/Colors'

const LocationModal = ({
	data,
	modalVisible,
	onRequestClose,
	onChangeText,
	handleSubmit,
	blurred,
	handleBlur,
	value
}) => {
	const renderItem = ({ item }) => console.log(item)
	Dimensions
	return (
		<Modal
			style={styles.modal}
			animationType="slide"
			presentationStyle={styles.modal}
			visible={modalVisible}
			onRequestClose={onRequestClose}
			transparent={false}>
			<View style={styles.searchContainer}>
				<TouchableOpacity onPress={onRequestClose}>
					<Text>Close</Text>
				</TouchableOpacity>
				<Search
					onChangeText={(text) => onChangeText('search', text)}
					onFocus={handleBlur}
					onBlur={handleBlur}
					onSubmitEditing={handleSubmit}
					value={value}
					blurred={blurred}
					inModal
				/>
			</View>
			<FlatList
				data={data}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => renderItem(item)}
			/>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modal: {
		height: Dimensions.get('screen').height - 100,
		backgroundColor: dark
	},
	searchContainer: {
		marginTop: 50
	}
})

export default LocationModal
