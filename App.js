import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppDrawer from './drawerNavigator.js';
import  MainNavigator from './screens/stackNavigator'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

  initialState = {
    first_name:"",
    last_name: "",
    user_name: "",
    password: "",  
    id: "",
    name: '',
    userRole: '',
    email: '',
    totalTasks: '',
    profilePhoto: '',
    phone: ''
  }

  const reducer = (state = initialState, action) =>{  
    switch (action.type) {
      case 'SIGN_UP':    
      return{
        first_name: state.first_name = action.payload.first_name,       
        last_name: state.last_name = action.payload.last_name,
        user_name: state.user_name = action.payload.user_name,        
        password: state.password = action.payload.password
      };

      case 'LOG_IN':  
      console.log(action.payload);
      return {
        user_name: state.user_name = action.payload[0].email,
        password: state.password = action.payload[0].password,
        id: state.id = action.payload[1],
        name: state.name = action.payload[2],
        userRole : state.userRole = action.payload[3],
        email: state.email = action.payload[4],
        totalTasks: state.tasks = action.payload[5],
        phone: state.phone = action.payload[6],
        profilePhoto: state.profilePhoto = action.payload[7]
      };
      
      case 'UPDATE':
      console.log(action.payload);
      return {
        name: state.name = action.payload.name,
        userRole: state.userRole = action.payload.userRole,
        email: state.email = action.payload.email,
        phone: state.phone = action.payload.phone
      }
    }
    return state
}

const store = createStore(reducer);

export default class App extends React.Component {

constructor(props){
  super(props);  
}

  render() {
        console.disableYellowBox = true;
    return (
      <>
        <View style = {styles.header}>
        </View>
        <Provider store={store}>
          <MainNavigator/>
        </Provider>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    height:25,
    backgroundColor: '#2f55a4',
  }
});


