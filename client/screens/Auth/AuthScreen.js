import React, { Component } from 'react'
import { View, Text, StyleSheet, LayoutAnimation } from 'react-native'
import { Input, Button, Spinner } from '../../common'
import {
	primary,
	white,
	secondary,
	primaryLight,
	dark,
	background
} from '../../styles/Colors'
import { shadowStyle } from '../../styles/Styles'
import { Ionicons } from '@expo/vector-icons'
import { Platform } from '@unimodules/core'
import { loginUser } from '../../services/ApiServices'
import FacebookLogin from './FacebookLogin'

export default class AuthScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			isLoading: false,
			isError: false,
			errorMsg: ''
		}
	}

	componentDidUpdate() {
		LayoutAnimation.easeInEaseOut()
	}

	handleChange = (query, value) =>
		this.setState({ [query]: value, isError: false })

	handleSubmit = async () => {
		this.setState({ isLoading: true })
		const { username, password } = this.state
		try {
			const resp = await loginUser({ username, password })
			if (resp.status === 200) this.props.navigation.navigate('App')
		} catch (error) {
			this.setState({ isError: true, isLoading: false })
		}
	}

	render() {
		const loginIcon = Platform.OS === 'ios' ? 'ios-log-in' : 'md-log-in'
		const key = Platform.OS === 'ios' ? 'ios-key' : 'md-key'
		return (
			<View style={styles.container}>
				<View style={[styles.formContainer, shadowStyle]}>
					<View style={styles.inputSection}>
						<Ionicons
							name={loginIcon}
							size={20}
							style={styles.inputIcon}
							color={primary}
						/>
						<Input
							selectionColor={white}
							placeholder="Username"
							placeholderTextColor={primaryLight}
							onChangeText={(text) => this.handleChange('username', text)}
							style={styles.input}
							value={this.state.username}
						/>
					</View>
					<View style={styles.inputSection}>
						<Ionicons
							name={key}
							size={20}
							style={styles.inputIcon}
							color={primary}
						/>
						<Input
							selectionColor={white}
							onChangeText={(text) => this.handleChange('password', text)}
							placeholder="Password"
							placeholderTextColor={primaryLight}
							secureTextEntry={true}
							style={styles.input}
							value={this.state.password}
						/>
						{this.state.isError ? <Text>{this.state.errorMsg}</Text> : null}
					</View>
				</View>
				<View style={styles.buttons}>
					<Button
						style={[styles.signIn, styles.button, shadowStyle]}
						onPress={this.handleSubmit}>
						{this.state.isLoading ? (
							<Spinner size="small" color={dark} />
						) : (
							<Text style={[styles.buttonText, styles.signInText]}>
								Sign In
							</Text>
						)}
					</Button>
					<Button
						onPress={() => this.props.navigation.navigate('SignUp')}
						style={[
							styles.signUp,
							shadowStyle,
							this.state.isLoading ? styles.buttonHide : null
						]}>
						<Text style={styles.buttonText}>Sign Up</Text>
					</Button>
				</View>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		fontFamily: Platform.OS === 'ios' ? 'Avenir-Heavy' : 'Roboto',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: dark
	},
	formContainer: {
		backgroundColor: background,
		marginHorizontal: 10,
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 60,
		borderRadius: 10
	},
	inputSection: {
		flexDirection: 'row',
		borderBottomColor: primary,
		borderBottomWidth: 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10,
		marginHorizontal: 20,
		borderRadius: 10
	},
	input: {
		fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
		letterSpacing: 1.6,
		flex: 1,
		marginHorizontal: 10,
		paddingVertical: 5,
		fontSize: 16,
		color: white
	},
	inputIcon: {
		marginHorizontal: 5
	},
	buttons: {
		marginTop: 20,
		paddingVertical: 20,
		flexDirection: 'column',
		alignSelf: 'stretch',
		justifyContent: 'space-between'
	},
	signIn: {
		backgroundColor: primary,
		paddingVertical: 15,
		paddingHorizontal: 60,
		borderTopLeftRadius: 40,
		borderBottomLeftRadius: 40,
		alignSelf: 'flex-end'
	},
	signUp: {
		backgroundColor: secondary,
		alignSelf: 'flex-start',
		paddingVertical: 10,
		paddingHorizontal: 60,
		borderTopRightRadius: 20,
		borderBottomRightRadius: 20,
		transform: [{ translateX: 0 }]
	},
	buttonHide: {
		transform: [{ translateX: -500 }]
	},
	signInText: {
		fontFamily: Platform.OS === 'ios' ? 'Avenir-Heavy' : 'Roboto'
	},
	signUpText: {
		fontFamily: Platform.OS === 'ios' ? 'Avenir-UltraLight' : 'Roboto'
	},
	buttonText: {
		color: dark,
		fontSize: 16
	}
})
