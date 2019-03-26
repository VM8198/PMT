import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { Actions } from 'react-native-router-flux';

class LogIn extends React.Component {

  
  state = {
    user: "",
    pwd: "",
  } 

  render(){
    const navigation = this.props.navigation;
    return(
      <View style={styles.container}>       
                 
      <View  style={styles.inputContainer}>
      <TextInput style={styles.inputs}
              placeholder="User Name"
              underlineColorAndroid='transparent'
              onChangeText={(text)=>this.setState({user: text})}/>
      </View>          
      <View style={styles.inputContainer}>
      <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(text)=>this.setState({pwd: text})}/>
      </View>        
      <View style={styles.btn}>
      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}  onPress = {()=>this.props.logIn(this.state)}>
         <Text style={styles.loginText}>Login</Text>
      </TouchableHighlight> 

       <TouchableHighlight style={styles.buttonContainer}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight>
                
      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress = {()=>navigation.navigate('SignUp')}>  
      <Text>Register here</Text>
        </TouchableHighlight>      
      </View>             
      </View>      
      );
   }
}

const mapStateToProps = (state) =>{
  return {   
    user_name: state.user_name,
    password: state.password,
  };
};

const mapDispatchToProps = (dispatch,ownProps) =>{
  return{
    logIn: (text) => {
      if(text.user == ""){
        alert("Enter user name");       
      }
      else if(text.pwd == ""){
        alert("Enter Password");       
      }      
      else {
        var body = {email: text.user,password: text.pwd}
        console.log("body",body);
        axios.post('http://206.189.231.135:4000/user/login',body)
        .then(res=>{
             dispatch({ type: 'LOG_IN',
               payload: [
                           body,res.data.data._id,
                           res.data.data.name,
                           res.data.data.userRole,
                           res.data.data.email,
                           res.data.data.tasks.length,
                           res.data.data.phone,
                           res.data.data.profilePhoto
                         ]
                     });
             ownProps.navigation.navigate('Home');
        },err=>{         
             alert(err);         
        }) 
      }      
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LogIn)

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
  }
  
});                

