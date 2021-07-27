import Router from "vue-router";
import routes from "./routes";

export default new Router({
  mode: "hash",
  base: __dirname,
  routes: routes
});
