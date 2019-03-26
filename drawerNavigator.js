import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation';
import Projects from './screens/projects.js';
import ItemList from './screens/itemList.js';
import NoticeBoard from './screens/noticeBoard.js';
import LeaveForm from './screens/leaveForm.js';
import custom from './customDrawer';
import Home from './screens/home.js';

const AppDrawer = createDrawerNavigator({
  Home: Home,
  Projects: Projects,
  ItemList: ItemList,
  NoticeBoard: NoticeBoard,
  LeaveForm: LeaveForm,
},{
  contentComponent: custom,
})

export default AppDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
