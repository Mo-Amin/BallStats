// Aboutscreen.js
import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GLOBAL from "../Global";
import normalize from "react-native-normalize";

const IOS_CLIENT_ID =
  "83917222793-4ctvcni521jqhg5ujsom8295u9ssm7m7.apps.googleusercontent.com";
var flag = 0;

export default class AccountScreen extends Component {
  state = {
    email: "",
    Password: "",
    name: "",
    Full_Name: "",
    phonenumber: "",
    uid: "",
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
            console.log(result);
          });
      } else {
        return { cancelled: true };
      }
    } catch (error) {
      return { error: true };
    }
  };

  handlesSignup = () => {
    flag = 1;
    GLOBAL.Full_Name = this.state.Full_Name;
    //GLOBAL.lastname = this.state.last_name;
    // GLOBAL.profilepic = this.state.image;
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.Password)
      .then((userCredentials) => {
        userCredentials.user.updateProfile({
          displayName: this.state.name,
          phoneNumber: this.state.phonenumber,
        });
        return;
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  componentWillUnmount() {
    //flagimage = false;

    if (flag == 1) {
      const {
        email,
        displayName,
        uid,
        phoneNumber,
      } = firebase.auth().currentUser;
      this.setState({ email, displayName, uid, phoneNumber });

      firebase
        .database()
        .ref("/users/" + uid)
        .set({
          FullName: GLOBAL.Full_Name,
          displayName: this.state.name,
          //LastName: GLOBAL.lastname,
          //ProfilePic: GLOBAL.profilepic,
        });
    }
  }

  render() {
    //let { image } = this.state;
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: "white" }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", top: "5%" }}
        >
          <SafeAreaView style={{ margin: "8%" }}>
            <Text
              style={{
                color: "red",
                fontFamily: "GillSans-UltraBold",
                fontSize: 50,
                alignSelf: "center",
              }}
            >
              LocalBiz
            </Text>
          </SafeAreaView>

          <SafeAreaView
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              style={styles.Full_name_input}
              placeholder="Full name"
              placeholderTextColor="red"
              onChangeText={(Full_Name) => this.setState({ Full_Name })}
              value={this.state.Full_Name}
            />

            <TextInput
              style={styles.username_input}
              placeholder="Username"
              placeholderTextColor="red"
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
            />

            <TextInput
              style={styles.phone_number}
              placeholder="Phone number"
              placeholderTextColor="red"
              keyboardType={"phone-pad"}
              onChangeText={(phonenumber) => this.setState({ phonenumber })}
              value={this.state.phonenumber}
              maxLength={10}
            />

            <TextInput
              style={styles.email_input}
              placeholder="Email"
              placeholderTextColor="red"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />

            <TextInput
              style={styles.password_input}
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="red"
              onChangeText={(Password) => this.setState({ Password })}
              value={this.state.Password}
            />
          </SafeAreaView>
          <View style={{ margin: "3%" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.handlesSignup}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "GillSans-SemiBold",
                  fontSize: 28,
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>

          <SafeAreaView
            style={{
              margin: "4%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "GillSans-SemiBold",
                color: "#adadad",
                textAlign: "center",
                fontSize: 12,
              }}
            >
              By signing up, you agree to our{" "}
              <Text
                style={{
                  fontFamily: "GillSans-SemiBold",
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#858585",
                }}
              >
                Terms
              </Text>
              ,{"\n "}
              <Text
                style={{
                  fontFamily: "GillSans-SemiBold",
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#858585",
                }}
              >
                Data Policy
              </Text>{" "}
              and{" "}
              <Text
                style={{
                  fontFamily: "GillSans-SemiBold",
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#858585",
                }}
              >
                Cookies Policy
              </Text>
            </Text>
          </SafeAreaView>
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
                fontSize: 20,
                alignSelf: "center",
              }}
            >
              Have an account?
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Login")}
              style={{ width: 80, height: 50 }}
            >
              <Text
                style={{
                  paddingTop: 8,
                  color: "red",
                  fontFamily: "GillSans-SemiBold",
                  fontSize: 20,
                  alignSelf: "center",
                  margin: 6,
                }}
              >
                Log in
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
/*
  componentDidMount() {
    this.getPermissionAsync();
  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        flagimage = true;
        this.setState({ image: result.uri });
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  username_input: {
    borderBottomWidth: 2,
    opacity: 0.4,
    borderBottomColor: "red",
    padding: 3,
    margin: 10,
    width: 288,
    backgroundColor: "white",
    fontFamily: "GillSans-SemiBold",
    fontSize: 20,
    color: "red",
    //position: "absolute",
    //top: "40%",
  },
  email_input: {
    borderBottomWidth: 2,
    opacity: 0.4,
    borderBottomColor: "red",
    padding: 3,
    margin: 10,
    width: 288,
    backgroundColor: "white",
    fontFamily: "GillSans-SemiBold",
    fontSize: 20,
    color: "red",
    //position: "absolute",
    //top: "48%",
  },

  password_input: {
    borderBottomWidth: 2,
    opacity: 0.4,
    borderBottomColor: "red",
    padding: 3,
    margin: 10,
    width: 288,
    backgroundColor: "white",
    fontFamily: "GillSans-SemiBold",
    fontSize: 20,
    color: "red",
    //top: "64%",
  },
  Full_name_input: {
    borderBottomWidth: 2,
    opacity: 0.4,
    borderBottomColor: "red",
    padding: 3,
    margin: 10,
    width: 288,
    backgroundColor: "white",
    fontFamily: "GillSans-SemiBold",
    fontSize: 20,
    color: "red",
    // position: "absolute",
    //top: "32%",
    // left: "14%",
  },

  phone_number: {
    borderBottomWidth: 2,
    opacity: 0.4,
    borderBottomColor: "red",
    padding: 3,
    margin: 10,
    width: 288,
    backgroundColor: "white",
    fontFamily: "GillSans-SemiBold",
    fontSize: 20,
    color: "red",
    //position: "absolute",
    //top: "56%",
  },

  button: {
    backgroundColor: "red",
    borderRadius: 10,
    height: 54,
    width: 288,
    alignItems: "center",
    justifyContent: "center",

    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.35,
  },
  errorMessage: {
    height: 72,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  Profile_pic: {
    height: normalize(200),
    width: normalize(300),
    borderRadius: 20,
    position: "absolute",
    top: "1.5%",
  },
});