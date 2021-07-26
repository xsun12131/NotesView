<template>
    <div class="noteDetail w-100">
        <h1 class="title">{{ this.title }}</h1>
        <div class="tags">
            <el-tag
                :key="tag"
                v-for="tag in tags"
                size="mini"
            >
                {{ tag }}
            </el-tag>
        </div>
        <div class="information"></div>
        <div class="content markdown" id="content"></div>
        <div class="outline" id="outline"></div>
    </div>
</template>
<script>
import { fetchDataById } from '@/api/note';
import Vditor from 'vditor';
import '@/assets/css/markdown.css';
import { setStore } from '@/utils/commonUtils';

export default {
    name: 'NoteDetail',
    components: {},
    data() {
        return {
            id: String,
            title: String,
            content: String,
            updateTime: Date,
            createTime: Date,
            tags: [],
        };
    },
    created() {
        if (this.$route.query && this.$route.query.id) {
            // vue从路径中获取参数 此处参数名为id
            const id = this.$route.query.id;
            this.getNoteDetail(id);
            setStore('currentNoteId', id);
        }
    },
    methods: {
        getNoteDetail: function(id) {
            fetchDataById(id).then(note => {
                this.id = note.id;
                this.content = note.content;
                this.updateTime = note.updateTime;
                this.createTime = note.createTime;
                this.title = note.title;
                this.tags = note.tags;
                Vditor.preview(document.getElementById('content'), this.content, {
                    speech: {
                        enable: true,
                    },
                    anchor: 1,
                    after() {},
                });
            });
        },
    },
    mounted() {},
};
</script>
<style scoped>
@import '../../assets/css/markdown.css';

.noteDetail {
    background: var(--background);
    border-radius: var(--radius-wrap);
    padding: 15px;
    box-shadow: var(--box-shadow);
}

.title {
    font-size: 24px;
    color: var(--main);
    text-shadow: var(--text-shadow);
    text-align: center;
    margin-bottom: 15px;
    word-break: break-word;
}
.tags {
  display: flex;
  justify-content: center;
}
.content {
    padding-top: 15px;
    font-size: 15px;
    word-break: break-word;
    color: var(--routine);
}
</style>
