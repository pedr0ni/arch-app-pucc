import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Ionicons } from '@expo/vector-icons';

import { Colors } from './utils/DefaultStyles';

import LoginScreen from './views/LoginScreen';
import HomeScreen from './views/HomeScreen';
<<<<<<< HEAD
import ProfileScreen from './views/ProfileScreen';
=======
>>>>>>> 02b7c52c11a11b3bdaff80f27c2771a65dc0bbcf

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
<<<<<<< HEAD
			tabBarLabel: 'Grade'
		}
	},
	Profile: {
		screen: ProfileScreen,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => (
				<Ionicons name={Platform.OS === 'ios' ? "ios-home" : 'md-home'} size={24} color={tintColor} />
			),
			tabBarLabel: 'Perfil'
		}
	}
}, {
	tabBarOptions: {
		activeTintColor: Colors.defaultBlue,
		labelStyle: {
			fontSize: 12
		}
	}
=======
		},
		tabBarOptions: {
			labelStyle: {
				fontSize: 20
			}
		}
	}
}, {
  	activeTintColor: Colors.defaultBlue,
>>>>>>> 02b7c52c11a11b3bdaff80f27c2771a65dc0bbcf
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
