<template>
  <div class="action">
    <div class="action-item editor" v-show="isShow" @click="toEditor()">
      <svg
        class="icon-1"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
      >
        <path
          d="M587.264 104.96c33.28 57.856 52.224 124.928 52.224 196.608 0 218.112-176.128 394.752-393.728 394.752-29.696 0-58.368-3.584-86.528-9.728C223.744 832.512 369.152 934.4 538.624 934.4c229.376 0 414.72-186.368 414.72-416.256 1.024-212.992-159.744-389.12-366.08-413.184z"
        ></path>
        <path
          d="M340.48 567.808l-23.552-70.144-70.144-23.552 70.144-23.552 23.552-70.144 23.552 70.144 70.144 23.552-70.144 23.552-23.552 70.144zM168.96 361.472l-30.208-91.136-91.648-30.208 91.136-30.208 30.72-91.648 30.208 91.136 91.136 30.208-91.136 30.208-30.208 91.648z"
        ></path>
      </svg>
    </div>
  </div>
</template>
<script>
import { getStore } from "@/utils/commonUtils.js";

export default {
  name: "Action",
  data() {
    return {
      isShow:false
    }
  },
  created() {
  },
  methods: {
    toEditor() {
      const id = getStore("currentNoteId");
      this.$router.push({
        path: "/note/noteEditor",
        query: {
          id: id,
        },
      });
    }
  },
  watch: {
    "$route.path": function(path) {
      this.isShow = getStore("isLogin") && path === "/note/noteDetail"
    }
  }
};
</script>
<style scoped>
.action {
  position: fixed;
  bottom: 90px;
  right: 30px;
  z-index: 333;
}

.action-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--background);
  border-radius: 50%;
  cursor: pointer;
  margin-top: 15px;
  box-shadow: 0 0 10px rgb(0 0 0 / 10%), 0 5px 20px rgb(0 0 0 / 20%);
}

.action-item svg {
  position: absolute;
  width: 25px;
  height: 25px;
  fill: var(--theme);
}
</style>