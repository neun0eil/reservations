import { createStore } from "vuex";
import jwt_decode from "jwt-decode";

export default createStore({
  state: {
    jwt: null,
    payload: null,
  },
  mutations: {
    getJwt(state) {
      try {
        state.jwt =
          sessionStorage.getItem("jwt") || localStorage.getItem("jwt");
        if (state.jwt) state.payload = jwt_decode(state.jwt);
      } catch (e) {
        console.error(e);
        this.commit("removeJwt");
      }
    },
    setJwt(state, { jwt, remember }) {
      try {
        state.payload = jwt_decode(jwt);
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("jwt", jwt);
        state.jwt = jwt;
      } catch (e) {
        console.error(e);
        this.commit("removeJwt");
      }
    },
    removeJwt(state) {
      state.jwt = null;
      state.payload = null;
      sessionStorage.removeItem("jwt");
      localStorage.removeItem("jwt");
    },
  },
});
