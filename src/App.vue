<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import "@/assets/css/base.css";

export default {
  metaInfo: {
    title: "fatPanda",
    meta: [{ name: "renderer", content: "webkit" }],
  },
};
</script>
<style>
#app {
  height: 100%;
}
</style>
