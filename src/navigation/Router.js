import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import AppDrawerMenu from './AppDrawerMenu';
import AllBeersScreen from '../screens/AllBeersScreen';
import SingleBeerScreen from '../screens/SingleBeerScreen';
import RandomBeerScreen from '../screens/RandomBeerScreen';

// theme colors
import { colors } from '../config/theme';

const AppRouter = createStackNavigator(
  {
    Home: {
      path: '/',
      screen: AllBeersScreen,
      navigationOptions: {
        header: props => <AppDrawerMenu {...props} />
      }
    },
    SingleBeerScreen: {
      path: '/single-beer',
      screen: SingleBeerScreen
    },
    RandomBeerScreen: {
      path: '/random-beer',
      screen: RandomBeerScreen
    }
  },
  {
    initialRouteName: 'Home',
    backBehavior: 'initialRoute',
    defaultNavigationOptions: {
      headerMode: 'float',
      headerStyle: {
        backgroundColor: colors.french_blue
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        fontWeight: 'normal'
      }
    }
  }
);

export default createAppContainer(AppRouter);
