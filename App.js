import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Image, Button } from "react-native-elements";

import Principal from "./Views/Principal";
import Firebase from "firebase";
import Loading from "./Views/Loading";
import Login from "./Views/Login";

class App extends React.Component {
  render() {
    return <createAppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6700",
    alignItems: "center",
    justifyContent: "center"
  },
  inputLogin: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    textAlign: "center",
    borderRadius: 10,
    fontSize: 21,
    borderColor: "#FF6700",
    borderWidth: 1
  }
});

const AppNavigator = createStackNavigator(
  {
    Home: Loading,
    Principal: Principal
  },
  {
    initialRouteName: "Home",
    header: {
      visible: false
    }
  }
);

export default createAppContainer(AppNavigator);
