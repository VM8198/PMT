import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, KeyboardAvoidingView, Picker } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

class EditDetails extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			userName: '',
			userRole: '',
			userEmail: '',
			userMobile: '',
			role: 'developer'
		}
	}

	render(){
		let name=this.props.name;
		let role=this.props.userRole;
		let email=this.props.email;
		let mobile=this.props.phone;
		let tasks=this.props.totalTasks;
		return(
		<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
  
		<View style={styles.container}>
         	 <View style={styles.header}>
            <Text style={styles.name}>EDIT DETAILS</Text>                  
        </View>
        <View style={styles.body}>
         <View style={styles.bodyContent}>
            <Text style={styles.info}>Name : </Text>
            <TextInput
            style={styles.info}
            placeholder={name}
            onChangeText={(text)=>this.setState({userName: text})}/>                        
          </View>         
          <View style={styles.bodyContent}>
            <Text style={styles.info}>Email : </Text>
            <TextInput
            style={styles.info}
            placeholder={email}
            onChangeText={(text)=>this.setState({userEmail: text})}></TextInput>                        
          </View>
           <View style={styles.bodyContent}>
            <Text style={styles.info}>Mobile : </Text>
            <TextInput
            style={styles.info}
            placeholder={mobile}
            onChangeText={(text)=>this.setState({userMobile: text})}></TextInput>                        
          </View> 
           <View style={styles.bodyContent}>
            <Text style={styles.info}>Role : </Text>
            <Picker
		        selectedValue={this.state.role}
		        style={{height: 50, width: 200}}
		        onValueChange={(itemValue, itemIndex) =>
		          this.setState({role: itemValue})
		        }>
		        <Picker.Item label="Developer" value="developer" />
		        <Picker.Item label="User" value="user" />
		        <Picker.Item label="ABCD" value="abcd" />
		    </Picker>                       
          </View>         
          <View style={styles.button}>
            <TouchableHighlight style={[styles.buttonContainer, styles.updateButton]} onPress = {()=>this.props.update(this.state,this.props.id)} >  
                <Text style={styles.btnText}>Update</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.button}>
            <TouchableHighlight style={[styles.buttonContainer, styles.updateButton]} onPress = {()=>this.props.navigation.navigate('Home')} >  
                <Text style={styles.btnText}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
   	</KeyboardAvoidingView>
    );
  }
}

mapStateToProps = (state) =>{
  return{
    name: state.name,
    userRole: state.userRole,
    email: state.email,
    totalTasks: state.totalTasks,
    id: state.id,
    phone: state.phone
  }
}

const mapDispatchToProps = (dispatch,ownProps) =>{
  return{
    update: (updatedDetails,id) => {
			console.log("id",id);
			details = {
				name: updatedDetails.userName,
				email: updatedDetails.userEmail,
				userRole: updatedDetails.userRole,
				phone: updatedDetails.userMobile
			}
			console.log(details);
			axios.put('http://206.189.231.135:4000/user/update-details/'+id,details)
			.then((res)=>{
				dispatch({type: 'UPDATE', payload: details});
	            ownProps.navigation.navigate('Home');
			},err=>{
				alert(err);
			})
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(EditDetails)

const styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',  
	},
	header:{    
		justifyContent: 'center',
		alignItems: 'center',    
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
		color:"#00b5ec",
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
	bodyContentPicker: {
		flexDirection: 'row',		
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
	buttonContainer: {
		height:45,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom:20,
		width:250,
		borderRadius:30,
	},
	updateButton: {
		backgroundColor: "#00b5ec",    
	},
	btnText:{
		fontSize: 22,
		color: '#fff',
		fontWeight: 'bold'
	}
});
