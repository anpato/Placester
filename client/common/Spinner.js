import React from 'react'
import { ActivityIndicator } from 'react-native'
import { primaryLight } from '../styles/Colors'

export const Spinner = ({ size, color, style }) => (
	<ActivityIndicator size={size} color={color} style={style} />
)
