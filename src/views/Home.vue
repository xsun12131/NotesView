<template>
  <div class="home">
    <Header></Header>
    <router-view />
    <Action></Action>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/common/Header.vue";
import Action from "@/components/common/Action.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    Action,
    Footer,
  },
};
</script>
<style scoped>
.home {
  height: 100%;
}

.home:first-child {
  height: calc(100% - 60px - 35px);
}
</style>
