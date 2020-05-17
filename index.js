import {AppRegistry} from 'react-native';
import Root from './react-app/Root';
import {name as appName} from './app.json';

//Main App
AppRegistry.registerComponent(appName, () => Root);
