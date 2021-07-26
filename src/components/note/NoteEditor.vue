<template>
    <div class="note-editor">
        <div class="title">
            <label>标题</label>
            <input
                class="input w-100"
                v-model="title"
                maxlength="50"
                autocomplete="off"
                placeholder="请输入标题..."
                name="title"
                type="text"
            />
        </div>
        <div class="opeartion">
            <div class="tag-items">
                <label>标签</label>
                <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                >
                    {{ tag }}
                </el-tag>
                <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                ></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">
                    + New Tag
                </el-button>
            </div>
            <button class="save" @click="saveNote()">保存</button>
        </div>
        <div id="vditor" class="vditor"></div>
        <Dialog v-model="sendVal" type="reminder" title="提示" content="保存成功"></Dialog>
    </div>
</template>
<script>
import Vditor from 'vditor';
import '@/assets/css/vditor.css';
import { save } from '@/api/note.js';
import { fetchDataById } from '@/api/note';
import Dialog from '@/components/common/Dialog.vue';

export default {
    name: 'NoteEditor',
    components: {
        Dialog,
    },
    data() {
        return {
            id: '',
            title: '',
            contentEditor: '',
            sendVal: false,
            dynamicTags: [],
            inputVisible: false,
            inputValue: '',
        };
    },
    methods: {
        saveNote() {
            const note = {};
            note.id = this.id;
            note.title = this.title;
            note.content = this.contentEditor.getValue();
            note.tags = this.dynamicTags;
            save(note).then(data => {
                this.id = data.id;
                this.sendVal = true;
            });
        },
        getNoteDetail: function(id) {
            fetchDataById(id).then(note => {
                this.id = note.id;
                this.title = note.title;
                this.contentEditor.setValue(note.content);
                this.dynamicTags = note.tags;
            });
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
    },
    mounted() {
        this.contentEditor = new Vditor('vditor', {
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
@import '../../assets/css/markdown.css';

.note-editor {
    width: 100%;
    background-color: rgb(235, 243, 243);
}

.title {
    display: flex;
    align-content: center;
    align-items: center;
    padding: 15px;
}
.title label,
.opeartion label {
    width: 60px;
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
.title .input {
    background: var(--classC);
    height: 34px;
    border: 1px solid transparent;
    padding: 0 18px;
    color: var(--routine);
    transition: background 0.35s, border-color 0.35s, padding-right 0.35s;
    border-radius: 17px 0 0 17px;
}
.opeartion {
    display: flex;
    justify-content: space-between;
    height: 32px;
    padding: 0 15px;
    margin: 5px 0;
}

.tag-items label {
    margin-right: 20px;
}

.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}

.save {
    border-radius: 3px;
    height: 32px;
    padding: 0 15px;
    border: none;
    background: var(--theme);
    color: #fff;
    font-size: 14px;
}

.vditor {
    min-height: calc(100% - 45px);
}
</style>
