import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import SignUp from './signup';
import LogIn from './login';
import EditDetails from './editDetails';
import AppDrawer from '../drawerNavigator'
import { Router, Scene } from 'react-native-router-flux'

const MainNavigator = createStackNavigator({
  Login: {screen: LogIn},
  SignUp: {screen: SignUp},
  EditDetails: {screen :EditDetails},
  AppDrawer: {screen: AppDrawer}
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);
export default MainNavigator;


