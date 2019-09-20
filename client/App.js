import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import AuthScreen from './screens/Auth/AuthScreen'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import SignUpScreen from './screens/Auth/SignUpScreen'
import ConfirmScreen from './screens/Auth/ConfirmScreen'
import { Platform } from '@unimodules/core'
import { dark, primary, primaryLight } from './styles/Colors'
import HomeScreen from './screens/App/Home/HomeScreen'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons as IconComponent } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ProfileScreen from './screens/App/ProfileScreen'
import CameraPage from './screens/App/AddPlace/CameraPage'
import { FloatingAction } from './common'

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

const HomeStack = createStackNavigator(
	{
		Home: {
			screen: HomeScreen,
			navigationOptions: {
				header: null
			}
		}
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: dark
			}
		}
	}
)

const UploadStack = createStackNavigator({
	Camera: {
		screen: CameraPage,
		navigationOptions: {
			header: null,
			tabBarVisible: false
		}
	}
})

const AppNavigator = createBottomTabNavigator(
	{
		Main: HomeStack,
		Upload: {
			screen: UploadStack,
			navigationOptions: ({ navigation }) => ({
				tabBarIcon: ({ focused }) => (
					<FloatingAction>
						<IconComponent
							name={
								Platform.OS === 'ios'
									? `ios-add${focused ? '' : ''}`
									: `md-add${focused ? '' : ''}`
							}
							color={dark}
							size={32}
						/>
					</FloatingAction>
				),
				tabBarVisible: false
			})
		},
		Account: ProfileScreen
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) => {
				const { routeName } = navigation.state
				let iconName
				switch (routeName) {
					case 'Main':
						iconName =
							Platform.OS === 'ios'
								? `ios-home${focused ? '' : ''}`
								: `md-home${focused ? '' : ''}`
						break
					case 'Account':
						iconName =
							Platform.OS === 'ios'
								? `ios-person${focused ? '' : ''}`
								: `md-person${focused ? '' : ''}`
						break
				}
				return (
					<TouchableOpacity>
						<IconComponent name={iconName} size={32} color={tintColor} />
					</TouchableOpacity>
				)
			}
		}),
		tabBarOptions: {
			showLabel: false,
			activeTintColor: primary,
			inactiveTintColor: primaryLight,

			style: {
				backgroundColor: dark,
				borderTopColor: 'transparent'
			}
		},
		initialRouteName: 'Main'
	}
)

export default createAppContainer(
	createSwitchNavigator({
		// Auth: AuthStack,
		App: AppNavigator
	})
)
