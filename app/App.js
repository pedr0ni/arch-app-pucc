import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Ionicons } from '@expo/vector-icons';

import { Colors } from './utils/DefaultStyles';

import LoginScreen from './views/LoginScreen';
import HomeScreen from './views/HomeScreen';

const loginNavigation = createStackNavigator({
	Login: {
		screen: LoginScreen,
		navigationOptions: {
			header: null
		}
	}
});

const defaultNavigation = createBottomTabNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => (
				<Ionicons name={Platform.OS === 'ios' ? "ios-home" : 'md-home'} size={24} color={tintColor} />
			),
		},
		tabBarOptions: {
			labelStyle: {
				fontSize: 20
			}
		}
	}
}, {
  	activeTintColor: Colors.defaultBlue,
})

const mainNavigation = createStackNavigator({
	Default: {
		screen: defaultNavigation,
		navigationOptions: {
			header: null
		}
	},
	Login: {
		screen: loginNavigation,
		navigationOptions: {
			header: null
		}
	}
}, {
	initialRouteName: 'Login'
});

console.disableYellowBox = true;

export default createAppContainer(mainNavigation);
