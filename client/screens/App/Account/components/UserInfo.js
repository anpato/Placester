import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native'
import { primary, white } from '../../../../styles/Colors'
import { shadowStyle } from '../../../../styles/Styles'
import { Platform } from '@unimodules/core'
import { Ionicons } from '@expo/vector-icons'

const UserInfo = ({ handleLogout, user, style }) => (
	<View style={[styles.container, style]}>
		<TouchableOpacity style={styles.icon} onPress={handleLogout}>
			<Ionicons
				name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
				size={32}
				color={primary}
			/>
		</TouchableOpacity>
		<View style={[styles.imageContainer, shadowStyle]}>
			<Image
				source={
					user.profile_image
						? { uri: user.profile_image }
						: require('../../../../assets/emptyProfile.jpg')
				}
				style={[styles.image]}
			/>
		</View>
		<View style={styles.userinfo}>
			<Text style={styles.text}>Hey {user.first}!</Text>
		</View>
	</View>
)

const styles = StyleSheet.create({
	container: {
		marginTop: Platform.OS === 'android' ? 60 : 0,
		alignSelf: 'stretch',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomColor: primary,
		borderBottomWidth: 2
	},
	icon: {
		position: 'absolute',
		alignSelf: 'flex-end',
		top: 10,
		right: 20
	},
	imageContainer: {
		borderRadius: 50
	},
	image: {
		height: 100,
		width: 100,
		borderRadius: 50
	},
	text: {
		fontSize: 24,
		color: white,
		fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto'
	},
	userinfo: {
		marginVertical: 10,
		justifyContent: 'center'
	}
})

export default UserInfo
