import React, { Component } from "react";

import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  AsyncStorage
} from "react-native";

import { Button } from "react-native-elements";
import { http } from "../../Service/auth";

// import { Container } from './styles';

export default class Chat extends Component {
  state = {
    search: "",
    listaChat: [],
    loading: false,
    nivel: ""
  };

  componentDidMount = async () => {
    this.pegarApi();
    const nivel = await AsyncStorage.getItem("nivel");
    this.setState({ nivel });
  };

  pegarApi = async () => {
    try {
      const nivel = await AsyncStorage.getItem("nivel");
      const response = await http.get(`chat/${nivel}/lista`);

      if (response.status === 201) {
        await this.setState({
          listaChat: response.data.lista,
          loading: true
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {!this.state.loading && (
            <ActivityIndicator size="large" color="#FF6700" />
          )}
          {this.state.listaChat.map((item, index) => {
            return (
              <Button
                buttonStyle={{
                  marginTop: 20,
                  borderRadius: 10,
                  backgroundColor: "#FF6700",
                  height: 50,
                  marginLeft: 20,
                  marginRight: 20
                }}
                titleStyle={{ fontSize: 21 }}
                title={item.user.name}
                onPress={() =>
                  this.props.navigation.navigate("ChatAberto", {
                    chat: item.lista,
                    id: item.user.id,
                    index: index
                  })
                }
              />
            );
          })}
        </ScrollView>
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
              onPress={() => console.log("")}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: 20
  },
  contentContainer: {
    paddingVertical: 20
  },
  cardPrincipal: {
    height: 100,
    backgroundColor: "#FF6700",
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
    flexDirection: "column"
  },
  textoCard: {
    paddingTop: 4,
    paddingLeft: 4,
    color: "#fff",
    fontSize: 26,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
    paddingBottom: 0,
    marginBottom: 0,
    textAlign: "center"
  },
  textoCard2: {
    textAlign: "center",
    color: "#fff",
    fontSize: 22
  }
});
