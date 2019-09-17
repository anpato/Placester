import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	LayoutAnimation
} from 'react-native'
import { background } from '../../../styles/Colors'
import { getCategories, searchPlaces } from '../../../services/ApiServices'
import CategoryList from './components/CategoryList'
import Search from './components/Search'
import LocationModal from './components/LocationModal'

export default class HomeScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			categories: [],
			isLoading: false,
			blurred: false,
			modalVisible: false,
			searchResults: [],
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
			console.log(error)
		}
	}

	renderCategories = () => {
		if (this.state.categories.length && !this.state.isLoading) {
			return <CategoryList data={this.state.categories} />
		}
	}

	handleModalClose = () =>
		this.setState({ modalVisible: false, searchResults: [] })

	handleBlur = () => {
		this.setState({ blurred: !this.state.blurred })
		if (!this.state.blurred) this.setState({ modalVisible: true })
	}

	handleChange = (query, value) =>
		this.setState({ [query]: value, blurred: false })

	handleSubmit = async () => {
		const { search } = this.state
		try {
			const searchResults = await searchPlaces(search)
			this.setState({ modalVisible: true, searchResults })
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		const { blurred, search } = this.state
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.top}>
						<View style={styles.headerContainer}>
							<Search
								onChangeText={this.handleChange}
								handleSubmit={this.handleSubmit}
								blurred={blurred}
								handleBlur={this.handleBlur}
								value={this.state.search}
							/>
						</View>
						<LocationModal
							data={this.state.searchResults}
							modalVisible={this.state.modalVisible}
							onRequestClose={this.handleModalClose}
							onChangeText={this.handleChange}
							handleSubmit={this.handleSubmit}
							blurred={blurred}
							handleBlur={this.handleBlur}
							value={this.state.search}
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
	}
})
