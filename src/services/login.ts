import Coopernet from "./Coopernet";

export async function loginWithLocalStorage() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (refreshToken) {
    Coopernet.oAuthToken.refresh_token = refreshToken;
    await Coopernet.login();
    localStorage.setItem("refresh_token", Coopernet.oAuthToken.refresh_token);
    return true;
  } else return false;
}

export function disconnect() {
  Coopernet.user = {id: "", password: "", name: ""};
  Coopernet.oAuthToken = {
    refresh_token: "",
    access_token: "",
    token_type: "",
    expires_in: 0,
  };
  localStorage.clear();
}
