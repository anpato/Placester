import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'

import ListButton from './ListButton'

const CategoryList = ({ data }) => {
	const renderItem = ({ _id, image_url, pluralName }) => {
		return (
			<ListButton
				image_url={image_url}
				name={pluralName}
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
				showsHorizontalScrollIndicator={false}
				horizontal={true}
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
		width: 200,
		height: 100,
		borderRadius: 20
	}
})

export default CategoryList
