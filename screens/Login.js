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
import * as Google from "expo-google-app-auth";

const IOS_CLIENT_ID =
  "244646029044-peak2tbttnp64bf60for60d28bhtsklm.apps.googleusercontent.com";
class Loginscreen extends Component {
  state = {
    email: "",
    Password: "",
    errorCode: null,
    errorMessage: null,
  };

  signinWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        success: ["profile", "email"],
      });
      if (result.type === "success") {
        GLOBAL.Google = 1;
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref("/users/" + result.uid)
                .set({
                  ProfilePic: photoURL,
                });
            }
            console.log(result);
          });
      } else {
        return { cancelled: true };
      }
    } catch (error) {
      return { error: true };
    }
  };

  handleLogin = () => {
    const { email, Password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, Password)
      .catch((error) => alert(error.message));
    // .catch((error) => this.setState({ errorMessage: error.message }));
  };

  forgotpassword = () => {
    const { email, Password, errorCode, errorMessage } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, Password)
      .catch((error) =>
        this.setState({ errorCode: error.code, errorMessage: error.message })
      );

    if (errorMessage == null) alert("Enter in an Email!");
    else {
      if (errorCode === "auth/wrong-password") {
        firebase.auth().sendPasswordResetEmail(email);
        alert("Check your email to reset your password");
      } else {
        alert(errorMessage);
      }
    }

    /*
    const { email } = this.state;
    firebase.auth().sendPasswordResetEmail(email);
    alert("Check your email to reset your password");
    */
  };

  render() {
    return (
      <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "#6CC6E1" }}>
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Text style={styles.textcolor}>Spool</Text>
              <TextInput
                placeholder="Phone number, username, or email"
                placeholderTextColor="#6CC6E1"
                style={styles.input}
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#6CC6E1"
                style={styles.input}
                onChangeText={(Password) => this.setState({ Password })}
                value={this.state.Password}
              />
              <View style={{ alignItems: "flex-end", bottom: "4%" }}>
                <TouchableWithoutFeedback onPress={this.forgotpassword}>
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "GillSans-SemiBold",
                      fontSize: 14,
                    }}
                  >
                    Forgot Password?
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={this.handleLogin}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "GillSans-SemiBold",
                    fontSize: 25,
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
              <Image style={styles.Or} source={require("../assets/OR.png")} />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  top: "2%",
                }}
              >
                <TouchableWithoutFeedback onPress={() => null}>
                  <Image
                    style={styles.Facebook}
                    source={require("../assets/Facebook.png")}
                  />
                </TouchableWithoutFeedback>
                <TouchableOpacity style={{ alignSelf: "center" }}>
                  <Text
                    style={{
                      color: "blue",
                      alignSelf: "center",
                      fontFamily: "GillSans-SemiBold",
                    }}
                  >
                    Log in with Facebook
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  right: "1.2%",
                }}
              >
                <TouchableWithoutFeedback onPress={this.signinWithGoogle}>
                  <Image
                    style={styles.Google}
                    source={require("../assets/Google.png")}
                  />
                </TouchableWithoutFeedback>
                <TouchableOpacity
                  style={{ alignSelf: "center" }}
                  onPress={this.signinWithGoogle}
                >
                  <Text
                    style={{
                      color: "red",
                      alignSelf: "center",
                      fontFamily: "GillSans-SemiBold",
                    }}
                  >
                    Log in with Google
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
                    fontFamily: "GillSans-SemiBold",
                    fontSize: 18,
                    alignSelf: "center",
                  }}
                >
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Account")}
                  style={{ width: 80, height: 50 }}
                >
                  <Text
                    style={{
                      paddingTop: 8,
                      color: "white",
                      fontFamily: "GillSans-SemiBold",
                      fontSize: 18,
                      alignSelf: "center",
                      margin: 6,
                    }}
                  >
                    Sign Up
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
    backgroundColor: "#6CC6E1",
  },
  inner: {
    flex: 1,
    top: "21%",
    backgroundColor: "#6CC6E1",
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

    borderColor: "#6CC6E1",
    color: "#6CC6E1",
    fontFamily: "GillSans-SemiBold",
    fontSize: 18,
  },
  btnContainer: {
    backgroundColor: "#6CC6E1",
    marginTop: 12,
  },
  button: {
    backgroundColor: "lightgray",
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
    color: "white",
    fontFamily: "GillSans-UltraBold",
    fontSize: 50,
    alignSelf: "center",
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