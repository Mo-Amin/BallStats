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

export default class HomeScreen extends Component {
  componentDidMount() {
    // Start counting when the page is loaded
    setTimeout(() => {
      // Add your logic for the transition
      this.props.navigation.navigate("Login");
    }, 800);
  }

  render() {
    return (
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
    width: 247.49,
    height: 198.28,
    bottom: "7.5%",
    left: "12%",

    //position: "absolute",

    alignSelf: "center",
  },
});