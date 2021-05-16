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

export default class Count extends Component {
  state = {
    bucket:0,
    email: "",
    Password: "",
    name: "",
    Full_Name: "",
    phonenumber: "",
    Points: "",
    
  };
  temp = () => {

        firebase
          .database()
          .ref("users/"+this.state.name)
          .set({
            Points: 0,
          });
      
  
  };
  render(){
  return (
    
    <View style={styles.container}>
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
              placeholder="name"
              placeholderTextColor="gray"
              //onChangeText={(name) => this.temp(name)}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
            />
      <Text>{this.state.bucket}</Text>

      <Button
  
                // Some properties given to Button
                title="log"
                //onPress={() => console.log(GLOBAL.mo+=1)}
                onPress={() => this.temp}
      />
    
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