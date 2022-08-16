import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";

createApp(App).use(store).use(router).mount("#app");

window.fetch = (function (_super) {
  return function () {
    arguments[0] = process.env.VUE_APP_API + arguments[0];
    Object.assign(arguments[1], {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return _super.apply(this, arguments);
  };
})(window.fetch);
