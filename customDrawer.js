import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation';
import { connect } from 'react-redux';
import axios from 'axios';
import { ImagePicker } from 'expo';



class custom  extends React.Component {
  constructor(props){
    super(props);
      this.state = {
          image: '',
        };
  }

  render(){
      var image = this.state.image ? {uri: this.state.image} : require('./assets/profile.jpg');
      return(
        <SafeAreaView style = {{flex:1}}>
        <View style={styles.container} >
        <TouchableOpacity onPress={()=>this._pickImage()}>        
           <Image style={styles.image} source={image}/>
        </TouchableOpacity>
              <Text style = {{fontSize: 20,marginTop: 10}}>{this.props.name}</Text>
        </View>
        <ScrollView>
          <DrawerItems {...this.props}/>
        </ScrollView>
        </SafeAreaView>
        );
     }

  _pickImage = async () => {
    console.log("imagePicker");
    console.log(this.state.image);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],      
    });
    console.log("res",result);

    this.setState({image: result.uri})
        console.log(this.state.image);
  }
  addData = () => {  
    const form = new FormData();
    form.append({
      profilePhoto: './assets/profile.jpg',
      type: 'image/jpg'
    });
    this.upload(form);
   }
   upload = (formData) => {
   // console.log("formData",formData);    
   //   console.log('http://206.189.231.135:4000/user/change-profile/'+this.props.id);
   //   fetch(
   //       'http://206.189.231.135:4000/user/change-profile/'+this.props.id,
   //       {
   //         body: formData,
   //         method: "PUT"        
   //       }
   //     )     
   //    .then((response) => response.json())
   //    .catch((error) => console.log(error));
   }
}

mapStateToProps = (state) =>{
  return{
    name: state.name,
    id: state.id,
  }
}




export default connect(mapStateToProps)(custom)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  image:{  	
  	borderRadius: 150,
  	height: 150,
  	width: 150,
  }
});

// 5c9216949b3ad93a260b8aac