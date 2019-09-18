import React from 'react'
import { View, FlatList, StyleSheet, Dimensions } from 'react-native'
import ListButton from './ListButton'

const NearbyPlaces = ({ data }) => {
	const renderItem = ({ _id, image_url, name }) => {
		return (
			<ListButton
				image_url={image_url}
				name={name}
				imageStyle={{
					width: styles.card.width,
					height: styles.card.height
				}}
				id={_id}
				style={styles.card}
			/>
		)
	}
	return (
		<View style={styles.container}>
			<FlatList
				showsVerticalScrollIndicator={false}
				initialNumToRender={10}
				data={data}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => renderItem(item)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'stretch',
		marginTop: 10,
		paddingVertical: 10
	},
	card: {
		margin: 10,
		alignSelf: 'stretch',
		width: 'auto',
		height: 200,
		borderRadius: 20
	}
})

export default NearbyPlaces
