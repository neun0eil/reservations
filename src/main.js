import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";

createApp(App).use(store).use(router).mount("#app");

window.fetch = (function (_super) {
  return function (resource, options = {}) {
    resource = process.env.VUE_APP_API + resource;
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (store.state.jwt) headers.Authorization = "Bearer " + store.state.jwt;
    if (Object.hasOwn(options, "headers"))
      Object.assign(options.headers, headers);
    else options.headers = headers;
    return _super.apply(this, [resource, options]);
  };
})(window.fetch);
