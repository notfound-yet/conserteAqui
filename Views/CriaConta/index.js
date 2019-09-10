import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import { Image, Button, CheckBox } from "react-native-elements";
// import { Container } from './styles';
import { http } from "../../Service/auth";
export default class CriarConta extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      text: "",
      login: "",
      senha: "",
      confirmarSenha: "",
      nome: "",
      especialidade: "",
      usuario: true,
      prestador: false
    };
  }

  componentDidMount() {}

  static navigationOptions = {
    header: null
  };

  mudarRota = rota => {
    this.props.navigation.navigate(rota);
  };

  enviarUsuario = async () => {
    const {
      login,
      senha,
      confirmarSenha,
      usuario,
      prestador,
      nome,
      especialidade
    } = this.state;
    let deu = false;
    console.log("qq");
    if (
      login.length >= 3 &&
      senha === confirmarSenha &&
      senha.length >= 3 &&
      nome.length >= 3
    ) {
      console.log("qq2");
      if (prestador && especialidade !== null) {
        try {
          const response = await http.post("criar/fornecedor", {
            login,
            password: senha,
            name: nome,
            especialidade
          });

          console.log(response.status);
          console.log(response.data);
          if (response.status === 201) {
            alert("Criado");
            deu = true;
          }
        } catch (e) {
          console.log(e);
        }
      } else if (usuario) {
        try {
          console.log("oi");
          const response = await http.post("criar/usuario", {
            login,
            password: senha,
            name: nome
          });

          console.log(response.status);
          console.log(response.data);
          if (response.status === 201) {
            alert("Criado");
            deu = true;
          }
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      alert("Preencha todos campos");
    }

    if (deu) {
      this.mudarRota("login");
    }
  };

  changerCheck = () => {
    this.setState({
      usuario: !this.state.usuario,
      prestador: !this.state.prestador
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View
          style={{
            backgroundColor: "#fff",
            padding: 25,
            borderRadius: 20,
            marginTop: 30,
            minWidth: "80%"
          }}
        >
          <View>
            <TextInput
              style={styles.inputLogin}
              placeholder="Nome"
              onChangeText={text => this.setState({ nome: text })}
              value={this.state.nome}
            />
            <TextInput
              style={styles.inputLogin}
              placeholder="Login"
              onChangeText={text => this.setState({ login: text })}
              value={this.state.login}
            />
            <TextInput
              style={styles.inputLogin}
              placeholder="Senha"
              onChangeText={text => this.setState({ senha: text })}
              value={this.state.senha}
            />
            <TextInput
              style={styles.inputLogin}
              placeholder="Confirmar Senha"
              onChangeText={text => this.setState({ confirmarSenha: text })}
              value={this.state.confirmarSenha}
            />
            <CheckBox
              center
              title="Usuario"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={this.state.usuario}
              onPress={() => this.changerCheck()}
            />
            <CheckBox
              center
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              title="Prestador"
              checked={this.state.prestador}
              onPress={() => this.changerCheck()}
            />
            {this.state.prestador && (
              <TextInput
                style={styles.inputLogin}
                placeholder="Especialidade"
                onChangeText={text => this.setState({ especialidade: text })}
                value={this.state.especialidade}
              />
            )}

            <Button
              buttonStyle={{
                marginTop: 20,
                borderRadius: 10,
                backgroundColor: "#FF6700",
                height: 50
              }}
              titleStyle={{ fontSize: 21 }}
              title="Criar Conta"
              onPress={() => this.enviarUsuario()}
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
              title="Voltar"
              onPress={() => this.mudarRota("login")}
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
