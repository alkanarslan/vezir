export function getMe(state) {
  return state;
}
export function getToken(state) {
  return state.token;
}
export function isAuthenticated(state) {
  console.log(state.isAuthenticated);
  return state.isAuthenticated;
}
