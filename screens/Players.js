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

export default class Players extends Component {
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

  delete(x, index){
    const user = firebase.database().ref("/users/" + x );
    user.remove();

    GLOBAL.prac[index] = -1;

  }
  miss(x){
    console.log(GLOBAL.Miss[x%100])
    

    GLOBAL.Miss[x%100]+=1;

    firebase
        .database()
        .ref("users/"+ x)
        .update({
          Miss: GLOBAL.Miss[x % 100],
        });
  }

  componentWillUnmount(){
    for(let i =0;i<GLOBAL.prac.length;++i)
    {
      firebase
        .database()
        .ref("users/"+ GLOBAL.prac[i])
        .update({
          Miss: GLOBAL.Miss[GLOBAL.prac[i]],
        });
    }

  }
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
    
    <SafeAreaView style={{backgroundColor:"white"}}>
      <TouchableOpacity onPress={()=>this.props.navigation.navigate("MainScreen")} style = {{width:40,height:40}}><Image style ={{width:60,height:40}}source={require("../assets/Home.png")}></Image></TouchableOpacity>
    <ScrollView  //contentContainerStyle={{alignItems:"center"}}
    >
      <Text style={{alignSelf:"center",color:"red", fontFamily:"Futura-CondensedExtraBold",fontSize:80, paddingBottom:10, textDecorationLine:"underline"}}>Roster</Text>

        {
            GLOBAL.prac.map((item,index)=>(
                <TouchableOpacity
                    key = {index}
                    //onPress={() => this.update(GLOBAL.prac[index])}
                    //onPress={() => this.delete(GLOBAL.prac[index], index)}
                    onPress={() => this.props.navigation.navigate("StatTracker", {num: GLOBAL.prac[index]})}
                    
                    style={{ width:200, height:200, alignItems:"center"}}
                >
                    <ImageBackground style={{width:200, height:200,alignItems:"center", justifyContent:"center"}}source={require("../assets/square.png")}>
                    
                        <Text style={{fontSize:40, fontFamily: "Futura-CondensedExtraBold", color:"red"}}>{GLOBAL.names[GLOBAL.prac[index] %100]}</Text>
                        <Text style={{fontSize:80, fontFamily: "Futura-CondensedExtraBold", color:"red"}}>#{GLOBAL.prac[index]}</Text>
                    </ImageBackground>
                  
                  <TouchableOpacity style={{left:"100%", bottom:"85%"}} onPress = {() => this.props.navigation.navigate("PlayerStats", {num: GLOBAL.prac[index]})}>
                  <ImageBackground style={{width:200, height:50,alignItems:"center", justifyContent:"center"}}source={require("../assets/BlackBrush.png")}>
                      <Text style={{fontFamily:"Futura-CondensedExtraBold",color:"white"}}>{GLOBAL.names[GLOBAL.prac[index] %100]}'s Stats</Text>
                  </ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ width:200, height:200, alignItems:"center"}} onPress={() => this.miss(GLOBAL.prac[index])}>

                  <Image style ={{width:60,height:60, left:"100%", bottom:"80%"}}source={require("../assets/Miss.png")} /> 


                  </TouchableOpacity>
                </TouchableOpacity>

                
            ))
        }

  <TouchableOpacity style={{width:300, height:100, alignSelf:"center"}} onPress = {() => this.props.navigation.navigate('Boxscore')}>
    <ImageBackground style={{width:300, height:100,alignSelf:"center", alignItems:"center"}}source={require("../assets/BlackBrush.png")}>
        <Text style={{fontFamily:"Futura-CondensedExtraBold",color:"white", top:"28%", fontSize:40}}>Team Stats</Text>
    </ImageBackground>
  </TouchableOpacity>
        
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

 