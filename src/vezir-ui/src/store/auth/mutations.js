export const setToken = (state, token) => {
  state.token = token.accessToken;
  state.refreshToken = token.refreshToken;
  state.isAuthenticated = true;
  window.localStorage.setItem("token", JSON.stringify(token));
};

export const removeToken = (state, token) => {
  state.token = "";
  state.isAuthenticated = false;
  window.localStorage.clear("token");
};

export const setMe = (state, me) => {
  state.me = me;
};
