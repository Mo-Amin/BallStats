import React, { Component } from "react";
import {
  Button,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  SnapshotViewIOS,
} from "react-native";

import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Text,
  ListItem,
  Thumbnail,
  Item,
  Icon,
  Input,
  Right,
  Title,
} from "native-base";
import * as firebase from "firebase";
import GLOBAL from "../Global";
import { createAppContainer, SafeAreaView } from "react-navigation";
//import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
//import { Icon, ThemeConsumer } from "react-native-elements";
//import { createDrawerNavigator } from "react-navigation-drawer";
import { DrawerActions } from "react-navigation-drawer";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

export default class Profile extends Component {
  state = {
    email: "",
    displayName: "",
    uid: "",
    GivenName: "",
    phoneNumber: "",
    photoURL: null,
    array: [],
  };
  /*
  componentDidMount() {
    if (GLOBAL.Google == 1) {
      const { email, displayName, uid, photoURL } = firebase.auth().currentUser;
      this.setState({ email, displayName, uid, photoURL });
      GLOBAL.profilepic = photoURL;
    } else {
      const {
        email,
        displayName,
        uid,
        phoneNumber,
      } = firebase.auth().currentUser;
      this.setState({ email, displayName, uid, phoneNumber });
      const user = firebase.database().ref("/users/" + uid + "/ProfilePic/");
      //READ DATA within DATABASE
      user.once("value", (datasnap) => {
        GLOBAL.profilepic = datasnap.val();
      });
    }
  }
  
    firebase
      .database()
      .ref("/users/" + uid)
      .set({
        FirstName: GLOBAL.firstname,
        LastName: GLOBAL.lastname,
      });
  }
  */
  /*
  signOut = () => {
    GLOBAL.Google = 0;
    firebase.auth().signOut();
    this.props.navigation.navigate("Welcome");
  };
  */

  componentDidMount() {
    //GLOBAL.prac.splice(0, GLOBAL.prac.length);

    if (GLOBAL.Google == 1) {
      const { email, displayName, uid, photoURL } = firebase.auth().currentUser;
      this.setState({ email, displayName, uid, photoURL });

      const userpic = firebase.database().ref("/users/" + uid + "/ProfilePic/");

      userpic.once("value", (datasnap) => {
        this.setState({
          photoURL: datasnap.val(),
        });
      });

      //GLOBAL.profilepic = photoURL;
    } else {
      const {
        email,
        displayName,
        uid,
        phoneNumber,
      } = firebase.auth().currentUser;
      this.setState({ email, displayName, uid, phoneNumber });

      const user = firebase.database().ref("/users/" + uid + "/displayName/");
      const userpic = firebase.database().ref("/users/" + uid + "/ProfilePic/");

      //READ DATA within DATABASE

      user.once("value", (datasnap) => {
        this.setState({
          displayName: datasnap.val(),
        });
        //GLOBAL.profilepic = datasnap.val();
      });

      userpic.once("value", (datasnap) => {
        this.setState({
          photoURL: datasnap.val(),
        });
        //GLOBAL.profilepic = datasnap.val();
      });
    }
    var items = firebase.database().ref("users").orderByKey();
    items.once("value").then(function (snapshot) {
      GLOBAL.prac.splice(0, GLOBAL.prac.length);

      snapshot.forEach(function (childSnapshot) {
        //  auth ID for each user
        var key = childSnapshot.key;
        // console.log(key);
        var pic = snapshot.child(key + "/ProfilePic").val();
        var name = snapshot.child(key + "/displayName").val();
        //console.log(pic);
        // temp.push({ Picture: pic, id: key });
        GLOBAL.prac.push({ Picture: pic, id: key, name: name });
      });
    });
    let length = GLOBAL.prac.length;

    for (let i = 0; i < length; ++i) {
      console.log(GLOBAL.prac[i].name);
    }

    /*
    firebase
      .database()
      .ref("users/")
      .once("value", function (snapshot) {
        data = snapshot.val();
        //console.log(snapshot.val());
        console.log(data);
      });
      */
  }

  /*
    firebase
      .database()
      .ref("/users/" + uid)
      .set({
        FirstName: GLOBAL.firstname,
        LastName: GLOBAL.lastname,
      });
      */

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert(
          "Sorry, you denied access. Change your camera roll permissions in Settings to make this work!"
        );
      } else {
        this._pickImage();
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
        this.setState({ photoURL: result.uri });
        firebase
          .database()
          .ref("/users/" + this.state.uid)
          .set({
            ProfilePic: result.uri,
            displayName: this.state.displayName,
          });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  /*
  <Container>
        <Header searchBar rounded style={{ backgroundColor: "red" }}>
          <Item style={{ backgroundColor: "white" }}>
            <Icon name="ios-search" style={{ color: "red" }} />
            <Input
              placeholder="Search..."
              onChangeText={(text) => this.searchUser(text)}
            />
          </Item>
        </Header>
        <Content>
          {this.state.usersFiltered.map((item) => (
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: item.Picture }} />
              </Left>
              <Body>
                <Text>{item.name}</Text>
              </Body>
            </ListItem>
          ))}
        </Content>
      </Container>
      */

  render() {
    return (
      <View style={styles.container}>
        <Text>hi</Text>

        <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Count")}
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
                    Sign Up
                  </Text>
                </TouchableOpacity>
        
      </View>
      /*
      <Container style={{ flex: 1 }}>
        <Header
          style={{
            //backgroundColor: "rgb(245,50,50)",
            backgroundColor: "#6CC6E1",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <Body style={{ flex: 1 }}>
            <Title style={{ justifyContent: "center" }}></Title>
          </Body>
          <Text
            style={{
              alignSelf: "center",
              fontFamily: "GillSans-SemiBold",
              fontWeight: "bold",
              fontSize: 25,
              color: "white",
            }}
          >
            {this.state.displayName}
          </Text>
          <Right style={{ flex: 1 }}>
            <Icon
              name="menu"
              style={{ color: "white", alignSelf: "center" }}
              onPress={() =>
                this.props.navigation.dispatch(DrawerActions.toggleDrawer())
              }
            />
          </Right>
        </Header>
        <View>
          <SafeAreaView style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: "3%", marginTop: "3%" }}>
              <TouchableOpacity onPress={this.getPermissionAsync}>
                <Image
                  style={styles.img}
                  source={
                    this.state.photoURL
                      ? { uri: this.state.photoURL }
                      : require("../assets/Profile_pic.png")
                  }
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: 230,
                height: 130,
                //borderWidth: 10,
                alignItems: "center",
                marginTop: "8%",
              }}
            >
              <Text
                style={{
                  fontFamily: "GillSans-SemiBold",
                  //fontWeight: "bold",
                  fontSize: 30,

                  //left: 235,
                  color: "black",

                  //textDecorationLine: "underline",
                }}
              >
                {this.state.displayName}
              </Text>
            </View>
          </SafeAreaView>
        </View>
        <Text style={{ marginLeft: "10%", fontFamily: "GillSans-SemiBold" }}>
          Descriptions:
        </Text>
      </Container>
      */
      /*
      <ImageBackground
        source={require("../assets/ProfileBackground.jpeg")}
        style={styles.backgroundimage}
      >
        <SafeAreaView style={{ flexDirection: "row" }}>
          <View>
            <TouchableOpacity onPress={this.getPermissionAsync}>
              <Image
                style={styles.img}
                source={
                  this.state.photoURL
                    ? { uri: this.state.photoURL }
                    : require("../assets/Profile_pic.png")
                }
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: 230,
              height: 130,
              //borderWidth: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "GillSans-SemiBold",
                //fontWeight: "bold",
                fontSize: 30,
                //left: 235,
                color: "white",
                //textDecorationLine: "underline",
              }}
            >
              {this.state.displayName}
            </Text>
          </View>
        </SafeAreaView>
        <TouchableOpacity style={styles.button} onPress={this.signOut}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Logout</Text>
        </TouchableOpacity>
      </ImageBackground>
      */
    );
  }
}
/*
const styles = StyleSheet.create({
  backgroundimage: {
    flex: 1,
    resizeMode: "cover",
  },

  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 120,
    height: 120,
    margin: 10,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "black",
    backgroundColor: "white",

    //top: 247.46,

    //position: "absolute",

    //alignSelf: "center",
    justifyContent: "center",
  },
});
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/*
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";
export default class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
*/