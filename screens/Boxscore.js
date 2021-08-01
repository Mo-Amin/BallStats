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

export default class Boxscore extends Component {
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
          
          /*
          firebase
          .database()
          .ref("users/"+ this.state.jersey_number)
          .update({
            Points: this.state.bucket,
           
          });
          */
          
    }
      
  
  };
  update(x){
      /*
    if(x != null)
    {
      const user = firebase.database().ref("/users/" + x + "/Points/");
      //READ DATA within DATABASE

      user.once("value", (datasnap) => {
        this.setState({
          bucket: datasnap.val()+1,
        });

        GLOBAL.buck = datasnap.val();
      });
      console.log(GLOBAL.buck)
      GLOBAL.buck+=1;
      

      //this.setState({bucket:num+1})
      firebase
        .database()
        .ref("users/"+ x)
        .update({
          Points: GLOBAL.buck//this.state.bucket,
           
        });
    }
    */
    
   //this.prac(x);

   GLOBAL.points[x%100]+=1;

   console.log(x)
   console.log(GLOBAL.points[x%100])
 
  };
/*
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
    
    //for(let i =0;i<GLOBAL.points.length;++i){
        //console.log(GLOBAL.points[i])
      //}
    //console.log(GLOBAL.points.length)


  };
  */
  /*
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
    
  }
  */
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
    
    <SafeAreaView>
    <ScrollView  contentContainerStyle={{backgroundColor:"white"}}//alignItems:"center"}}
    >
      <Text style={{alignSelf:"center",color:"red", fontFamily:"Futura-CondensedExtraBold", textDecorationLine:"underline",fontSize:80, paddingBottom:10}}>Box Score</Text>
        {
            GLOBAL.prac.map((item,index)=>(
                <View
                    key = {index}
                    //onPress={() => this.update(GLOBAL.prac[index])}                    
                    style={{ width:200, height:200, alignItems:"center"}}
                >
                    <ImageBackground style={{width:200, height:200,alignItems:"center", justifyContent:"center"}}source={require("../assets/square.png")}>
                    
                        <Text style={{fontSize:40, fontFamily: "Futura-CondensedExtraBold", color:"red"}}>{GLOBAL.names[GLOBAL.prac[index] %100]}</Text>
                        <Text style={{fontSize:80, fontFamily: "Futura-CondensedExtraBold", color:"red"}}>#{GLOBAL.prac[index]}</Text>
                    </ImageBackground>
                  

                    <Text style={{fontSize:17,fontFamily:"Verdana-Bold",left:"80%", bottom:"90%"}}>{GLOBAL.points[GLOBAL.prac[index] %100]} PTS {"\n\n"}{GLOBAL.rebs[GLOBAL.prac[index] %100]} REBS {"\n\n"}{GLOBAL.asts[GLOBAL.prac[index] %100]} ASTS {"\n\n"}{GLOBAL.fouls[GLOBAL.prac[index] %100]} FLS 
                    </Text>

                    {GLOBAL.Make[GLOBAL.prac[index] %100] + GLOBAL.Miss[GLOBAL.prac[index] %100] != 0 ?<Text style={{fontSize:17,fontFamily:"Verdana-Bold",left:"130%", bottom:"142%"}}>{GLOBAL.Make[GLOBAL.prac[index] %100]}/{GLOBAL.Make[GLOBAL.prac[index] %100] + GLOBAL.Miss[GLOBAL.prac[index] %100]} FG{"\n"}({(GLOBAL.Make[GLOBAL.prac[index] %100] / (GLOBAL.Make[GLOBAL.prac[index] %100] + GLOBAL.Miss[GLOBAL.prac[index] %100])).toFixed(2) * 100}%)</Text>:<Text style={{fontSize:17,fontFamily:"Verdana-Bold",left:"130%", bottom:"142%"}}>{GLOBAL.Make[GLOBAL.prac[index] %100]}/{GLOBAL.Make[GLOBAL.prac[index] %100] + GLOBAL.Miss[GLOBAL.prac[index] %100]} FG{"\n"}(0%)</Text> }
                </View>
                

                
            ))
        }
        
       
     

      

    </ScrollView>
    </SafeAreaView>
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

 