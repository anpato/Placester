import React from 'react'
import { View, FlatList, Image, Text, StyleSheet } from 'react-native'
import { shadow, dark, white } from '../../../../styles/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TouchableRipple } from 'react-native-paper'
import { shadowStyle } from '../../../../styles/Styles'

const CategoryList = ({ data }) => {
	const renderItem = ({ _id, image_url, pluralName }) => {
		return (
			<View style={styles.card}>
				<TouchableOpacity style={styles.button}>
					<Image source={{ uri: image_url }} style={styles.image} />
					<Text style={styles.text}>{pluralName}</Text>
				</TouchableOpacity>
			</View>
		)
	}
	return (
		<View>
			<FlatList
				horizontal={true}
				data={data}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => renderItem(item)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		alignSelf: 'stretch',
		backgroundColor: dark,
		borderRadius: 10,
		alignItems: 'center',
		marginHorizontal: 10,
		padding: 20
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		borderRadius: 20,
		height: 100,
		width: 100
	},
	text: {
		color: white,
		fontSize: 18,
		backgroundColor: shadow,
		paddingBottom: 20
	}
})

export default CategoryList
