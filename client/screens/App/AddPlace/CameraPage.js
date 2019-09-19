import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'

export default class CameraPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hasCameraPermission: null,
			type: Camera.Constants.Type.back
		}
	}

	async componentDidMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		this.setState({ hasCameraPermission: status === 'granted' })
	}

	initializeCamera = async () => {}

	render() {
		const { hasCameraPermission } = this.state

		if (hasCameraPermission === null) {
			return <View />
		} else if (hasCameraPermission === false) {
			return <Text>Access to camera has been denied.</Text>
		}
		return (
			<Camera style={{ flex: 1 }} type={this.state.type} useCamera2Api>
				<View
					style={{
						flex: 1,
						backgroundColor: 'transparent',
						flexDirection: 'row'
					}}>
					<TouchableOpacity
						style={{
							flex: 0.1,
							alignSelf: 'flex-end',
							alignItems: 'center'
						}}
						onPress={() => {
							this.setState({
								type:
									this.state.type === Camera.Constants.Type.back
										? Camera.Constants.Type.front
										: Camera.Constants.Type.back
							})
						}}>
						<Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
							{' '}
							Flip{' '}
						</Text>
					</TouchableOpacity>
				</View>
			</Camera>
		)
	}
}
