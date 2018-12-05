import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import AppDrawerMenu from './AppDrawerMenu';
import AllBeersScreen from '../screens/AllBeersScreen';

import SingleBeerScreen from '../screens/SingleBeerScreen';

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
    initialRouteName: 'Home'
  }
);

export default createAppContainer(AppRouter);
