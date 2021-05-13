
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";
import Splash from "./screens/SplashScreen";
import Login from "./screens/Login";
import Profile from "./screens/ProfileScreen";
import LoadingScreen from "./screens/LoadingScreen";
import Account from "./screens/AccountScreen";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

const firebaseConfig = {
  apiKey: "AIzaSyDFKc39gdwI90nYljnVo_nWuz4Xi9gZ3yo",
  authDomain: "ballstats-d37a2.firebaseapp.com",
  databaseURL: "https://ballstats-d37a2-default-rtdb.firebaseio.com",
  projectId: "ballstats-d37a2",
  storageBucket: "ballstats-d37a2.appspot.com",
  messagingSenderId: "837272527093",
  appId: "1:837272527093:web:2b14402346cf5e9e62e5bc",
  measurementId: "G-TW4CJFR32Y"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AppStack = createStackNavigator({
  Profile: {
    navigationOptions: {
      headerShown: false,
    },
    screen: Profile,
  },
});

const AuthStack = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      headerShown: false,
    },
  },

  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
      /*
      title: "",
      headerTintColor: "red",
      headerBackTitle: " ",
      borderColor: "white",
      headerStyle: { shadowColor: "transparent" },
      */
     
    },
  },
  Account: {
    screen: Account,
    navigationOptions: {
      headerShown: true,
      gestureEnabled: false,
    },
  },
});
export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
    }
  )
);

/*
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View,Image,Button,Animated } from 'react-native';
import GLOBAL from "./Global";
import * as firebase from "firebase";
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
*/
