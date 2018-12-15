/** @format */

import { AppRegistry } from 'react-native';

// app routes
import AppRouter from './src/navigation/Router';

import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => AppRouter);
