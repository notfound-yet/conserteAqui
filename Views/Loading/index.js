import React, { Component } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import firebase from "firebase";

export default class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin() {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          this.props.navigation.navigate("dashboard");
        } else {
          this.props.navigation.navigate("login");
        }
      }.bind(this)
    );
  }

  render() {
    return (
      <View>
        <Text>Oi</Text>
      </View>
    );
  }
}
