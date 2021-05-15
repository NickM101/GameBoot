import AsyncStorage from "@react-native-async-storage/async-storage";

export async function _setToken(response) {
  return await AsyncStorage.setItem("@access_token", response.access_token);
}

export async function _getAccessToken() {
  return await AsyncStorage.getItem("@access_token");
}

export async function _clearToken() {
  return await AsyncStorage.removeItem("@access_token");
}
