import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	LayoutAnimation,
	RefreshControl,
	SafeAreaView
} from 'react-native'
import { background, secondary, primary } from '../../../styles/Colors'
import {
	getCategories,
	searchPlaces,
	getPlacesNearby
} from '../../../services/ApiServices'
import CategoryList from './components/CategoryList'
import LocationModal from './components/LocationModal'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Platform } from '@unimodules/core'
import NearbyPlaces from './components/NearbyPlaces'
import { Spinner } from '../../../common'
<<<<<<< HEAD
=======
import { getNearbyPlaces } from '../../../services/config/LocationSearch'
>>>>>>> express-routes

export default class HomeScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			location: {
				lat: null,
				lng: null
			},
			nearbyPlaces: [],
			categories: [],
			isLoading: false,
			blurred: true,
			modalVisible: false,
			searchResults: [],
			errorMsg: '',
			isError: false,
			search: '',
			refreshing: false
		}
	}

	componentDidUpdate() {
		LayoutAnimation.easeInEaseOut()
	}

	async componentDidMount() {
		this.setState({ isLoading: true })
		await this.getCurrentLocation()
		await this.fetchCategories()
	}

	fetchNearbyPlaces = async () => {
		const { lat, lng } = this.state.location
		try {
			const nearbyPlaces = await getPlacesNearby({ lat, lng })
			await getNearbyPlaces({ lat, lng })
			// console.log(places)
			this.setState({ nearbyPlaces })
			this.setState({ isLoading: false })
		} catch (error) {
			// console.log(error)
		}
	}

	handleRefresh = async () => {
		this.setState({ refreshing: true })
		try {
			await this.fetchNearbyPlaces()
			this.setState({ refreshing: false })
		} catch (error) {
			this.setState({ refreshing: false })
		}
	}

	getCurrentLocation = async () =>
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState(
					{
						location: {
							...this.state.location,
							lat: position.coords.latitude,
							lng: position.coords.longitude
						}
					},
					async () => await this.fetchNearbyPlaces()
				)
			},
			(error) => console.log(error)
		)
	fetchCategories = async () => {
		try {
			const categories = await getCategories()
			this.setState({ categories })
		} catch (error) {
			throw error
		}
	}

	renderCategories = () => {
		if (this.state.categories.length && !this.state.isLoading) {
			return <CategoryList data={this.state.categories} />
		}
	}

	handleModalClose = () =>
		this.setState({ modalVisible: false, searchResults: [] })

	handleModal = () => this.setState({ modalVisible: !this.state.modalVisible })

	handleChange = (search) => {
		if (search.length < 1) {
		} else {
			this.setState({ search, blurred: false, isError: false, errorMsg: '' })
		}
	}

	handleSubmit = async () => {
		try {
			if (this.state.search.length < 1)
				this.setState({ isError: true, errorMsg: 'Field Cannot Be Empty' })
			else {
				const searchResults = await searchPlaces(this.state.search)
				this.setState({ searchResults })
			}
		} catch (error) {
			this.setState({
				isError: true,
				errorMsg: 'Could not find a place with that name.'
			})
		}
	}

	render() {
		const { blurred } = this.state
		if (this.state.isLoading) {
			return (
				<SafeAreaView
					style={[
						styles.container,
						{ justifyContent: 'center', alignItems: 'center' }
					]}>
					<Spinner size="large" color={primary} />
				</SafeAreaView>
			)
		} else {
			return (
				<SafeAreaView style={styles.container}>
					<ScrollView
						contentContainerStyle={{
							paddingBottom: Platform.OS === 'android' ? 50 : 0,
							marginTop: Platform.OS === 'android' ? 50 : 0
						}}
						showsVerticalScrollIndicator={false}
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this.handleRefresh}
								tintColor={primary}
							/>
						}>
						<View style={styles.top}>
							<View style={styles.headerContainer}>
								<View style={styles.title}>
									<Text style={styles.titleText}>Search For Places</Text>
									<View style={styles.space}>
										<TouchableOpacity
											style={styles.button}
											onPress={this.handleModal}>
											<Text style={styles.buttonText}>Search</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
							<LocationModal
								data={this.state.searchResults}
								modalVisible={this.state.modalVisible}
								onRequestClose={this.handleModalClose}
								onChangeText={this.handleChange}
								onSubmitEditing={({ nativeEvent: text }) =>
									this.handleSubmit(text)
								}
								isError={this.state.isError}
								errorMsg={this.state.errorMsg}
								onEndEditing={this.handleSubmit}
								blurred={blurred}
								handleBlur={this.handleBlur}
							/>
							{this.renderCategories()}
							<View style={styles.bottom}>
								<View style={styles.bottomHeader}>
									<Text style={styles.titleText}>Places Nearby</Text>
								</View>
								<View style={{ justifyContent: 'center' }}>
									<NearbyPlaces data={this.state.nearbyPlaces} />
								</View>
							</View>
						</View>
					</ScrollView>
				</SafeAreaView>
			)
		}
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: background,
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerContainer: {
		flexDirection: 'column'
	},
	top: {
		flex: 1
	},
	bottom: {
		flex: 3
	},
	bottomHeader: {
		alignItems: 'flex-end'
	},
	title: {
		flexDirection: 'row'
	},
	titleText: {
		fontSize: 24,
		flex: 1,
		marginHorizontal: 10,
		color: secondary,
		fontFamily: Platform.OS === 'ios' ? 'Avenir-Heavy' : 'Roboto'
	},
	space: {
		flex: 2
	},
	button: {
		borderBottomColor: primary,
		borderBottomWidth: 2,
		marginTop: 10,
		marginHorizontal: 20,
		paddingVertical: 10
	},
	buttonText: {
		fontSize: 18,
		color: primary
	}
})
