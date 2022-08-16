import { createStore } from "vuex";
import jwt_decode from "jwt-decode";

function decodeJwt(jwt) {
  let decoded;
  if (jwt && jwt.access_token && (decoded = jwt_decode(jwt.access_token)))
    return decoded;
  throw new Error("Invalid JWT");
}

export default createStore({
  state: {
    jwt: null,
    payload: null,
  },
  mutations: {
    getJwt(state) {
      try {
        const jwt = JSON.parse(localStorage.getItem("jwt"));
        const payload = decodeJwt(jwt);
        state.jwt = jwt;
        state.payload = payload;
      } catch (e) {
        console.error(e);
        this.commit("removeJwt");
      }
    },
    setJwt(state, jwt) {
      try {
        const payload = decodeJwt(jwt);
        localStorage.setItem("jwt", JSON.stringify(jwt));
        state.jwt = jwt;
        state.payload = payload;
      } catch (e) {
        console.error(e);
        this.commit("removeJwt");
      }
    },
    removeJwt(state) {
      state.jwt = null;
      state.payload = null;
      localStorage.removeItem("jwt");
    },
  },
});
