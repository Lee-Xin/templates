<template>
  <div id="app">
    <main-header />
    <div class="main-cnt">
      <router-view />
    </div>
  </div>
</template>
<style>
@import "//at.alicdn.com/t/font_1620321_gepe0dl8g8r.css";
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", SimSun, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
}
#app {
  height: 100%;
}
.main-cnt {
  padding: 0;
  margin-top: 0;
  height: 100%;
  min-height: auto;
}
</style>
