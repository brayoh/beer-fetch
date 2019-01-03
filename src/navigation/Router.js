import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  DrawerItems,
  SafeAreaView
} from 'react-navigation';

import AppDrawerMenu from './AppDrawerMenu';
import AllBeersScreen from '../screens/AllBeersScreen';
import SingleBeerScreen from '../screens/SingleBeerScreen';
import RandomBeerScreen from '../screens/RandomBeerScreen';
import SideBar from './SideBar';

// theme colors
import { colors } from '../config/theme';

const AppRouter = createDrawerNavigator(
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
    },
    contentComponent: props => <CustomDrawerContentComponent {...props} />
  }
);

const CustomDrawerContentComponent = props => {
  const filteredItems = props.items.filter(
    item => item.key !== 'SingleBeerScreen'
  );
  const newProps = Object.assign({}, props, {
    ...props,
    items: Array.from(filteredItems)
  });

  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <DrawerItems {...newProps} />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default createAppContainer(AppRouter, {
  contentOptions: props => <CustomDrawerContentComponent {...props} />
});
