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
} from "react-native";

export default class Count extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={{fontFamily: "GillSans-UltraBold", fontSize:50, bottom:'10%',alignItems:'center', justifyContent:"center",textShadowColor: 'rgba(255,255,255, 1.2)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 15}}>Ball Stats</Text>

      <Image style={{width:200, height:200}}source={require("../assets/ball.png")} />
    
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