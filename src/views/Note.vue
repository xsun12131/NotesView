<template>
  <div class="note">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Note",
};
</script>
<style scoped>
.note {
  height: 100%;
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
}

@media (min-width: 576px) {
  .note {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .note {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .note {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .note {
    max-width: 1140px;
  }
}

@media (min-width: 1400px) {
  .note {
    max-width: 1320px;
  }
}
</style>
