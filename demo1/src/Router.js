import React from 'react';
import { View, Text } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SVG from './components/svg'

import HomeScreen from './screens/Home'

const AppNavigator = createStackNavigator(
	{
		Home: HomeScreen
	},
	{
		initialRouteName: 'Home',
		defaultNavigationOptions: {
			headerLeft: <SVG icon="return" style={{ marginLeft: 15 }} />,
			headerRight: <SVG icon="ellipsis" style={{ marginRight: 15 }} />,
			headerTitle: <Text>Home</Text>,
			headerStyle: {
				height: 40,
				borderBottomWidth: 0
			}
		}
	}
)

export default createAppContainer(AppNavigator);