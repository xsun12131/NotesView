<template>
  <footer class="w-100">
    <div class="container">
      <a href="https://beian.miit.gov.cn" target="_blank"
        >皖ICP备2021009320号</a
      >
    </div>
  </footer>
</template>
<script>
export default {
  name: "Footer",
};
</script>
<style scoped>
footer {
  border-top: 1px solid var(--classB);
  color: var(--minor);
  display: block;
  bottom: 0%;
}

footer .container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  margin: 0 auto;
  padding: 0 15px;
}

.container a {
  text-align: center;
  color: var(--minor);
}
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

@media (min-width: 1400px) {
  .container {
    max-width: 1320px;
  }
}
</style>