import { api } from "boot/axios";

export const doLogin = async ({ commit }, payload) => {
  try {
    const response = await api.post("/api/Users/login", {
      email: payload.username,
      password: payload.password,
    });

    commit("setToken", response.data);
    commit("setMe", response.data);
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.accessToken}`;
  } catch (error) {}
};

export const signOut = ({ commit }) => {
  api.defaults.headers.common.Authorization = "";
  commit("removeToken");
};

export const getMe = async ({ commit }, token) => {};

export const init = async ({ commit, dispatch }) => {
  const token = localStorage.getItem("token");
  if (token) {
    await commit("setToken", JSON.parse(token));

    api.defaults.headers.common["Authorization"] = `Bearer ${
      JSON.parse(token).accessToken
    }`;

    dispatch("getMe", JSON.parse(token));
  } else {
    commit("removeToken");
  }
};
