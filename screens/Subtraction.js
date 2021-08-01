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

export default class StatTracker extends Component {
    state = {
        bucket:0,
        temp: 0,
        name:"",
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
  Asts_update(x){  
    if(GLOBAL.asts[x%100] > 0){
        GLOBAL.asts[x%100]-=1;
    }
    this.props.navigation.navigate('Players')

  }
  fouls_update(x){
    if(GLOBAL.fouls[x%100] > 0){
        GLOBAL.fouls[x%100]-=1;
    }
    if(GLOBAL.fouls[x%100] >= 4)
      Alert.alert("FOUL TROUBLE", GLOBAL.names[x%100]+" is in foul trouble")
    
    this.props.navigation.navigate('Players')

  }
  rebs_update(x){
    if(GLOBAL.rebs[x%100] > 0)
        GLOBAL.rebs[x%100]-=1;

    this.props.navigation.navigate('Players')
  }
  pts_update(x, one, two){
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

   if(one && GLOBAL.points[x%100] > 0){
     GLOBAL.points[x%100]-=1;
   }
   else if(two && (GLOBAL.points[x%100] - 2) >= 0){
    GLOBAL.points[x%100]-=2;
    GLOBAL.Make[x%100] -= 1;
   }
   else{
     if((GLOBAL.points[x%100] - 3) >= 0){
      GLOBAL.points[x%100]-=3;
      GLOBAL.Make[x%100]-= 1;

     }
   }

   //console.log(x)
   //console.log(GLOBAL.points[x%100])
   
   /*if(GLOBAL.points[x%100] > 34)
    Alert.alert("FOUL TROUBLE", "30 PTS")*/
    
    this.props.navigation.navigate('Players')


  };

  prac(x){

    const user = firebase.database().ref("/users/" + x + "/Points/");
    user.once("value", (datasnap) => {
        //GLOBAL.points.push(datasnap.val());
        GLOBAL.points[x % 100] = datasnap.val()
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
        if(GLOBAL.prac[i] != -1){
          this.prac(GLOBAL.prac[i])
        }
    }
    const numb = this.props.navigation.getParam('num')
    console.log(numb);

    this.setState({
        temp: numb,
        name: GLOBAL.names[numb %100],
      });
    
  }
  componentWillUnmount(){
    for(let i =0;i<GLOBAL.prac.length;++i)
    {
      firebase
        .database()
        .ref("users/"+ GLOBAL.prac[i])
        .update({
          Points: GLOBAL.points[GLOBAL.prac[i]],
          Asts: GLOBAL.asts[GLOBAL.prac[i]],
          Rebs: GLOBAL.rebs[GLOBAL.prac[i]],
          fouls: GLOBAL.fouls[GLOBAL.prac[i]],
        });
    }

  }
  render(){
  return (
    <ScrollView contentContainerStyle= {{top:"8%", left:"1%"}}
    >
    
    <Text  style={{color:"red",fontSize:60,fontFamily: "HelveticaNeue-CondensedBlack", textDecorationLine:"underline", alignSelf:"center",position:"absolute", bottom:"95%"}}>{this.state.name}</Text>
    <View style={{top:"10%"}}>
    <TouchableOpacity
        style={{ width:200, height:200, alignItems:"center"}}
        onPress={() => this.pts_update(this.state.temp,true,false)}
        >
                <ImageBackground style={{width:200, height:200,alignItems:"center", position:"absolute", justifyContent:"center"}}source={require("../assets/square.png")}>
                    <Text style={{fontSize:40, fontFamily: "Futura-CondensedExtraBold", color:"red"}}>-1 Points</Text>
                </ImageBackground>
                  
    </TouchableOpacity>

    <TouchableOpacity
        style={{ width:200, height:200, position:"absolute", bottom:"50%", left:"50%", alignItems:"center"}}
        onPress={() => this.pts_update(this.state.temp,false,true)}
        >
                <ImageBackground style={{width:200, height:200,alignItems:"center", justifyContent:"center"}}source={require("../assets/square.png")}>
                    <Text style={{fontSize:40, fontFamily: "Futura-CondensedExtraBold", color:"red"}}>-2 Points</Text>
                </ImageBackground>
                  
    </TouchableOpacity>

    <TouchableOpacity
        style={{ width:200, height:200, position:"absolute",top:"50%", left:"50%", alignItems:"center"}}
        onPress={() => this.pts_update(this.state.temp,false,false)}
        >
                <ImageBackground style={{width:200, height:200,alignItems:"center", justifyContent:"center"}}source={require("../assets/square.png")}>
                    <Text style={{fontSize:40, fontFamily: "Futura-CondensedExtraBold", color:"red"}}>-3 Points</Text>
                </ImageBackground>
                  
    </TouchableOpacity>

    <TouchableOpacity
        style={{ width:200, height:200, position:"absolute", top:"50%",alignItems:"center"}}
        onPress={() => this.rebs_update(this.state.temp)}
        >
                <ImageBackground style={{width:200, height:200,alignItems:"center", justifyContent:"center"}}source={require("../assets/square.png")}>
                    <Text style={{fontSize:40, fontFamily: "Futura-CondensedExtraBold", color:"red"}}>-1 REBS</Text>
                </ImageBackground>
                  
    </TouchableOpacity>

    <TouchableOpacity
        style={{ width:200, height:200, position:"absolute",top:"100%", alignItems:"center"}}
        onPress={() => this.Asts_update(this.state.temp)}
        >
                <ImageBackground style={{width:200, height:200,alignItems:"center", justifyContent:"center"}}source={require("../assets/square.png")}>
                    <Text style={{fontSize:40, fontFamily: "Futura-CondensedExtraBold", color:"red"}}>-1 ASTS</Text>
                </ImageBackground>
                  
    </TouchableOpacity>

    <TouchableOpacity
        style={{ width:200, height:200, top:"50%", left:"50%", alignItems:"center"}}
        onPress={() => this.fouls_update(this.state.temp)}
        >
                <ImageBackground style={{width:200, height:200,alignItems:"center", justifyContent:"center"}}source={require("../assets/square.png")}>
                    <Text style={{fontSize:40, fontFamily: "Futura-CondensedExtraBold", color:"red"}}>-1 FOULS</Text>
                </ImageBackground>
                  
    </TouchableOpacity>
    </View>

    

      

      
      
      
    
    </ScrollView>
    
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

 