import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import axios from 'axios';
import {Icon, Header, Left, Body, Button, Card, CardItem} from 'native-base';


class Home extends Component {

  state = {
    image: '',
  }; 

  render() {
      var image = this.state.image ? {uri: this.state.image} : require('../assets/profile.jpg');
      const { navigation } = this.props;
    return (
      <ScrollView
        stickyHeaderIndices={[1]}
      >
      <View>
      <View style={styles.top}>                    
      </View>
        <View style={styles.header}>          
        <TouchableOpacity onPress={()=>this._pickImage()}>        
           <Image style={styles.avatar} source={image}/>
            <Text style={styles.name}>{this.props.name}</Text>
        </TouchableOpacity>          
        </View>
        <View>
          <View style={styles.bodyContent}>
            <Text style={styles.info}>Role : </Text>
            <Text style={styles.info}>{this.props.userRole}</Text>                        
          </View>
          <View style={styles.bodyContent}>
            <Text style={styles.info}>Email : </Text>
            <Text style={styles.info}>{this.props.email}</Text>                        
          </View>
           <View style={styles.bodyContent}>
            <Text style={styles.info}>Mobile : </Text>
            <Text style={styles.info}>{this.props.phone}</Text>                        
          </View>
          <View style={styles.bodyContent}>
            <Text style={styles.info}>Total Tasks : </Text>
            <Text style={styles.info}>{this.props.totalTasks}</Text>                        
          </View>
          <View style={styles.button}>
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress = {()=>navigation.navigate('EditDetails')}>  
                <Text style={styles.btnText}>Edit Details</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
      </ScrollView>
    );
  }
  
  _pickImage = async () => {
    console.log("imagePicker");
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],      
    });  
    this.setState({image: result.uri})
    this.handleUploadPhoto();
  }

  handleUploadPhoto = () => {
    const form = new FormData();
    form.append('profile',{
      profilePhoto: this.state.image,
      userId: this.props.id,
      type: 'image/jpeg'
    });
    console.log(form);
    axios.put("http://206.189.231.135:4000/user/change-profile/"+this.props.id, {
      method: "PUT",
      body: form,
       headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    }})
    fetch("http://206.189.231.135:4000/user/change-profile/"+this.props.id)
   .then(response => {
      console.log("upload succes", response);
      alert("Upload success!");
      })
    .catch(error => {
      console.log("upload error", error);
      alert(error);
    });
  };
}

mapStateToProps = (state) =>{
  return{
    name: state.name,
    userRole: state.userRole,
    email: state.email,
    totalTasks: state.totalTasks,
    id: state.id,
    phone: state.phone,
    profilePhoto: state.profilePhoto
  }
}

export default connect(mapStateToProps)(Home)

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0 
  },
  avatar: {
    width: 170,
    height: 170,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "white",
    alignSelf:'center',
    padding: 0,
    margin: 0    
  },
  name:{
    fontSize: 28,
    color:"#FFFFFF",
    fontWeight:'bold',
    marginTop: 5,
    alignSelf: 'center',
    alignItems: 'center'
  },
  
  bodyContent: {
    flexDirection: 'row',
    borderBottomColor: '#C0C0C0',
    borderBottomWidth: 1,
    margin: 5,
    padding: 5,
  },
 
  info:{
    fontSize: 20,
    color: "#000",
    marginTop: 10
  },
  button:{
    justifyContent: 'center',
    alignItems: 'center',  
    marginTop: 5 
  },
  top:{
    backgroundColor: '#00BFFF',
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",    
  },
  btnText:{
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold'
  }
});