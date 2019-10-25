import React from 'react';
import { View, Text, StatusBar, TouchableOpacity} from 'react-native'
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
			headerTransparent: true,
			headerLeft: <TouchableOpacity>
				<SVG icon="return" style={{ marginLeft: 15 }} color="#fff" />
			</TouchableOpacity>,
			headerRight: <TouchableOpacity>
				<SVG icon="ellipsis" style={{ marginRight: 15 }} color="#fff" />
			</TouchableOpacity>,
			headerStyle: {
				height: 40,
				borderBottomWidth: 0,
				color: '#fff',
				marginTop: StatusBar.currentHeight
			}
		}
	}
)

export default createAppContainer(AppNavigator);