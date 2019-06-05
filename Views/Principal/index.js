import React from "react";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import {
  Image,
  Header,
  Button,
  Rating,
  AirbnbRating
} from "react-native-elements";
import SearchBar from "react-native-dynamic-search-bar";
// import { Container } from './styles';
const listaLimpa = [
  {
    nome: "Seu Ze",
    especialidade: "Eletricista",
    rating: 3
  },
  {
    nome: "Assis",
    especialidade: "Pedreiro",
    rating: 1
  },
  {
    nome: "Umberto",
    especialidade: "Ecanador",
    rating: 4
  },
  {
    nome: "Joao",
    especialidade: "Pintor",
    rating: 5
  },
  {
    nome: "Gabriel",
    especialidade: "Carpiteiro",
    rating: 2
  },
  {
    nome: "Marcos",
    especialidade: "Eletricista",
    rating: 4
  },
  {
    nome: "Pinturas S/A",
    especialidade: "Pintor",
    rating: 4
  },
  {
    nome: "Eletricista S/A",
    especialidade: "Eletricista",
    rating: 5
  },
  {
    nome: "Marcos",
    especialidade: "Eletricista",
    rating: 1
  },
  {
    nome: "Gabriel",
    especialidade: "Pedreiro",
    rating: 4
  },
  {
    nome: "Victor",
    especialidade: "Pedreiro",
    rating: 2
  },
  {
    nome: "Felipe",
    especialidade: "Pedreiro",
    rating: 2
  },
  {
    nome: "Damiao",
    especialidade: "Pintor",
    rating: 4
  }
];
export default class Principal extends React.Component {
  state = {
    search: "",
    listaUsuarios: [],
    listaFiltrada: []
  };

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  componentDidMount = async () => {
    await this.setState({
      listaUsuarios: listaLimpa,
      listaFiltrada: listaLimpa
    });
  };

  updateSearch = search => {
    this.setState({ search });
  };

  filterList = text => {
    let lista = [];
    lista = this.state.listaUsuarios.filter(item => {
      return item.nome.toLowerCase().indexOf(text.toLowerCase()) >= 0;
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

        <ScrollView contentContainerStyle={styles.contentContainer}>
          {this.state.listaFiltrada.map(item => {
            return (
              <View style={styles.cardPrincipal}>
                <View style={{ width: "60%" }}>
                  <Text style={styles.textoCard}>{item.nome}</Text>
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
              </View>
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
    fontWeith: "bold",
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
    fontSize: 22,
    fontWeith: "bold"
  }
});
