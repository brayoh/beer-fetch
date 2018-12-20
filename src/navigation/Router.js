import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import AppDrawerMenu from './AppDrawerMenu';
import AllBeersScreen from '../screens/AllBeersScreen';

import SingleBeerScreen from '../screens/SingleBeerScreen';

// theme colors
import { colors } from '../config/theme';

const AppRouter = createStackNavigator(
  {
    Home: {
      screen: AllBeersScreen,
      navigationOptions: {
        header: props => <AppDrawerMenu {...props} />
      }
    },
    SingleBeerScreen: SingleBeerScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
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
