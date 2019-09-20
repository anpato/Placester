import React, { Component } from 'react'
import {
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	Dimensions,
	SectionList,
	ScrollView,
	TouchableOpacity,
	TouchableHighlight,
	Modal
} from 'react-native'
import {
	background,
	primary,
	primaryLight,
	dark,
	white,
	secondary,
	shadow,
	cameraBg
} from '../../../styles/Colors'
import { getUserProfile } from '../../../services/ApiServices'
import UserInfo from './components/UserInfo'
import { Spinner } from '../../../common'
import { settings } from './accountOptions/settings'
import { Platform } from '@unimodules/core'
import { logOut } from '../../../services/config/Credentials'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default class ProfileScreen extends Component {
	constructor() {
		super()
		this.state = {
			user: {},
			loading: false,
			confirmLogout: false,
			requestModal: false
		}
	}
	async componentDidMount() {
		this.setState({ loading: true })
		await this.fetchProfile()
	}

	fetchProfile = async () => {
		try {
			const user = await getUserProfile()
			await this.setState({ user, loading: false })
		} catch (error) {
			throw error
		}
	}

	handleLogout = async () => {
		await logOut().then(() =>
			this.setState({ requestModal: false }, () =>
				this.props.navigation.navigate('Auth')
			)
		)
	}

	handleModal = () => {
		this.setState({ requestModal: !this.state.requestModal })
	}

	renderUser = () => {
		switch (this.state.loading) {
			case false:
				return (
					<UserInfo
						user={this.state.user}
						style={styles.profile}
						handleLogout={this.handleModal}
					/>
				)
			case true:
				return <Spinner color={primary} size="large" />
		}
	}

	renderLogoutModal = () => {
		switch (this.state.requestModal) {
			case true:
				return (
					<Modal
						animationType="fade"
						transparent={true}
						style={{
							backgroundColor: cameraBg,
							justifyContent: 'center',
							alignItems: 'center'
						}}
						visible={this.state.requestModal}>
						<View style={styles.modal}>
							<View style={styles.modalContent}>
								<View style={styles.modalTitle}>
									<Text style={[styles.text, styles.modalTitleText]}>
										Are you sure you want to logout?
									</Text>
								</View>
								<View style={styles.buttonContainer}>
									<TouchableOpacity
										style={[styles.buttons, styles.noButton]}
										onPress={this.handleModal}>
										<Text style={styles.text}>No</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={[styles.buttons, styles.confirmButton]}
										onPress={this.handleLogout}>
										<Text style={styles.text}>Yes</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</Modal>
				)
			case false:
				null
		}
	}

	renderItem = (item, index, separators) => {
		return (
			<TouchableHighlight
				style={styles.sectionItem}
				onPress={() => console.log('Pressed')}
				underlayColor={secondary}
				onShowUnderLay={separators.highlight}
				onHideUnderLay={separators.unhighlight}>
				<Text style={[styles.itemText, styles.text]}>{item}</Text>
			</TouchableHighlight>
		)
	}
	renderHeaders = (title) => {
		return (
			<View style={[styles.section, styles.text]}>
				<Text style={styles.sectionText}>{title}</Text>
			</View>
		)
	}

	renderAccountOptions = () => {
		switch (this.state.loading) {
			case false:
				return (
					<SectionList
						keyExtractor={(item, index) => item + index}
						sections={settings}
						renderItem={({ item, index, separators }) =>
							this.renderItem(item, index, separators)
						}
						renderSectionHeader={({ section: { title } }) =>
							this.renderHeaders(title)
						}
					/>
				)
			case true:
				return null
		}
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView>
					<View>{this.renderUser()}</View>
					<View style={styles.list}>{this.renderAccountOptions()}</View>
					{this.renderLogoutModal()}
				</ScrollView>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: background,
		justifyContent: 'center'
	},
	modal: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: cameraBg
	},
	modalContent: {
		backgroundColor: dark,
		flexDirection: 'column',
		justifyContent: 'center',
		marginHorizontal: 20,
		alignSelf: 'stretch',
		height: height / 6,
		borderRadius: 20
	},
	modalTitle: {
		flex: 2,
		justifyContent: 'center'
	},
	modalTitleText: {
		alignSelf: 'center',
		fontSize: 18,
		color: white
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'stretch'
	},
	buttons: {
		flex: 1,
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonText: {},
	noButton: {
		borderRightColor: dark,
		borderRightWidth: 1,
		borderBottomLeftRadius: 20,
		backgroundColor: primary
	},
	confirmButton: {
		backgroundColor: primaryLight,
		borderLeftColor: dark,
		borderLeftWidth: 1,
		borderBottomRightRadius: 20
	},
	list: {
		marginTop: 5
	},
	itemText: {
		fontSize: 18,
		color: dark
	},
	sectionItem: {
		alignSelf: 'stretch',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: primaryLight
	},
	section: {
		alignSelf: 'stretch',
		backgroundColor: dark,
		paddingVertical: 5
	},
	sectionText: {
		color: white,
		fontSize: 24,
		marginLeft: 5
	},
	text: {
		fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto'
	},
	profile: {}
})
