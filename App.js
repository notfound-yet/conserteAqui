import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { Image, Button } from "react-native-elements";

import ChatAberto from "./Views/Chat/ChatAberto";
import Principal from "./Views/Principal";
import Loading from "./Views/Loading";
import Login from "./Views/Login";
import CriarConta from "./Views/CriaConta";
import Chat from "./Views/Chat";

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

const AppNavigator = createSwitchNavigator(
  {
    Home: Loading,
    Principal: Principal,
    login: Login,
    Criar: CriarConta,
    Chat: Chat,
    ChatAberto: ChatAberto
  },
  {
    initialRouteName: "Home",
    header: {
      visible: false
    }
  }
);

export default createAppContainer(AppNavigator);
