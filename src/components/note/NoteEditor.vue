<template>
  <div class="note-editor">
    <div class="title">
      <label>标题</label>
      <input v-model="title" />
    </div>
    <div>
      <button class="save" @click="saveNote()">保存</button>
    </div>
    <div id="vditor"></div>
  </div>
</template>
<script>
import Vditor from "vditor";
import "vditor/dist/index.css";
import "@/assets/css/markdown.css";
import { save } from "@/api/note.js";
import { fetchDataById } from "@/api/note";

export default {
  name: "NoteEditor",
  data() {
    return {
      id: "",
      title: "",
      contentEditor: "",
    };
  },
  created() {
    if (this.$route.query && this.$route.query.id) {
      // vue从路径中获取参数 此处参数名为id
      const id = this.$route.query.id;
      this.getNoteDetail(id);
    }
  },
  methods: {
    saveNote() {
      const note = {};
      note.id = this.id;
      note.title = this.title;
      note.content = this.contentEditor.getValue();
      save(note).then((data) => {
        this.id = data.id;
      });
    },
    getNoteDetail: function (id) {
      fetchDataById(id).then((note) => {
        this.id = note.id;
        this.title = note.title;
        this.contentEditor.setValue(note.content);
      });
    },
  },
  mounted() {
    this.contentEditor = new Vditor("vditor", {
      height: 360,
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      after: () => {},
    });
  },
};
</script>
<style scoped>
.note-editor {
  height: 100%;
  width: 100%;
  background-color: rgb(235, 243, 243);
  margin-top: 20px;
}

.title label {
  margin-bottom: 10px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  color: var(--main);
  font-size: 18px;
  line-height: 24px;
  max-height: 48px;
  transition: color 0.35s;
}

#vidtor {
  height: 100%;
}
</style>