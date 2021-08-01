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
            fouls:0,
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
    if(x != null)
    {
      const user = firebase.database().ref("/users/" + x + "/Points/");
      //READ DATA within DATABASE

      user.once("value", (datasnap) => {
        this.setState({
          bucket: datasnap.val()+1,
        });
        //GLOBAL.profilepic = datasnap.val();
      });
      

      //this.setState({bucket:num+1})
      firebase
        .database()
        .ref("users/"+x)
        .update({
          Points: this.state.bucket,
           
        });
    }
 
  };
  componentDidMount(){
    
    const userpic = firebase.database().ref("users/")
    userpic.once("value", function(snapshot){

      //console.log(Object.keys(snapshot.val()))
      GLOBAL.prac = Object.keys(snapshot.val()).map(Number)
      
      });
      console.log(GLOBAL.prac.length)
      //GLOBAL.array_prac = Object.values(GLOBAL.prac[0][1])
      //console.log(GLOBAL.array_prac[3])
     
      //console.log(GLOBAL.prac);
      //console.log(GLOBAL.prac.length)
  }
 
  render(){
  return (
    
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}
    contentContainerStyle={styles.container}
    scrollEnabled={true} >
      <TouchableOpacity
                  onPress={() => this.update(GLOBAL.prac[0])}
                  style={{ width: 80, height: 50 }}
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
                    {GLOBAL.prac[0]}
                  </Text>
                </TouchableOpacity>
      

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

      <Text>{GLOBAL.prac.length}</Text>

      <Button
  
                // Some properties given to Button
                title="log"
                //onPress={() => console.log(GLOBAL.mo+=1)}
                onPress={() => this.temp()}
      />

      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("Players")}
      >
        <Text>HI</Text>
        
      </TouchableOpacity>

      
      
      
    
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