<template>
  <div class="note-editor">
    <div class="title">
      <label>标题</label>
      <input v-model="title" />
    </div>
    <div>
      <button class="save" @click="saveNote()">保存</button>
    </div>
    <div id="vditor" class="vditor"></div>
    <Dialog
      v-model="sendVal"
      type="reminder"
      title="提示"
      content="保存成功"
    ></Dialog>
  </div>
</template>
<script>
import Vditor from "vditor";
import "@/assets/css/vditor.css";
import { save } from "@/api/note.js";
import { fetchDataById } from "@/api/note";
import Dialog from "@/components/common/Dialog.vue";

export default {
  name: "NoteEditor",
  components: {
    Dialog,
  },
  data() {
    return {
      id: "",
      title: "",
      contentEditor: "",
      sendVal: false,
    };
  },
  methods: {
    saveNote() {
      const note = {};
      note.id = this.id;
      note.title = this.title;
      note.content = this.contentEditor.getValue();
      save(note).then((data) => {
        this.id = data.id;
        this.sendVal = true;
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
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      after: () => {
        if (this.$route.query && this.$route.query.id) {
          // vue从路径中获取参数 此处参数名为id
          const id = this.$route.query.id;
          this.getNoteDetail(id);
        }
      },
    });
  },
};
</script>
<style scoped>
@import "../../assets/css/markdown.css";

.note-editor {
  width: 100%;
  background-color: rgb(235, 243, 243);
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

.vditor {
  min-height: calc(100% - 45px);
}
</style>