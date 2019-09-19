import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'
import { white, dark, cameraBg } from '../../../styles/Colors'
import { Platform } from '@unimodules/core'
import { Ionicons } from '@expo/vector-icons'
import { NavigationEvents } from 'react-navigation'

export default class CameraPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hasCameraPermission: null,
			type: Camera.Constants.Type.back,
			loaded: false
		}
	}

	async componentDidMount() {
		await this.handleCameraLoad()
	}

	handleCameraLoad = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		this.setState({ hasCameraPermission: status === 'granted', loaded: true })
	}

	toggleCamera = () => {
		this.setState({
			type:
				this.state.type === Camera.Constants.Type.back
					? Camera.Constants.Type.front
					: Camera.Constants.Type.back
		})
	}

	snapPhoto = async () => {
		if (this.camera) {
			let photo = await this.camera.takePictureAsync({ skipProcessing: true })
			console.log(photo)
		}
	}

	render() {
		const { hasCameraPermission, loaded } = this.state
		if (hasCameraPermission === null) {
			return <View />
		} else if (hasCameraPermission === false) {
			return <Text>Access to camera has been denied.</Text>
		}
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					backgroundColor: cameraBg
				}}>
				<NavigationEvents
					onDidBlur={() => this.setState({ loaded: false })}
					onWillFocus={() => this.setState({ loaded: true })}
				/>
				<View style={styles.controls}>
					<TouchableOpacity
						style={styles.navButtons}
						onPress={() => this.props.navigation.navigate('Main')}>
						<Ionicons
							name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
							color={white}
							size={32}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.navButtons}>
						<Ionicons color={white} size={32} />
					</TouchableOpacity>
				</View>
				{loaded ? (
					<Camera
						ref={(ref) => {
							this.camera = ref
						}}
						autoFocus={Camera.Constants.AutoFocus.on}
						type={this.state.type}
						style={styles.camera}
					/>
				) : null}
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.navButtons}
						onPress={this.toggleCamera}>
						<Ionicons
							name={
								Platform.OS === 'ios'
									? 'ios-reverse-camera'
									: 'md-reverse-camera'
							}
							color={white}
							size={32}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.snapPhoto}>
						<Ionicons
							name={
								Platform.OS === 'ios'
									? 'ios-radio-button-on'
									: 'md-radio-button-on'
							}
							color={white}
							size={52}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.navButtons}
						onPress={this.toggleCamera}>
						<Ionicons
							name={Platform.OS === 'ios' ? 'ios-albums' : 'md-albums'}
							color={white}
							size={32}
						/>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	camera: {
		flex: 3
	},
	controls: {
		flex: 0.4,
		backgroundColor: cameraBg,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between'
	},
	navButtons: {
		marginHorizontal: 20
	},
	buttonContainer: {
		flex: 0.3,
		paddingVertical: 10,
		alignSelf: 'stretch',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: cameraBg
	},
	shutterButtonOuter: {
		position: 'absolute',
		height: 50,
		width: 50,
		backgroundColor: white,
		borderRadius: 40
	},
	shutterButtonMiddle: {
		position: 'absolute',
		backgroundColor: dark,
		alignItems: 'center',
		height: 40,
		width: 40,
		borderRadius: 40
	},
	shutterButtonInner: {
		alignSelf: 'center',
		position: 'absolute',
		backgroundColor: white,
		height: 30,
		width: 30,
		borderRadius: 40
	}
})
