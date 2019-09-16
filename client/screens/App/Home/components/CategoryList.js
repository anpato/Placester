import React from 'react'
import { View, FlatList, Image, Text, StyleSheet } from 'react-native'
import { white } from '../../../../styles/Colors'
import { shadowStyle } from '../../../../styles/Styles'
import { Button } from '../../../../common/Button'
import { Platform } from '@unimodules/core'

const CategoryList = ({ data }) => {
	const renderItem = ({ _id, image_url, pluralName }) => {
		return (
			<Button
				style={[styles.button, shadowStyle]}
				onPress={() => console.log(_id)}>
				<View style={[styles.card]}>
					<Image
						source={{ uri: image_url }}
						style={{
							borderRadius: 20,
							width: styles.card.width,
							height: styles.card.height
						}}
					/>
					<View style={styles.overlay}>
						<Text style={styles.text}>{pluralName}</Text>
					</View>
				</View>
			</Button>
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
		borderRadius: 20,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	button: {
		alignItems: 'center',
		marginHorizontal: 10,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	overlay: {
		position: 'absolute',
		backgroundColor: 'rgba(0,0,0,0.8)',
		width: 200,
		height: 100,
		justifyContent: 'center',
		borderRadius: 20
	},
	text: {
		color: white,
		fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
		fontSize: 24,
		alignSelf: 'center',

		paddingVertical: 10
	}
})

export default CategoryList
