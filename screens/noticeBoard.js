import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, ScrollView, ActivityIndicator, Modal, TouchableHighlight,Picker } from 'react-native';
import {Icon, Header, Left, Body, Button, Card, CardItem} from 'native-base';


export default class NoticeBoard extends React.Component {
  render(){
    return(
      <View>
        <Header>
          <Left>
            <Button transparent onPress={()=>this.props.navigation.openDrawer()}>
              <Icon name='menu'/>
            </Button>            
          </Left>          
          <Body>
          <Text style = {styles.header}>NoticeBoard</Text>
          </Body>
        </Header>
      </View>

      )
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
    color: '#fff',
    fontSize: 20
  },
  cardPadding:{
    padding: 5,    
  },
  title:{
    fontWeight: 'bold',
    fontSize: 20 
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140
  },
  desc:{
    marginTop: -5,
  },
  Name:{
    fontWeight: 'bold'
  }
});
