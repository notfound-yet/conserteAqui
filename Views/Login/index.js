import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { Image, Button } from "react-native-elements";
// import { Container } from './styles';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      text: ""
    };
  }

  componentDidMount() {}

  static navigationOptions = {
    header: null
  };

  mudarRota = rota => {
    this.props.navigation.navigate(rota);
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View
          style={{
            backgroundColor: "#fff",
            padding: 25,
            borderRadius: 20,
            marginTop: 30
          }}
        >
          <Image
            style={{ width: 260, height: 160 }}
            source={require("./assets/Design.png")}
          />
          <View>
            <TextInput
              style={styles.inputLogin}
              placeholder="Login"
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
            <TextInput
              style={styles.inputLogin}
              placeholder="Senha"
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
            <Button
              buttonStyle={{
                marginTop: 20,
                borderRadius: 10,
                backgroundColor: "#FF6700",
                height: 50
              }}
              titleStyle={{ fontSize: 21 }}
              title="Login"
              onPress={() => this.mudarRota("Principal")}
            />
            <Button
              buttonStyle={{
                marginTop: 20,
                borderRadius: 10,
                borderColor: "#FF6700",
                height: 50,
                borderWidth: 1
              }}
              titleStyle={{ fontSize: 21, color: "#FF6700" }}
              type="outline"
              title="Criar Conta"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
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
