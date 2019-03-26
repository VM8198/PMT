import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Picker, TouchableOpacity, Image, ScrollView, TouchableHighlight } from 'react-native';
import { AppRegistry } from "react-native";
import { connect } from 'react-redux';
import axios from 'axios';




class SignUp extends React.Component {

  static navigationOptions = {
    title: 'SignUp',
  }

  state = {
    first_name:"",
    last_name: "",
    user_name: "",
    password: "",
  } 

  render() {

    return (
      <View style={styles.container}>

      <View style={styles.inputContainer}>    
      <TextInput style={styles.inputs}
      placeholder="First Name"
      underlineColorAndroid='transparent'
      onChangeText={(text)=>this.setState({first_name: text})}/>
      </View>

      <View style={styles.inputContainer}>    
      <TextInput style={styles.inputs}
      placeholder="Last Name"
      keyboardType="email-address"
      underlineColorAndroid='transparent' onChangeText={(text)=>this.setState({last_name: text})}/>
      </View>

      <View style={styles.inputContainer}>    
      <TextInput style={styles.inputs}
      placeholder="User Name"              
      underlineColorAndroid='transparent'
      onChangeText={(text)=>this.setState({user_name: text})}/>
      </View>  

      <View style={styles.inputContainer}>    
      <TextInput style={styles.inputs}
      placeholder="Password"              
      underlineColorAndroid='transparent'
      secureTextEntry={true} 
      onChangeText={(text)=>this.setState({password: text})}/>
      </View>

      
      <View style={styles.btn}>
      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={()=>this.props.signUp(this.state)}>
      <Text style={styles.loginText}>Register</Text>
      </TouchableHighlight>                 
      </View>  

      </View>
      );
  }
}


function mapStateToProps (state){
  return {
    first_name: state.first_name,    
    last_name: state.last_name,
    user_name: state.user_name,
    password: state.password,
  }
}



const mapDispatchToProps = (dispatch,ownProps) => {
  return{
    signUp: (text) => {
      if (text.first_name=="") {
        alert("Enter First Name");
      } else if(text.last_name == ""){
        alert("Enter Last Name");       
      }
      else if(text.password == ""){
        alert("Enter Password");       
      }
      else if(text.user_name == ""){
        alert("Enter User_name");       
      }
      else {
        var body = {first_name: text.first_name,last_name: text.last_name,email: text.user_name,password: text.password}
        axios.post('http://206.189.231.135:4000/user/signup',body)
        .then(res=>{
          dispatch({ type: 'SIGN_UP', payload: body})
          ownProps.navigation.navigate('Login')
          },err=>{
          alert(err);
        }) 
      }      
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    color: '#ffffff', 
    marginTop: 10   
  },

  textMain: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  textInput: {
    color:'#fff',
    height: 30,
    width: 200, 
    borderColor: '#ffffff',
    borderWidth: 1 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:250,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
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
  loginText: {
    color: 'white',
  },
  menuContent: {
    color: "#000",
    fontWeight: "bold",
    padding: 2,
    fontSize: 20
  }
  
});                


AppRegistry.registerComponent(SignUp, () => App);
