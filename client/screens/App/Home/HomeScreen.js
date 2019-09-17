import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	LayoutAnimation
} from 'react-native'
import { background, secondary, primary } from '../../../styles/Colors'
import { getCategories, searchPlaces } from '../../../services/ApiServices'
import CategoryList from './components/CategoryList'
import LocationModal from './components/LocationModal'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Platform } from '@unimodules/core'

export default class HomeScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			categories: [],
			isLoading: false,
			blurred: true,
			modalVisible: false,
			searchResults: [],
			errorMsg: '',
			isError: false,
			search: ''
		}
	}

	componentDidUpdate() {
		LayoutAnimation.easeInEaseOut()
	}

	async componentDidMount() {
		await this.fetchCategories()
	}

	fetchCategories = async () => {
		try {
			this.setState({ isLoading: true })
			const categories = await getCategories()
			this.setState({ categories, isLoading: false })
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

	handleChange = (search) =>
		this.setState({ search, blurred: false, isError: false, errorMsg: '' })

	handleSubmit = async () => {
		try {
			const searchResults = await searchPlaces(this.state.search)
			this.setState({ searchResults })
		} catch (error) {
			this.setState({
				isError: true,
				errorMsg: 'Could not find a place with that name.'
			})
		}
	}

	render() {
		const { blurred } = this.state
		return (
			<View style={styles.container}>
				<ScrollView>
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
							<Text>Bottom</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: background,
		alignItems: 'center'
	},
	headerContainer: {
		flexDirection: 'column',
		marginTop: 50
	},
	top: {
		flex: 1
	},
	bottom: {
		flex: 3
	},
	title: {
		flexDirection: 'row'
	},
	titleText: {
		fontSize: 24,
		flex: 1,
		marginHorizontal: 10,
		marginTop: 10,
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
