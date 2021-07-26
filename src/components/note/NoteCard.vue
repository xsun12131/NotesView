<template>
  <div class="note_card" @click="showNote(id)">
    <a class="title" v-html="title"></a>
    <a class="summary" v-html="content">{{ content }}</a>
  </div>
</template>
<script>
export default {
  name: "NoteCard",
  props: {
    id: String,
    title: String,
    content: String,
  },
  methods: {
    showNote: function (id) {
      this.$router.push({
        path: "/note/noteDetail",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>
<style scoped>
.note_card {
  position: relative;
  width: 100%;
  border-bottom: 1px solid var(--classC);
  padding: 15px 0;
}

.title {
  margin-bottom: 10px;
  display: -webkit-box;
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

.summary {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--minor);
  word-break: break-word;
  line-height: 22px;
  max-height: 44px;
  opacity: 0.85;
}
</style>