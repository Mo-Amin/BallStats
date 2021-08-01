import React, { Component, useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as firebase from "firebase";
import GLOBAL from "../Global";
export default class HomeScreen extends Component {
  state = {
    num: 0,
    name:"",
  };
  
  componentDidMount() {

    this.setState({num:this.props.navigation.getParam('num'), name:this.props.navigation.getParam('name')})
    const userpic = firebase.database().ref("users/")
    userpic.once("value", function(snapshot){

      //console.log(Object.keys(snapshot.val()))
      GLOBAL.prac = Object.keys(snapshot.val()).map(Number)
      
      });
      console.log(GLOBAL.prac.length)

      
      
    // Start counting when the page is loaded
    setTimeout(() => {
      // Add your logic for the transition
      this.props.navigation.goBack();
    }, 2500);

  }
  componentWillUnmount(){
    GLOBAL.names[this.state.num % 100] = this.state.name;
  }
  

  render() {
    return (
      <View style={styles.container}>
      
      <View>
        <Text style={{fontFamily: "Futura-CondensedExtraBold",fontSize:80, bottom:'10%',alignItems:'center', justifyContent:"center",textShadowColor: 'rgba(255,0,0,0.8)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 15}}>{this.state.name} #{this.state.num} {"\n"}has been REGISTERED</Text>
    </View>  


    <View>
        <Image style={{width:200, height:200}}source={require("../assets/ball.png")} />
      </View>  
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
