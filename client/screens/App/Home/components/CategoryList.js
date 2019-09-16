import React from 'react'
import {
	View,
	FlatList,
	Image,
	Text,
	StyleSheet,
	ImageBackground
} from 'react-native'
import { shadow, dark, white } from '../../../../styles/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { shadowStyle } from '../../../../styles/Styles'

const CategoryList = ({ data }) => {
	const renderItem = ({ _id, image_url, pluralName }) => {
		return (
			<TouchableOpacity style={styles.button}>
				<View style={[styles.card]}>
					<ImageBackground
						imageStyle={{
							borderRadius: 20
						}}
						source={{ uri: image_url }}
						style={{
							width: '100%',
							height: '100%'
						}}>
						<Text style={styles.text}>{pluralName}</Text>
					</ImageBackground>
				</View>
			</TouchableOpacity>
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
		borderRadius: 20,
		width: 200,
		height: 100,
		alignItems: 'center'
	},
	button: {
		marginHorizontal: 10,
		borderRadius: 20,
		justifyContent: 'center'
	},
	text: {
		color: white,
		fontSize: 18,
		backgroundColor: 'rgba(0,0,0,0.5)',
		flex: 1,
		alignSelf: 'stretch',
		paddingBottom: 20
	}
})

export default CategoryList
