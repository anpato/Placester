import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	LayoutAnimation
} from 'react-native'
import {
	dark,
	background,
	primary,
	white,
	primaryLight,
	secondary
} from '../../../styles/Colors'
import { getCategories } from '../../../services/ApiServices'
import { Input } from '../../../common/index'
import CategoryList from './components/CategoryList'
import { Platform } from '@unimodules/core'

export default class HomeScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			categories: [],
			isLoading: false,
			blurred: false,
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

	handleBlur = () => {
		this.setState({ blurred: !this.state.blurred })
	}

	render() {
		const { blurred, search } = this.state
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.top}>
						<View style={styles.headerContainer}>
							<View style={styles.title}>
								<Text style={styles.titleText}>Search For Places</Text>
								<View style={styles.space}>
									<Input
										placeholder="Search"
										style={
											!blurred
												? [styles.input, styles.inputInactive]
												: [styles.input, styles.inputActive]
										}
										pla
										placeholderTextColor={primaryLight}
										selectionColor={white}
										onChangeText={(text) => this.setState({ search: text })}
										onFocus={this.handleBlur}
										onBlur={this.handleBlur}
										onSubmitEditing={(text) =>
											console.log(text.nativeEvent.text)
										}
									/>
								</View>
							</View>
						</View>
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
	inputActive: {
		borderBottomColor: primary
	},
	inputInactive: {
		borderBottomColor: dark
	},
	input: {
		borderBottomWidth: 2,
		marginTop: 10,
		marginHorizontal: 20,
		paddingVertical: 10,
		fontSize: 18,
		color: white
	},
	top: {
		flex: 1
	},
	bottom: {
		flex: 3
	}
})
