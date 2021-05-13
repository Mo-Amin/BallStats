import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
  Image,
} from "react-native";
import GLOBAL from "../Global";

import { Icon } from "react-native-elements";

import * as firebase from "firebase";

export default class CustomDrawerContentComponent extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  signOut = () => {
    GLOBAL.Google = 0;
    GLOBAL.prac.length = 0;
    firebase.auth().signOut();

    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <ImageBackground
              source={require("../assets/drawer-cover.jpg")}
              style={{ flex: 1, width: 280, justifyContent: "center" }}
            >
              <Image
                style={{ height: 120, width: 120, borderRadius: 60 }}
                source={require("../assets/Facebook.png")}
              />
            </ImageBackground>
          </View>
          <View style={styles.screenContainer}>
            <View style={{ width: "100%", top: "30%" }}>
              <TouchableHighlight
                underlayColor={"lightgray"}
                activeOpacity={0.8}
                style={{ height: 30 }}
                onPress={this.navigateToScreen("Home")}
              >
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    name={"home"}
                    size={25}
                    color="white"
                    style={{ marginRight: 30 }}
                  />
                  <Text
                    style={{
                      fontFamily: "Gill Sans",
                      alignSelf: "center",
                      fontSize: 20,
                      color: "white",
                    }}
                  >
                    Home
                  </Text>
                </View>
              </TouchableHighlight>
            </View>

            <View
              style={{
                paddingTop: 5,
                width: "100%",
                //borderBottomWidth: 2,
                //borderTopWidth: 2,
                top: "220%",
              }}
            >
              <View>
                <TouchableHighlight
                  underlayColor={"lightgray"}
                  activeOpacity={0.8}
                  style={{ height: 30 }}
                  onPress={this.signOut}
                >
                  <View
                    style={{
                      flexDirection: "row",

                      //backgroundColor: "lightgrey",
                    }}
                  >
                    <Icon
                      name={"exit-to-app"}
                      size={25}
                      color="white"
                      style={{ color: "#ff0000", marginRight: 30 }}
                    />
                    <Text
                      style={{
                        fontFamily: "Gill Sans",
                        alignSelf: "center",
                        fontSize: 20,
                        color: "white",
                      }}
                    >
                      Logout
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>

            <View>
              <Text
                style={[
                  styles.screenTextStyle,
                  this.props.activeItemKey == "ScreenC"
                    ? styles.selectedTextStyle
                    : null,
                ]}
                onPress={this.navigateToScreen("ScreenC")}
              >
                Screen C
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  headerContainer: {
    height: 230,
  },
  headerText: {
    color: "#fff8f8",
  },
  screenContainer: {
    width: "100%",
  },
  screenStyle: {
    height: 30,
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  screenTextStyle: {
    fontSize: 20,
    marginLeft: 20,
    padding: 30,
    textAlign: "center",
  },
  selectedTextStyle: {
    fontWeight: "bold",
    color: "#00adff",
  },
  activeBackgroundColor: {
    backgroundColor: "grey",
  },
});
//backgroundColor: "rgb(196, 39, 39)"