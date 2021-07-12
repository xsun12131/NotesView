<template>
  <div
    class="noteList w-100"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
  >
    <NoteCard
      v-for="item in noteLists"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :content="item.summary"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import NoteCard from "@/components/note/NoteCard.vue";
import { fetchList } from "@/api/note";

export default {
  name: "NoteList",
  components: {
    NoteCard,
  },
  data() {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 8,
      },
      busy: false,
      noteLists: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      fetchList(this.listQuery).then((response) => {
        const noteList = response.content;
        for (var i = 0; i < noteList.length; i++) {
          this.noteLists.push(noteList[i]);
        }
        if (noteList.length < this.listQuery.pageSize) {
          this.busy = true;
        } else {
          this.busy = false;
        }
      });
    },
    loadMore: function () {
      this.busy = true;
      setTimeout(() => {
        this.listQuery.pageNum += 1;
        this.getData();
      }, 1000);
    },
  },
};
</script>
<style scoped>
.noteList {
  border-radius: var(--radius-wrap);
  padding: 0 15px;
  background: var(--background);
  box-shadow: var(--box-shadow);
}

.noteList:first-child {
  margin-top: 20px;
}
.noteList:last-child {
  margin-bottom: 20px;
}
</style>
