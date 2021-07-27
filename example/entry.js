import Vue from "vue";
import App from "./app.vue";
import router from "./router";
import VueRouter from "vue-router";
import DemoBlock from "./demo-block";
import echartsCustom from "../packages";
import title from "./i18n/title";
import { Backtop, Icon } from "element-ui";
import SideNav from "./components/side-nav";
import FooterNav from "./components/footer-nav";
import MainHeader from "./components/header";
import hljs from "highlightjs";
import "element-ui/lib/theme-chalk/index.css";
import "./example.less";
import "highlightjs/styles/color-brewer.css";

Vue.use(DemoBlock);
Vue.use(echartsCustom);
Vue.use(Backtop);
Vue.use(Icon);
Vue.component("side-nav", SideNav);
Vue.component("footer-nav", FooterNav);
Vue.component("main-header", MainHeader);
Vue.use(VueRouter);

Vue.config.productionTip = false;

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll("pre code:not(.hljs)");
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });

  const data = title[route.meta.lang];
  for (let val in data) {
    if (new RegExp("^" + val, "g").test(route.name)) {
      let title = data[val];
      const splitText = route.name.split(route.meta.lang);
      if (splitText[1]) {
        title += ` | ${splitText[1]}`;
      }
      document.title = title;
      return;
    }
  }
  document.title = "app";
});

new Vue({
  render: h => h(App),
  router: router
}).$mount("#app");
