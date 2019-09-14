import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Input } from '../common'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { secondary, secondaryDarker, blue, primary } from '../styles/Colors'

export default class AuthScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.formContainer}>
					<Input style={styles.input} placeholder="Username" />
					<Input
						style={styles.input}
						placeholder="Password"
						secureTextEntry={true}
					/>
					<TouchableOpacity style={styles.button}>
						<Text>Sign In</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}
const width = Math.round(Dimensions.get('window').width)
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: primary
	},
	formContainer: {
		flexDirection: 'column',
		width: width - 60,
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		borderColor: primary,
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 50,
		alignSelf: 'stretch',
		marginVertical: 10
	},
	button: {
		borderColor: secondary,
		borderWidth: 2,
		width: width - 140,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		borderRadius: 50,
		backgroundColor: secondaryDarker
	}
})
