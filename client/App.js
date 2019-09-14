import { createStackNavigator } from 'react-navigation-stack'
import AuthScreen from './screens/AuthScreen'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

const AuthStack = createStackNavigator(
	{
		SignIn: AuthScreen
	},
	{
		headerMode: 'none'
	}
)

export default createAppContainer(
	createSwitchNavigator({
		Auth: AuthStack
	})
)
