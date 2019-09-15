import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { background, dark } from '../../styles/Colors'

const ConfirmScreen = () => {
	return (
		<View style={styles.container}>
			<View>
				<Text>Account Created!</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: dark,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default ConfirmScreen
