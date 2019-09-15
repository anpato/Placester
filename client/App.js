import { createStackNavigator } from 'react-navigation-stack'
import AuthScreen from './screens/Auth/AuthScreen'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import SignUpScreen from './screens/Auth/SignUpScreen'
import ConfirmScreen from './screens/Auth/ConfirmScreen'
import { Platform } from '@unimodules/core'
import { dark } from './styles/Colors'

const AuthStack = createStackNavigator(
	{
		SignIn: AuthScreen,
		SignUp: SignUpScreen,
		Confirm: ConfirmScreen
	},
	{
		mode: Platform.OS === 'ios' ? 'modal' : 'card',
		cardOverlayEnabled: true,
		cardStyle: {
			backgroundColor: dark
		},
		headerMode: 'none'
	}
)

// const AppStack = createStackNavigator({})

export default createAppContainer(
	createSwitchNavigator({
		Auth: AuthStack
	})
)
