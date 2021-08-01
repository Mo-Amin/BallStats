import React, { Component } from "react";
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import normalize from "react-native-normalize";
import GLOBAL from "../Global";
//import * as Facebook from "expo-facebook";

//import * as Permissions from "expo-permissions";
//import * as Google from "expo-google-app-auth";

/*const IOS_CLIENT_ID =
  "837272527093-ar4ce3vl2idseqik7732h25rae142htr.apps.googleusercontent.com";
  */
class MainScreen extends Component {
  state = {
    name: "",
    Password: "",
    error: false,
    errorMessage: null,
    jersey_number: null,
  };

  
  componentDidMount(){
    
    const userpic = firebase.database().ref("users/")
    userpic.once("value", function(snapshot){
      //console.log(snapshot.val())

      if(snapshot.val() != null)
      {
        //console.log(Object.keys(snapshot.val()))
        GLOBAL.prac = Object.keys(snapshot.val()).map(Number)
      }
      else{
        GLOBAL.error = true;
      }
    
    });
    /*
    const games = firebase.database().ref("NumberOfGames/")
    games.once("value", function(snapshot){
      //console.log(snapshot.val())
        console.log(snapshot.val())
    
    });
    */
      //console.log(GLOBAL.prac.length)
      //GLOBAL.array_prac = Object.values(GLOBAL.prac[0][1])
      //console.log(GLOBAL.array_prac[3])
     
      //console.log(GLOBAL.prac);
      //console.log(GLOBAL.prac.length)
      
  }
  reset(x){
    firebase
          .database()
          .ref("users/"+ x)
          .update({
            Points: 0,
            Asts:0,
            Rebs:0,
            fouls:0,
            Miss:0,
            Make:0,
          });

  }
  restart(){
    if(GLOBAL.error){
      Alert.alert("NO PLAYERS. YOU NEED TO ENTER A PLAYER")
    }
    else{
      if(GLOBAL.prac.length > 0){
        for(let i = 0; i<GLOBAL.prac.length;++i){
          this.reset(GLOBAL.prac[i]);
        }
      }
    }
    
  }

  delete(){
    if(GLOBAL.error){
      Alert.alert("NO PLAYERS. YOU NEED TO ENTER A PLAYER")
    }
    else{

    
      if(GLOBAL.prac.length > 0){

        this.props.navigation.navigate("OriginalSplash", {flag: 1})
        //this.props.navigation.navigate('DeletePlayer');
      }
    }

  }
  Change(){
    if(GLOBAL.error){
      Alert.alert("NO PLAYERS. YOU NEED TO ENTER A PLAYER")
    }
    else{

    
      if(GLOBAL.prac.length > 0){

        this.props.navigation.navigate("OriginalSplash", {flag: 2})
        //this.props.navigation.navigate('DeletePlayer');
      }
    }

  }


  PlayerRegister(){
    if(this.state.jersey_number != null)
    {
      
        firebase
          .database()
          .ref("users/"+ this.state.jersey_number)
          .set({
            name: this.state.name,
            Points: 0,
            Asts:0,
            Rebs:0,
            fouls:0,
          });

          GLOBAL.error = false;

          this.props.navigation.navigate('Splash', {name:this.state.name, num: this.state.jersey_number})
          
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


  PlayerCheck(){
    if(GLOBAL.error){
      Alert.alert("NO PLAYERS. YOU NEED TO ENTER A PLAYER")
    }
    else{
      this.props.navigation.navigate("OriginalSplash",{flag: 0})
    }


  }


  render() {
    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.textcolor}>MoStats</Text>            
             <View>
              <TouchableOpacity
                style={styles.button}
                onPress={()=>this.props.navigation.navigate('Login')}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Verdana-BoldItalic",
                    fontSize: 25,
                  }}
                >
                  Register Player
                </Text>
              </TouchableOpacity>
              </View>

              <View style={{padding:10}}>

                <TouchableOpacity
                  //onPress={() => this.props.navigation.navigate("Players")}
                  //onPress={() => this.props.navigation.navigate("OriginalSplash")}
                  onPress={() => this.PlayerCheck()}
                  style={styles.button}
                >
                  <Text
                    style={{
                        color: "white",
                        fontFamily: "Verdana-BoldItalic",
                        fontSize: 25,
                    }}
                  >
                    Stat Tracker
                  </Text>
                </TouchableOpacity>
                </View>

                <View>
              <TouchableOpacity
                style={styles.button}
                onPress={()=>this.restart()}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Verdana-BoldItalic",
                    fontSize: 25,
                  }}
                >
                  Reset Stats
                </Text>
              </TouchableOpacity>
              </View>

              <View style={{padding:10}}>
              <TouchableOpacity
                style={styles.button}
                onPress={()=>this.delete()}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Verdana-BoldItalic",
                    fontSize: 25,
                  }}
                >
                  Remove Player
                </Text>
              </TouchableOpacity>
              </View>

              <View>
              <TouchableOpacity
                style={styles.button}
                onPress={()=>this.Change()}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Verdana-BoldItalic",
                    fontSize: 25,
                  }}
                >
                  Change Player #
                </Text>
              </TouchableOpacity>
              </View>



        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent:"center",
    bottom:"5%"
  },
  inner: {
    flex: 1,
    top: "21%",
    backgroundColor: "white",
  },

  button: {
    backgroundColor: "black",
    borderRadius: 7,
    height: 45,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",

    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.35,
  },
  textcolor: {
    color: "black",
    fontFamily: "Verdana-BoldItalic",
    fontSize: 50,
    alignSelf: "center",
    paddingBottom: 20,
  },
  
});

export default MainScreen;