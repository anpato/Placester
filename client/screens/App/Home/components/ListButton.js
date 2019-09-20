import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Button } from '../../../../common/Button'
import { shadowStyle } from '../../../../styles/Styles'
import { Platform } from '@unimodules/core'
import { white } from '../../../../styles/Colors'

const ListButton = ({ id, image_url, name, style, imageStyle }) => {
	return (
		<Button
			style={[styles.button, shadowStyle]}
			onPress={() => console.log(id)}>
			<View style={style}>
				<Image
					source={{ uri: image_url }}
					style={[{ borderRadius: 20 }, imageStyle]}
				/>
				<View style={styles.overlay}>
					<Text style={styles.text}>{name}</Text>
				</View>
			</View>
		</Button>
	)
}

const styles = StyleSheet.create({
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
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		borderRadius: 20
	},
	text: {
		color: white,
		fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
		fontSize: 24,
		alignSelf: 'center',
		paddingVertical: 10,
		textAlign: 'center'
	}
})

export default ListButton
