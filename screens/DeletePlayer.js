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
  StatusBar,
  ScrollView
} from "react-native";
import * as firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GLOBAL from "../Global";
import { SafeAreaView } from "react-native";

export default class DeletePlayer extends Component {
  state = {
    bucket:0,
    email: "",
    Password: "",
    name: null,
    jersey_number: null,
    phonenumber: "",
    Points: "",
    bro:null,
    
  };
  temp(){
    if(this.state.jersey_number != null)
    {
      
        firebase
          .database()
          .ref("users/"+ this.state.jersey_number)
          .set({
            name: "",
            Points: this.state.bucket,
            Asts:0,
            Rebs:0,
          });

    }
      
  
  };
  update(x){

   GLOBAL.points[x%100]+=1;

   console.log(x)
   console.log(GLOBAL.points[x%100])
 
  };

  delete(x, index){
    alert(GLOBAL.names[x%100] + " has been removed from the team")
    const user = firebase.database().ref("/users/" + x);
    user.remove();

    GLOBAL.prac[index] = -1;
    this.props.navigation.navigate('MainScreen');

    

  }
  
  render(){
  return (
    
    <SafeAreaView style={{backgroundColor:"white"}}>
      <TouchableOpacity onPress={()=>this.props.navigation.navigate("MainScreen")} style = {{width:40,height:40}}><Image style ={{width:60,height:40,}}source={require("../assets/Home.png")}></Image></TouchableOpacity>
    <ScrollView  contentContainerStyle={{alignItems:"center"}}
    >

<Text style={{alignSelf:"center",color:"red", fontFamily:"Futura-CondensedExtraBold",fontSize:80, paddingBottom:10, textDecorationLine:"underline"}}>REMOVAL</Text>
        {
            GLOBAL.prac.map((item,index)=>(
                <TouchableOpacity
                    key = {index}
                    onPress={() => this.delete(GLOBAL.prac[index], index)}
                    
                    style={{ width:200, height:200, alignItems:"center"}}
                >
                    <ImageBackground style={{width:200, height:200,alignItems:"center", justifyContent:"center"}}source={require("../assets/square.png")}>
                    
                        <Text style={{fontSize:40, fontFamily: "Futura-CondensedExtraBold", color:"red"}}>{GLOBAL.names[GLOBAL.prac[index] %100]}</Text>
                        <Text style={{fontSize:80, fontFamily: "Futura-CondensedExtraBold", color:"red"}}>#{GLOBAL.prac[index]}</Text>
                    </ImageBackground>
                  
                </TouchableOpacity>

                
            ))
        }
        
    </ScrollView>
    </SafeAreaView>
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
  username_input: {
    borderBottomWidth: 2,
    opacity: 0.4,
    borderBottomColor: "black",
    padding: 3,
    margin: 10,
    width: 288,
    backgroundColor: "white",
    fontFamily: "GillSans-SemiBold",
    fontSize: 20,
    color: "black",
    //position: "absolute",
    //top: "40%",
  },
});

 