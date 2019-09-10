import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  AsyncStorage,
  StyleSheet
} from "react-native";
import { http } from "../../Service/auth";

export default class Loading extends Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = [427527];
    this.state = {};
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = async () => {
    let resultado = "login";

    try {
      const response = await http.get("listaFornecedor");

      if (response.status === 200) {
        this.props.navigation.navigate("Principal");
      }
      this.props.navigation.navigate("login");
    } catch (e) {
      this.props.navigation.navigate("login");
      console.log(e);
    }

    //resultado = "Principal";
  };

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#FF6700" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
