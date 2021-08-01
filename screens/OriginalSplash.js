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
  ActivityIndicator,
} from "react-native";
import * as firebase from "firebase";
import GLOBAL from "../Global";
export default class OriginalSplash extends Component {
  state = {
    num: 0,
    name:"",
  };
  prac(x){

    const user = firebase.database().ref("/users/" + x + "/Points/");
    user.once("value", (datasnap) => {
        //GLOBAL.points.push(datasnap.val());
        GLOBAL.points[x % 100] = datasnap.val()
      });

    const asts = firebase.database().ref("/users/" + x + "/Asts/");
      asts.once("value", (datasnap) => {
          //GLOBAL.points.push(datasnap.val());
          GLOBAL.asts[x % 100] = datasnap.val()
        });
    
    const rebs = firebase.database().ref("/users/" + x + "/Rebs/");
      rebs.once("value", (datasnap) => {
            //GLOBAL.points.push(datasnap.val());
            GLOBAL.rebs[x % 100] = datasnap.val()
          });

    const foul = firebase.database().ref("/users/" + x + "/fouls/");
      foul.once("value", (datasnap) => {
          //GLOBAL.points.push(datasnap.val());
          GLOBAL.fouls[x % 100] = datasnap.val()
        });

    const names = firebase.database().ref("/users/" + x + "/name/");
      names.once("value", (datasnap) => {
          //GLOBAL.points.push(datasnap.val());
          GLOBAL.names[x % 100] = datasnap.val()
        });

    const makes = firebase.database().ref("/users/" + x + "/Make/");
      makes.once("value", (datasnap) => {
          //GLOBAL.points.push(datasnap.val());
          GLOBAL.Make[x % 100] = datasnap.val()
        });

    const misses = firebase.database().ref("/users/" + x + "/Miss/");
      misses.once("value", (datasnap) => {
          //GLOBAL.points.push(datasnap.val());
          GLOBAL.Miss[x % 100] = datasnap.val()
        });
    
    
    //for(let i =0;i<GLOBAL.points.length;++i){
        //console.log(GLOBAL.points[i])
      //}
    //console.log(GLOBAL.points.length)


  };
  componentDidMount(){
  
    const userpic = firebase.database().ref("users/")
    userpic.once("value", function(snapshot){

    //console.log(Object.keys(snapshot.val()))
    GLOBAL.prac = Object.keys(snapshot.val()).map(Number)
      
    });
    console.log(GLOBAL.prac)

    //GLOBAL.array_prac = Object.values(GLOBAL.prac[0][1])
    //console.log(GLOBAL.array_prac[3])
     
    //console.log(GLOBAL.prac);
    //console.log(GLOBAL.prac.length)
      
    
    for(let i =0;i<GLOBAL.prac.length;++i){
        this.prac(GLOBAL.prac[i])
    }

    const check = this.props.navigation.getParam('flag')
    setTimeout(() => {
        // Add your logic for the transition
        if(check == 1){
          this.props.navigation.navigate('DeletePlayer');
        }
        else if(check == 2){
          this.props.navigation.navigate('ChangePlayerNum');
        }
        else{
          this.props.navigation.navigate('Players');
        }
      }, 1000);
  
    
  }


  render() {
    return (
      <View style={styles.container}>
      
      <View>
        <Text style={{fontFamily: "Futura-CondensedExtraBold",fontSize:80, bottom:'10%',alignItems:'center', justifyContent:"center",textShadowColor: 'rgba(255,0,0,0.8)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 15}}>Loading...</Text>
    <View style={{paddingBottom:"10%"}}>
        <Image style={{width:200, height:200, alignSelf:"center"}}source={require("../assets/ball.png")} />
    </View>  
    <ActivityIndicator size="large"></ActivityIndicator>
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
