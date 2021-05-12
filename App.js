import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View,Image,Button,Animated } from 'react-native';
import GLOBAL from "./Global";
var money = 0;
//export default function App() {
export default class App extends Component{
  state = {
    bucket:0
  };
  render(){
  return (
    
    <View style={styles.container}>
      <Text style={{fontFamily: "GillSans-UltraBold", fontSize:50, bottom:'10%',alignItems:'center', justifyContent:"center",textShadowColor: 'rgba(255, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 15}}>Ball Stats</Text>

        <Image style={{width:200, height:200}}source={require("./assets/ball.png")} />

      <StatusBar style="auto" />

      <Button
  
                // Some properties given to Button
                title="Score"
                //onPress={() => console.log(GLOBAL.mo+=1)}
                onPress={() => this.setState({bucket: this.state.bucket+1})}
      />
      <Text>{this.state.bucket}</Text>
    
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
