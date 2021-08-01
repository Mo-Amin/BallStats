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

export default class PlayerStats extends Component {
  state = {
    number:null,
    
  };

  componentDidMount(){
    const numb = this.props.navigation.getParam('num')

    this.setState({
        number: numb,
      });
  };
  /*
  componentWillUnmount(){
    
    for(let i =0;i<GLOBAL.prac.length;++i)
    {
      firebase
        .database()
        .ref("users/"+GLOBAL.prac[i])
        .update({
          Points: GLOBAL.points[GLOBAL.prac[i]],
           
        });
    }
  }
  */
  
  render(){
  return (
    <ImageBackground style={{alignItems:"center", justifyContent:"center"}} source={require("../assets/Black.jpeg")}>
    <SafeAreaView>
        
    <ScrollView  //contentContainerStyle={{alignItems:"center"}}
    >
        <Text  style={{color:"white",fontSize:60,alignSelf:"center",fontFamily: "Verdana-Bold",textDecorationLine:"underline"}}> {GLOBAL.names[this.state.number %100]}</Text>
      
      
      
    
    </ScrollView>
    <View style={{alignItems:"center",justifyContent:"center"}}>
    <Text  style={{color:"red",fontSize:60,fontFamily: "HelveticaNeue-CondensedBlack",padding:"7%"}}>{GLOBAL.points[this.state.number %100]} PTS</Text>
    <Text  style={{color:"red",fontSize:60,fontFamily: "HelveticaNeue-CondensedBlack", padding:"7%"}}>{GLOBAL.asts[this.state.number %100]} ASTS</Text>
    <Text  style={{color:"red",fontSize:60, fontFamily: "HelveticaNeue-CondensedBlack", padding:"7%"}}>{GLOBAL.rebs[this.state.number %100]} REBS</Text>
    <Text  style={{color:"red",fontSize:60,fontFamily: "HelveticaNeue-CondensedBlack", padding:"7%"}}>{GLOBAL.fouls[this.state.number %100]} FLS</Text>
    {GLOBAL.Make[this.state.number %100] + GLOBAL.Miss[this.state.number %100] != 0?<Text  style={{color:"red",fontSize:60,fontFamily: "HelveticaNeue-CondensedBlack", padding:"7%"}}>{GLOBAL.Make[this.state.number %100]}/{GLOBAL.Make[this.state.number %100] + GLOBAL.Miss[this.state.number %100]} FG{"\n"}({(GLOBAL.Make[this.state.number %100] / (GLOBAL.Make[this.state.number %100] + GLOBAL.Miss[this.state.number %100])).toFixed(2) * 100}%)</Text>:<Text  style={{color:"red",fontSize:60,fontFamily: "HelveticaNeue-CondensedBlack", padding:"7%"}}>{GLOBAL.Make[this.state.number %100]}/{GLOBAL.Make[this.state.number %100] + GLOBAL.Miss[this.state.number %100]} FG {"\n"} (0%)</Text> }
    </View>
    </SafeAreaView>
    </ImageBackground>
  );
  }
}
/*
<Text style={{fontSize:17,fontFamily:"Verdana-Bold",left:"85%", bottom:"90%"}}>{GLOBAL.points[GLOBAL.prac[index] %100]} PTS {"\n\n"}
{GLOBAL.rebs[GLOBAL.prac[index] %100]} REBS {"\n\n"}{GLOBAL.asts[GLOBAL.prac[index] %100]} ASTS {"\n\n"}{GLOBAL.fouls[GLOBAL.prac[index] %100]} FLS

</Text>
*/
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

 