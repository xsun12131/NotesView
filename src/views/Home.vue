<template>
  <div class="home">
    <Header></Header>
    <router-view />
    <Action></Action>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/common/Header.vue";
import Action from "@/components/common/Action.vue";

export default {
  name: "Home",
  components: {
    Header,
    Action
  },
};
</script>
<style scoped>
.home {
  height: 100%;
}
</style>
