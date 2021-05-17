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
} from "react-native";
import * as firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GLOBAL from "../Global";

export default class Count extends Component {
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
          .ref("users/"+ this.state.name)
          .update({
            Points: this.state.bucket,
            Asts:0,
            Rebs:0,
          });
          */
    }
      
  
  };
  componentDidMount(){
    
    const userpic = firebase.database().ref("users/")
    userpic.once("value", function(snapshot){

      //console.log(Object.keys(snapshot.val()))


      GLOBAL.prac = Object.keys(snapshot.val())
      
      });
      console.log(GLOBAL.prac[0])
  }
  render(){
  return (
    
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}
    contentContainerStyle={styles.container}
    scrollEnabled={true} >
      <Text style={{fontFamily: "GillSans-UltraBold", fontSize:50, bottom:'10%',alignItems:'center', justifyContent:"center",textShadowColor: 'rgba(255, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 15}}>Ball Stats</Text>

        <Image style={{width:200, height:200}}source={require("../assets/ball.png")} />

      <StatusBar style="auto" />

      <Button
  
                // Some properties given to Button
                title="Score"
                //onPress={() => console.log(GLOBAL.mo+=1)}
                onPress={() => this.setState({bucket: this.state.bucket+1})}
      />
      <TextInput
              style={styles.username_input}
              placeholder="Jersey #"
              placeholderTextColor="gray"
              keyboardType={"phone-pad"}
              //onChangeText={(name) => this.temp(name)}
              onChangeText={(jersey_number) => this.setState({ jersey_number })}
              value={this.state.jersey_number}
              maxLength={2}
            />
      <Text>{this.state.bucket}</Text>

      <Button
  
                // Some properties given to Button
                title="log"
                //onPress={() => console.log(GLOBAL.mo+=1)}
                onPress={() => this.temp()}
      />
    
    </KeyboardAwareScrollView>
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

      /*
      <View style={styles.container}>
        <Image style={styles.img} source={require("../assets/ball.png")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6CC6E1",
    alignItems: "center",
    justifyContent: "center",
  },

  img: {
    width: 300,
    height: 300,
    bottom: "7.5%",
    left: "12%",

    //position: "absolute",

    alignSelf: "center",
  },
});
*/