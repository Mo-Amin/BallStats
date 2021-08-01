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

export default class ChangePlayerNum extends Component {
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

  delete(x, index){
    if(this.state.jersey_number != null && x != this.state.jersey_number){
      alert(GLOBAL.names[x%100] + "'s # has been changed from #" +GLOBAL.prac[index]+" to #" +this.state.jersey_number)
      GLOBAL.prac[index] = this.state.jersey_number;
      const user = firebase.database().ref("/users/" + x);
      user.remove();
      const NewNum = this.state.jersey_number % 100
      const oldNum = x % 100

      GLOBAL.names[NewNum] = GLOBAL.names[oldNum]
      GLOBAL.points[NewNum] = GLOBAL.points[oldNum]
      GLOBAL.asts[NewNum] = GLOBAL.asts[oldNum]
      GLOBAL.rebs[NewNum] = GLOBAL.rebs[oldNum]
      GLOBAL.fouls[NewNum] = GLOBAL.fouls[oldNum]
      GLOBAL.Make[NewNum] = GLOBAL.Make[oldNum]
      GLOBAL.Miss[NewNum] = GLOBAL.Miss[oldNum]

      firebase
        .database()
        .ref("users/"+ this.state.jersey_number)
        .update({
          
          Points: GLOBAL.points[NewNum],
          Asts: GLOBAL.asts[NewNum],
          Rebs: GLOBAL.rebs[NewNum],
          fouls: GLOBAL.fouls[NewNum],
          Make: GLOBAL.Make[NewNum],
          Miss: GLOBAL.Miss[NewNum],
          name:GLOBAL.names[NewNum],
        });

      this.props.navigation.navigate('MainScreen');

    }
      /*
    alert(GLOBAL.names[x%100] + "'s # has been changed")
    const user = firebase.database().ref("/users/" + x);
    user.remove();

    GLOBAL.prac[index] = -1;
    this.props.navigation.navigate('MainScreen');
    */

    

  }
  
  render(){
  return (
    
    <SafeAreaView style={{backgroundColor:"white"}}>
       <TouchableOpacity onPress={()=>this.props.navigation.navigate("MainScreen")} style = {{width:40,height:40}}><Image style ={{width:60,height:40}}source={require("../assets/Home.png")}></Image></TouchableOpacity>
    <ScrollView  contentContainerStyle={{alignItems:"center"}}
    >

<Text style={{alignSelf:"center",color:"red", fontFamily:"Futura-CondensedExtraBold",fontSize:80, paddingBottom:10, textDecorationLine:"underline"}}># Change</Text>
      <TextInput
                placeholder="#"
                placeholderTextColor="grey"
                keyboardType={"phone-pad"}
                style={styles.input}
                onChangeText={(jersey_number) => this.setState({ jersey_number })}
                value={this.state.jersey_number}
                maxLength ={2}
                textAlign={'center'}
  />
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
    input: {
    height: 80,
    width: 80,
    borderWidth: 2,
    marginBottom: 30,
    borderRadius: 5,
    paddingHorizontal: 5,
    alignSelf:"center",

    //    color: "red",
    backgroundColor: "white",
    //opacity: 0.3,

    borderColor: "red",
    color: "red",
    fontFamily: "GillSans-SemiBold",
    fontSize: 32,
  },
});

 