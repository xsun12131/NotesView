<template>
  <div class="noteDetail">
    <h1 class="title">{{ this.title }}</h1>
    <div class="information"></div>
    <div class="content markdown" id="content"></div>
    <div class="outline" id="outline"></div>
  </div>
</template>
<script>
import { fetchDataById } from "@/api/note";
import Vditor from "vditor";
import "@/assets/css/markdown.css";
import { setStore } from "@/utils/commonUtils";

export default {
  name: "NoteDetail",
  components: {
  },
  data() {
    return {
      id: String,
      title: String,
      content: String,
      updateTime: Date,
      createTime: Date,
    };
  },
  created() {
    if (this.$route.query && this.$route.query.id) {
      // vue从路径中获取参数 此处参数名为id
      const id = this.$route.query.id;
      this.getNoteDetail(id);
      setStore("currentNoteId", id);
    }
  },
  methods: {
    getNoteDetail: function (id) {
      fetchDataById(id).then((note) => {
        this.id = note.id;
        this.content = note.content;
        this.updateTime = note.updateTime;
        this.createTime = note.createTime;
        this.title = note.title;
        Vditor.preview(document.getElementById("content"), this.content, {
          speech: {
            enable: true,
          },
          anchor: 1,
          after() {
          },
        });
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.noteDetail {
  background: var(--background);
  border-radius: var(--radius-wrap);
  padding: 15px;
  box-shadow: var(--box-shadow);
  margin-bottom: 15px;
}

.title {
  font-size: 24px;
  color: var(--main);
  text-shadow: var(--text-shadow);
  text-align: center;
  margin-bottom: 15px;
  word-break: break-word;
}
.content {
  padding-top: 15px;
  font-size: 15px;
  word-break: break-word;
  color: var(--routine);
}
</style>