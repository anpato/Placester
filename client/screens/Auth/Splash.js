import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { getToken } from '../../services/config/Credentials'

const SplashScreen = ({ navigation }) => {
	useEffect(() => {
		getToken().then((token) => {
			if (!token) navigation.navigate('SignIn')
			else navigation.navigate('App')
		})
	}, [])
	return (
		<View>
			<Text>SplashScreen</Text>
		</View>
	)
}
export default SplashScreen
