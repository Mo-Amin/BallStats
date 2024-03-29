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
class Loginscreen extends Component {
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
      
      //console.log(GLOBAL.prac.length)
      //GLOBAL.array_prac = Object.values(GLOBAL.prac[0][1])
      //console.log(GLOBAL.array_prac[3])
     
      //console.log(GLOBAL.prac);
      //console.log(GLOBAL.prac.length)
      
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
            Make:0,
            Miss:0,
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
      this.props.navigation.navigate("OriginalSplash")
    }


  }


  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, backgroundColor: "white", alignItems:"center" }}>
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Text style={styles.textcolor}>MoStats</Text>
              <TextInput
                placeholder="Name"
                placeholderTextColor="grey"
                style={styles.input}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                maxLength={8}
              />
              <TextInput
                placeholder="Jersey #"
                placeholderTextColor="grey"
                keyboardType={"phone-pad"}
                style={styles.input}
                onChangeText={(jersey_number) => this.setState({ jersey_number })}
                value={this.state.jersey_number}
                maxLength ={2}
              />
              <View>
              <TouchableOpacity
                style={styles.button}
                onPress={()=>this.PlayerRegister()}
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

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "gray",
                    fontFamily: "Verdana-BoldItalic",
                    fontSize: 18,
                    alignSelf: "center",
                  }}
                >
                  Ready?
                </Text>
                <TouchableOpacity
                  //onPress={() => this.props.navigation.navigate("Players")}
                  //onPress={() => this.props.navigation.navigate("OriginalSplash")}
                  onPress={() => this.PlayerCheck()}
                  style={{ width: 120, height: 50 }}
                >
                  <Text
                    style={{
                      paddingTop: 8,
                      color: "red",
                      textDecorationLine: 'underline',
                      fontFamily: "GillSans-SemiBold",
                      fontSize: 18,
                      alignSelf: "center",
                      margin: 6,
                    }}
                  >
                    Stat Tracker
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  inner: {
    flex: 1,
    top: "21%",
    backgroundColor: "white",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  input: {
    height: 58,
    width: 300,
    borderWidth: 2,
    marginBottom: 30,
    borderRadius: 5,
    paddingHorizontal: 5,

    //    color: "red",
    backgroundColor: "white",
    //opacity: 0.3,

    borderColor: "red",
    color: "red",
    fontFamily: "GillSans-SemiBold",
    fontSize: 18,
  },
  btnContainer: {
    backgroundColor: "#6CC6E1",
    marginTop: 12,
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
    textShadowColor: 'rgba(255, 0, 0, 1)',
    paddingBottom: 20,
  },
  img: {
    width: 247.49,
    height: 198.28,
    marginVertical: 10,

    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  Google: {
    width: normalize(30),
    height: normalize(30),
    alignSelf: "center",
    margin: 10,
  },
  Facebook: {
    width: normalize(30),
    height: normalize(30),
    alignSelf: "center",
    margin: 10,
  },
  errorMessage: {
    height: 72,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "red",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  Or: {
    marginTop: 30,
    height: 22,
    width: 300,
  },
});

export default Loginscreen;