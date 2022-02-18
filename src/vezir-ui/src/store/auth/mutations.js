export const setToken = (state, token) => {
  state.token = token.accessToken;
  state.refreshToken = token.refreshToken;
  state.isAuthenticated = true;
  state.name = token.name;
  state.email = token.email;
  window.localStorage.setItem("token", JSON.stringify(token));
};

export const removeToken = (state, token) => {
  state.token = "";
  state.isAuthenticated = false;
  window.localStorage.clear("token");
};

