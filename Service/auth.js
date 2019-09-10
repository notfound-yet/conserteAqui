import { AsyncStorage } from "react-native";
import axios from "axios";

export const api = "https://still-meadow-22906.herokuapp.com/api/";

const http = axios.create({
  baseURL: api
});

http.interceptors.request.use(
  async config => {
    config.headers.authorization =
      "Bearer " + (await AsyncStorage.getItem("token"));
    return config;
  },
  error => Promise.reject(error)
);

export { http };
