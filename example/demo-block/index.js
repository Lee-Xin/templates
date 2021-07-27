import DemoBlock from "./demo-block.vue";

const install = function(Vue) {
  if (install.installed) return;
  Vue.component("demo-block", DemoBlock);
};
export default {
  install
};
