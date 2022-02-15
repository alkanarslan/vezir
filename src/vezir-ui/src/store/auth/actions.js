import { api } from "boot/axios";

export const doLogin = async ({ commit }, payload) => {
  console.log(payload);
  try {
    console.log(payload);
    const response = await api.post("/api/Users/login", {
      email: payload.username,
      password: payload.password,
    });
    console.log(response);
    commit("setToken", response.data);
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.accessToken}`;
  } catch (error) {
    console.log(error);
  }
};

export const signOut = ({ commit }) => {
  api.defaults.headers.common.Authorization = "";
  commit("removeToken");
};

export const getMe = async ({ commit }, token) => {
  await api.get("/api/v1/users/me/", token.access).then((response) => {
    commit("setMe", response.data);
  });
};

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
