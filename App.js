import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";
import Splash from "./screens/SplashScreen";
import StatTracker from "./screens/StatTracker";
import Login from "./screens/Login";
import Players from "./screens/Players";
import LoadingScreen from "./screens/LoadingScreen";
import Account from "./screens/AccountScreen";

import PlayerStats from "./screens/PlayerStats"
import OriginalSplash from "./screens/OriginalSplash"
import Count from "./screens/Count";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Button, Title } from "native-base";
import Boxscore from "./screens/Boxscore";
import DeletePlayer from "./screens/DeletePlayer";

import MainScreen from "./screens/MainScreen";
import Subtraction from "./screens/Subtraction";
import ChangePlayerNum from "./screens/ChangePlayerNum";



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

  
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: true,
      gestureEnabled:true,



    
      /*
      title: "",
      headerTintColor: "red",
      headerBackTitle: " ",
      borderColor: "white",
      headerStyle: { shadowColor: "transparent" },
      */
     
    },
  },

  Splash: {
    screen: Splash,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
    },

  },
  DeletePlayer:{
    screen: DeletePlayer,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
    },

  },
  ChangePlayerNum:{
    screen: ChangePlayerNum,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
    },

  },

  OriginalSplash: {
    screen: OriginalSplash,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
    },

  },

  Count: {
    screen: Count,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
    },

  },



  Boxscore: {
    screen: Boxscore,
    navigationOptions: {
      headerShown: true,
      gestureEnabled: true,
    },
  },

  Players: {
    screen: Players,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
    },
  },

  Subtraction: {
    screen: Subtraction,
    navigationOptions: {
      headerShown: true,
    },
  },

  PlayerStats: {
    screen: PlayerStats,
    navigationOptions: {
      headerShown: true,
    },

  },


  StatTracker: {
    screen: StatTracker,
    navigationOptions: {
      headerShown: true,
    },
    
  },
});

const AuthStack = createStackNavigator({
  MainScreen: {
    screen: MainScreen,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
    },

  },

  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: true,
    
      /*
      title: "",
      headerTintColor: "red",
      headerBackTitle: " ",
      borderColor: "white",
      headerStyle: { shadowColor: "transparent" },
      */
     
    },
  },
  Count: {
    screen: Count,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
    },

  },

  DeletePlayer:{
    screen: DeletePlayer,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
    },

  },
  ChangePlayerNum:{
    screen: ChangePlayerNum,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
    },

  },

  Subtraction: {
    screen: Subtraction,
    navigationOptions: {
      headerShown: true,
    },
  },
 
  
  Players: {
    screen: Players,
    navigationOptions: {
      headerShown: false,
      
    },
    
  },

  PlayerStats: {
    screen: PlayerStats,
    navigationOptions: {
      headerShown: true,
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
import { StyleSheet, Text, View,Image,Button,TouchableOpacity } from 'react-native';
import GLOBAL from "./Global";
import * as firebase from "firebase";
import Count from "./screens/Count"

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