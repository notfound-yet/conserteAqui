import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import {
  Image,
  Header,
  Button,
  Rating,
  AirbnbRating,
  Overlay
} from "react-native-elements";
import SearchBar from "react-native-dynamic-search-bar";
import { http } from "../../Service/auth";

// import { Container } from './styles';

export default class Principal extends React.Component {
  state = {
    search: "",
    listaUsuarios: [],
    listaFiltrada: [],
    loading: false,
    isVisible: false,
    prestador: [],
    msg: "",
    nivel: ""
  };

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  componentDidMount = async () => {
    const nivel = await AsyncStorage.getItem("nivel");
    this.setState({ nivel });
    this.pegarApi();
  };

  pegarApi = async () => {
    try {
      const response = await http.get("listaFornecedor");

      if (response.status === 201) {
        await this.setState({
          listaUsuarios: response.data.usuario,
          listaFiltrada: response.data.usuario,
          loading: true
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  exibirModal = async item => {
    await this.setState({ prestador: item });
    if (this.state.nivel === "usuario") {
      await this.setState({ isVisible: true });
    }
  };

  updateSearch = search => {
    this.setState({ search });
  };

  enviarmensagem = async () => {
    console.log("oi");
    if (this.state.msg !== "") {
      console.log("oi2");
      const response = await http.post("chat/usuario/enviar", {
        fornecedor_id: this.state.prestador.id,
        msg: this.state.msg
      });
      console.log(response.data);
      if (response.status === 201) {
        alert("Mensagem enviada!");
        this.setState({ isVisible: false });
      } else {
        alert("Mensagem nao enviada");
      }
    } else {
      alert("Insira uma mensagem !");
    }
  };

  filterList = text => {
    let lista = [];
    lista = this.state.listaUsuarios.filter(item => {
      return item.especialidade.toLowerCase().indexOf(text.toLowerCase()) >= 0;
    });

    this.setState({ listaFiltrada: lista });
  };

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          fontColor="#fff"
          iconColor="#fff"
          shadowColor="#282828"
          cancelIconColor="#fff"
          fontSize={20}
          backgroundColor="#FF6700"
          placeholder="Search here"
          onChangeText={text => {
            this.filterList(text);
          }}
          onPressCancel={() => {
            this.filterList("");
          }}
        />
        <Overlay
          isVisible={this.state.isVisible}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor="#fff"
          width="auto"
          height="auto"
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 25,
              borderRadius: 20,
              marginTop: 30,
              minWidth: "80%"
            }}
          >
            <Text>Enviar mensagem para: {this.state.prestador.name}</Text>
            <TextInput
              style={styles.inputLogin}
              placeholder="Mensagem"
              multiline={true}
              numberOfLines={4}
              onChangeText={text => this.setState({ msg: text })}
              value={this.state.msg}
            />
            <Button
              buttonStyle={{
                marginTop: 20,
                borderRadius: 10,
                backgroundColor: "#FF6700",
                height: 50
              }}
              titleStyle={{ fontSize: 21 }}
              title="Enviar Mensagem"
              onPress={() => this.enviarmensagem()}
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
              title="Cancelar"
              onPress={() => this.setState({ isVisible: false })}
            />
          </View>
        </Overlay>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          {!this.state.loading && (
            <ActivityIndicator size="large" color="#FF6700" />
          )}
          {this.state.loading &&
            this.state.listaFiltrada.map(item => {
              rating = Math.floor(Math.random() * 6);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.cardPrincipal}
                  onPress={() => this.exibirModal(item)}
                >
                  <View style={{ width: "60%" }}>
                    <Text style={styles.textoCard}>{item.name}</Text>
                    <Text style={styles.textoCard2}>{item.especialidade}</Text>
                  </View>
                  <View style={{ position: "absolute", right: 20 }}>
                    <AirbnbRating
                      count={5}
                      readonly
                      reviews={[
                        "Ruim",
                        "Medio",
                        "Otimo",
                        "Muito Bom",
                        "Exelente"
                      ]}
                      defaultRating={item.rating}
                      size={20}
                    />
                  </View>
                </TouchableOpacity>
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
  inputLogin: {
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    textAlign: "center",
    borderRadius: 10,
    fontSize: 21,
    borderColor: "#FF6700",
    borderWidth: 1
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
