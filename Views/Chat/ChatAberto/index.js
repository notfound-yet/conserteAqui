import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { Button } from "react-native-elements";
import { http } from "../../../Service/auth";
export default class index extends Component {
  state = {
    messages: [],
    chat: [],
    id: "",
    nivel: "",
    index: "",
    timer: 10
  };

  componentDidMount = async () => {
    const { chat, id, index } = this.props.navigation.state.params;
    const nivel = await AsyncStorage.getItem("nivel");

    await this.setState({ id: id, nivel, index });

    await this.organizarChat(chat);

    this.interval = setInterval(
      () => this.setState(prevState => ({ timer: prevState.timer - 1 })),
      1000
    );
  };

  organizarChat = async chat => {
    //console.log(chat);
    let data = [];
    chat.forEach(element => {
      data.push({
        _id: element.id,
        text: element.msg,
        createdAt: element.created_at,
        user: {
          _id: this.state.nivel === element.nivel ? 1 : 2,
          name: "Voce",
          avatar: "https://placeimg.com/140/140/any"
        }
      });
    });

    this.setState({
      messages: data.reverse(),
      chat: data
    });
  };

  pegarApi = async () => {
    try {
      const nivel = this.state.nivel;
      const response = await http.get(`chat/${nivel}/lista`);

      if (response.status === 201) {
        const chat = response.data.lista;
        const qq = chat[0].lista;
        console.log(qq);
        this.organizarChat(qq);
      }
    } catch (e) {
      console.log(e);
    }
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate() {
    if (this.state.timer === 1) {
      this.pegarApi();
      clearInterval(this.interval);
    }
  }

  enviarMsg = async messages => {
    try {
      let response = [];
      console.log(JSON.stringify(messages) + "  " + this.state.id);
      if (this.state.nivel === "usuario") {
        response = await http.post("chat/usuario/enviar", {
          fornecedor_id: this.state.id,
          msg: messages[0].text
        });
      } else {
        response = await http.post("chat/fornecedor/enviar", {
          usuario_id: this.state.id,
          msg: messages[0].text
        });
      }
      let chat = this.state.chat;
      const resposta = [
        {
          _id: response.data.msg.id,
          text: response.data.msg.msg,
          createdAt: response.data.msg.created_at,
          user: {
            _id: 1,
            name: "Voce",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ];
      let msgs = [...resposta, ...chat];
      this.setState({
        chat: msgs,
        messages: msgs
      });
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.enviarMsg(messages)}
          user={{
            _id: 1
          }}
        />
        <View style={{ height: "10%", flexDirection: "row" }}>
          <View style={{ width: "33.33%" }}>
            <Button
              buttonStyle={{
                backgroundColor: "#FF6700",
                height: "100%",
                borderRadius: 0,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 9
                },
                shadowOpacity: 0.5,
                shadowRadius: 12.35,

                elevation: 19
              }}
              titleStyle={{ fontSize: 21 }}
              title="Inicio"
              onPress={() => this.props.navigation.navigate("Principal")}
            />
          </View>
          <View style={{ width: "33.33%" }}>
            <Button
              buttonStyle={{
                backgroundColor: "#FF6700",
                height: "100%",
                borderRadius: 0,
                shadowColor: "#000",
                shadowOffset: {
                  width: 5,
                  height: 9
                },
                shadowOpacity: 0.5,
                shadowRadius: 12.35,

                elevation: 19
              }}
              titleStyle={{ fontSize: 21 }}
              title="Chat"
              onPress={() => this.props.navigation.navigate("Chat")}
            />
          </View>
          <View style={{ width: "33.33%" }}>
            <Button
              buttonStyle={{
                backgroundColor: "#FF6700",
                height: "100%",
                borderRadius: 0,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 9
                },
                shadowOpacity: 0.5,
                shadowRadius: 12.35,

                elevation: 19
              }}
              titleStyle={{ fontSize: 21 }}
              title="Perfil"
              onPress={() => console.log("")}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
