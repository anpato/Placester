import React, { Component } from 'react'
import { View, Text, StyleSheet, LayoutAnimation, Keyboard } from 'react-native'
import {
	dark,
	background,
	primary,
	white,
	primaryLight,
	secondary
} from '../../styles/Colors'
import { Input, Button, Spinner } from '../../common'
import { Platform } from '@unimodules/core'
import { shadowStyle } from '../../styles/Styles'
import { signUpUser } from '../../services/ApiServices'
import { ScrollView } from 'react-native-gesture-handler'
export default class SignUpScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			first: '',
			last: '',
			email: '',
			password: '',
			confirmPassword: '',
			username: '',
			isLoading: false,
			isError: false,
			errorMsg: ''
		}
	}

	componentDidMount() {
		this.keyboardDidShow = Keyboard.addListener(
			'keyboardDidShow',
			this._keyboardDidShow
		)
		this.keyboardDidHide = Keyboard.addListener(
			'keyboardDidHide',
			this._keyboardDidHide
		)
	}

	componentWillUnmount() {
		this.keyboardDidShow.remove()
		this.keyboardDidHide.remove()
	}

	componentDidUpdate() {
		LayoutAnimation.easeInEaseOut()
	}

	_keyboardDidShow = () => this.setState({ keyboardOpen: true })
	_keyboardDidHide = () => this.setState({ keyboardOpen: false })

	handleChange = (query, value) =>
		this.setState({ [query]: value, isError: false })

	handleSubmit = async () => {
		const { username, first, last, email, password } = this.state
		try {
			this.setState({ isLoading: true, keyboardOpen: false })
			const signUp = await signUpUser({
				username,
				name: { first, last },
				email,
				password
			})
			if (signUp.status == 200) this.props.navigation.navigate('Confirm')
		} catch (error) {
		} finally {
			this.setState({ isLoading: false })
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View
					style={[
						styles.column,
						this.state.keyboardOpen ? { marginBottom: 200 } : null
					]}>
					<Button
						style={[styles.button, styles.backButton, shadowStyle]}
						onPress={() => this.props.navigation.goBack()}>
						{this.state.isLoading ? (
							<Spinner color={dark} size="small" />
						) : (
							<Text style={styles.backButtonText}>Go Back</Text>
						)}
					</Button>
					<View style={styles.formContainer}>
						<Input
							onChangeText={(text) => this.handleChange('first', text)}
							placeholder="First Name"
							style={styles.input}
							placeholderTextColor={primaryLight}
							value={this.state.first}
						/>
						<Input
							onChangeText={(text) => this.handleChange('last', text)}
							placeholder="Last Name"
							style={styles.input}
							placeholderTextColor={primaryLight}
							value={this.state.last}
						/>
						<Input
							onChangeText={(text) => this.handleChange('username', text)}
							placeholder="Username"
							style={styles.input}
							placeholderTextColor={primaryLight}
							value={this.state.username}
						/>
						<Input
							onChangeText={(text) => this.handleChange('email', text)}
							placeholder="Email"
							style={styles.input}
							placeholderTextColor={primaryLight}
							value={this.state.email}
						/>
						<Input
							onChangeText={(text) => this.handleChange('password', text)}
							placeholder="Password"
							style={styles.input}
							placeholderTextColor={primaryLight}
							secureTextEntry={true}
							value={this.state.password}
						/>
						<Input
							onChangeText={(text) =>
								this.handleChange('confirmPassword', text)
							}
							secureTextEntry={true}
							placeholder="Confirm Password"
							style={styles.input}
							placeholderTextColor={primaryLight}
							value={this.state.confirmPassword}
						/>
						{this.state.isError ? <Text>{this.state.errorMsg}</Text> : null}
					</View>
					<Button
						style={[styles.button, styles.submitButton, shadowStyle]}
						onPress={this.handleSubmit}>
						{this.state.isLoading ? (
							<Spinner color={dark} size="small" />
						) : (
							<Text style={styles.buttonText}>Sign Up</Text>
						)}
					</Button>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		backgroundColor: dark
	},
	column: {
		alignSelf: 'stretch'
	},
	formContainer: {
		backgroundColor: background,
		alignSelf: 'stretch',
		marginHorizontal: 10,
		paddingVertical: 40,
		borderRadius: 10
	},
	input: {
		marginHorizontal: 20,
		marginVertical: 10,
		paddingVertical: 10,
		paddingHorizontal: 10,
		fontSize: 16,
		color: white,
		borderBottomColor: primary,
		borderBottomWidth: 2
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	submitButton: {
		marginHorizontal: 60,
		paddingVertical: 20,
		backgroundColor: primary,
		borderBottomRightRadius: 20,
		borderBottomLeftRadius: 20
	},
	backButton: {
		marginHorizontal: 100,
		paddingVertical: 10,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		backgroundColor: primaryLight
	},
	buttonText: {
		fontFamily: Platform.OS === 'ios' ? 'Avenir-Heavy' : 'Roboto',
		fontSize: 18
	},
	backButtonText: {
		fontFamily: Platform.OS === 'ios' ? 'Avenir-Light' : 'Roboto',
		fontSize: 16
	}
})
