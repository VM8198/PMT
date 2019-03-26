import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, ScrollView, ActivityIndicator, Modal,RefreshControl, TouchableHighlight, FlatList, Picker } from 'react-native';
import {Icon, Header, Left, Body, Button, Card, CardItem} from 'native-base';
import { connect } from 'react-redux';
import axios from 'axios';

let todoCount = 0;
let inProgressCount = 0;
let testingCount = 0;
let completeCount = 0;

class Project extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      allData: [],
      todo: [],
      complete: [],
      testing: [],
      inProgress: [],
      modalVisible: false,
      projectStatus: 'todo',
      nothing: false,
      noData: []
    }
  }

_onRefresh = () => {
    this.setState({refreshing: true});   
    this.setState({refreshing: false});
  }

  componentWillMount = () => {
    console.log("in mount id",this.props.id);
    fetch("http://206.189.231.135:4000/tasks/all-task")
    .then((response) => response.json())
    .then((resData,err) => {
      todoCount = 0;
      inProgressCount = 0;
      completeCount = 0;
      testingCount = 0;
      for(let i = 0 ; i < resData.length ; i++){
        if(resData[i].assignTo._id == this.props.id){
          this.setState(prevState => ({allData : [...prevState.allData, resData[i]]}))
          if(resData[i].status == 'to do'){
            todoCount++;
            this.setState(prevState => ({
              todo: [...prevState.todo, resData[i]]  
            }))
          }
          else if(resData[i].status == 'complete'){
            completeCount++
            this.setState(prevState => ({
              complete: [...prevState.complete, resData[i]]  
            }))}
            else if(resData[i].status == 'testing'){
              testingCount++
              this.setState(prevState => ({
                testing: [...prevState.testing, resData[i]]  
              }))}
              else{
                inProgressCount++
                this.setState(prevState => ({
                  inProgress: [...prevState.inProgress, resData[i]]  
                }))}
              }else{
                this.setState(prevState => ({allData: [...prevState.allData, 1]}))
              }
            }
          })
    .catch((error) => {
      console.error(error);
    });
  }

   setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

 

  openDialogue(){
    if(this.state.modalVisible == true){
    return(
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text> 
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
      );
    }
  }

  showCard(){
    if(this.state.projectStatus == 'todo'){
    return(
      this.state.todo.map((item)=>
        <TouchableOpacity onLongPress={()=>this.setModalVisible(true)}>
         <Card>
            <CardItem header bordered>
              <Text style={styles.title}>{item.title}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.desc}>
                 {item.desc}
                </Text>
                <Text style={styles.Name}>
                 Assigned To :{item.assignTo.name}
                </Text>
              </Body>
            </CardItem> 
            <CardItem footer>
              <TouchableOpacity>
                <Text>
                  Move to In Progress
                 </Text>
              </TouchableOpacity>
            </CardItem>           
         </Card>
         </TouchableOpacity>
         )
      );
   }
   if(this.state.projectStatus == 'testing'){
    return(
      this.state.testing.map((item)=>
        <TouchableOpacity onLongPress={()=>this.setModalVisible(true)}>
         <Card>
            <CardItem header bordered>
              <Text style={styles.title}>{item.title}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.desc}>
                 {item.desc}
                </Text>
                <Text style={styles.Name}>
                 Assigned To :{item.assignTo.name}
                </Text>
              </Body>
            </CardItem> 
             <CardItem footer>
              <TouchableOpacity>
                <Text>
                  Move to completed
                 </Text>
              </TouchableOpacity>
            </CardItem>
         </Card>
         </TouchableOpacity>
         )
      );
   }
   if(this.state.projectStatus == 'complete'){
    return(
      this.state.complete.map((item)=>
        <TouchableOpacity onLongPress={()=>this.setModalVisible(true)}>
         <Card>
            <CardItem header bordered>
              <Text style={styles.title}>{item.title}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.desc}>
                 {item.desc}
                </Text>
                <Text style={styles.Name}>
                 Assigned To :{item.assignTo.name}
                </Text>
              </Body>
            </CardItem>
         </Card>
         </TouchableOpacity>
         )
      );
   }
   else
       return(
      this.state.inProgress.map((item)=>
        <TouchableOpacity onLongPress={()=>this.setModalVisible(true)}>
         <Card>
            <CardItem header bordered>
              <Text style={styles.title}>{item.title}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.desc}>
                 {item.desc}
                </Text>
                <Text style={styles.Name}>
                 Assigned To : {item.assignTo.name}
                </Text>
              </Body>
            </CardItem>  
             <CardItem footer>
              <TouchableOpacity>
                <Text>
                  Move to Testing
                 </Text>
              </TouchableOpacity>
            </CardItem>          
         </Card>
         </TouchableOpacity>
         )
      );
   }

   counter(){
     if(this.state.projectStatus == 'todo'){
       return todoCount;
       todoCount = 0;
     }else if(this.state.projectStatus == 'inprogress'){
       return inProgressCount;
       inProgressCount = 0;
     }else if(this.state.projectStatus == 'testing'){
       return testingCount;
       testingCount = 0;
     }else 
       return completeCount;
       completeCount = 0;
   }
  

  wait(){
    if (this.state.allData.length == 0) {
      return (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
          color="#0000ff"
        />
      );
    }
  }

  render() {
    return (
      <>
      <View>
        <Header>
          <Left>
            <Button transparent onPress={()=>this.props.navigation.openDrawer()}>
              <Icon name='menu'/>
            </Button>            
          </Left>          
          <Body>
          <Text style = {styles.header}>Projects</Text>         
          </Body>
        </Header>
      </View>
      <View style = {{flexDirection: 'row'}}>
      <Picker
        selectedValue={this.state.projectStatus}
        style={{height: 50, width: 200}}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({projectStatus: itemValue})
        }>
        <Picker.Item label="To Do" value="todo" />
        <Picker.Item label="In Progress" value="inprogress" />
        <Picker.Item label="Testing" value="testing" />
        <Picker.Item label="Completed" value="complete" />
      </Picker>
      <Text style = {{marginTop: 13}}>Total Tasks : {this.counter()}</Text>
      </View>
      {this.wait()}
      <ScrollView
       refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        >

      <View style={styles.cardPadding}>
          {this.showCard()}
          {this.openDialogue()}
      </View>
      </ScrollView>
      </>
    );
  }
}

mapStateToProps = (state) =>{
  return{
    id : state.id
  }
}

export default connect(mapStateToProps)(Project)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 100
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
  },
});
