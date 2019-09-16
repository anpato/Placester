import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import { dark, background } from '../../../styles/Colors'
import { getCategories } from '../../../services/ApiServices'
import CategoryList from './components/CategoryList'

export default class HomeScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			categories: [],
			isLoading: false
		}
	}

	async componentDidMount() {
		await this.fetchCategories()
	}

	fetchCategories = async () => {
		try {
			this.setState({ isLoading: true })
			const categories = await getCategories()
			this.setState({ categories, isLoading: false })
		} catch (error) {}
	}

	renderCategories = () => {
		if (this.state.categories.length && !this.state.isLoading) {
			return <CategoryList data={this.state.categories} />
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.top}>
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
	top: {
		flex: 1
	},
	bottom: {
		flex: 3
	}
})
