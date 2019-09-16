import React, { Component } from 'react'
import { View } from 'react-native'
import { LoginButton } from 'react-native-fbsdk'
export default class FacebookLogin extends Component {
	render() {
		return (
			<View>
				<LoginButton
					publishPermissions={['email']}
					onLoginFinished={(err, result) => console.log(err, result)}
				/>
			</View>
		)
	}
}
