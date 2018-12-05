/** @format */

import { AppRegistry } from 'react-native';
// import App from './App';
import AppRouter from './src/navigation/Router';
import AppDrawerMenu from './src/navigation/AppDrawerMenu';

import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => AppRouter);
