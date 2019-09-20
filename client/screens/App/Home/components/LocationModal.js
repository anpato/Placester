import React from 'react'
import {
	View,
	Text,
	Modal,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	TouchableHighlight
} from 'react-native'
import Search from './Search'
import { dark, primary, white, background } from '../../../../styles/Colors'
import { Ionicons as IconComponent } from '@expo/vector-icons'
import { Platform } from '@unimodules/core'
import { shadowStyle } from '../../../../styles/Styles'
const LocationModal = ({
	data,
	modalVisible,
	onRequestClose,
	onChangeText,
	onSubmitEditing,
	blurred,
	handleBlur,
	isError,
	errorMsg,
	value
}) => {
	const renderItem = (item, index, separators) => {
		return (
			<TouchableHighlight
				onPress={() => console.log(item._id)}
				style={styles.itemButton}
				underlayColor={background}
				onShowUnderLay={separators.highlight}
				onHideUnderLay={separators.unhighlight}>
				<View style={styles.itemList}>
					<Text style={[styles.itemText, styles.leftText]}>
						{item.name.length > 20
							? `${item.name.substr(0, 20)}...`
							: item.name}
					</Text>
					<Text style={styles.itemText}>{item.location.city}</Text>
				</View>
			</TouchableHighlight>
		)
	}
	return (
		<Modal
			animationType="slide"
			presentationStyle={styles.modal}
			visible={modalVisible}
			onRequestClose={onRequestClose}
			transparent={false}>
			<View style={styles.modal}>
				<View style={[styles.searchContainer, shadowStyle]}>
					<Search
						onChangeText={(text) => onChangeText(text)}
						onFocus={() => handleBlur(false)}
						onBlur={() => handleBlur(true)}
						onSubmitEditing={({ nativeEvent: text, eventCount, target }) =>
							onSubmitEditing(text)
						}
						value={value}
						blurred={blurred}
						inModal={true}
					/>
				</View>
				{isError ? (
					<Text style={{ color: white, fontSize: 20, alignSelf: 'center' }}>
						{errorMsg}
					</Text>
				) : null}
				<FlatList
					data={data}
					keyExtractor={(item) => item._id}
					renderItem={({ item, index, separators }) =>
						renderItem(item, index, separators)
					}
				/>
				<TouchableOpacity
					onPress={onRequestClose}
					style={[styles.button, shadowStyle]}>
					<IconComponent
						name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
						size={38}
						color={dark}
					/>
				</TouchableOpacity>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modal: {
		backgroundColor: dark,
		paddingBottom: 80,
		flex: 1
	},
	searchContainer: {
		paddingBottom: 10,
		backgroundColor: dark,
		elevation: 1
	},
	button: {
		alignSelf: 'center',
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: primary,
		width: 50,
		height: 50,
		bottom: 20,
		borderRadius: 50
	},
	itemButton: {
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	itemList: {
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomColor: background,
		borderBottomWidth: 2
	},
	itemText: {
		marginHorizontal: 10,
		color: white,
		fontSize: 18
	}
})

export default LocationModal
