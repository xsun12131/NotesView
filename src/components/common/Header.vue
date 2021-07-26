<template>
    <header class="header">
        <div class="container">
            <svg
                class="slideicon"
                viewBox="0 0 1152 1024"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
            >
                <path
                    d="M76.032 872a59.968 59.968 0 1 0 0 120h999.936a59.968 59.968 0 1 0 0-120H76.032zm16-420.032a59.968 59.968 0 1 0 0 120h599.936a59.968 59.968 0 1 0 0-119.936H92.032zM76.032 32a59.968 59.968 0 1 0 0 120h999.936a60.032 60.032 0 0 0 0-120H76.032z"
                ></path>
            </svg>
            <a class="logo">
                fat
                <br class="logo_br" />
                panda
            </a>
            <nav class="menu">
                <a href="#/note" class="menu_item" @click="clearSearch()">首页</a>
                <a
                    href="#/note/noteEditor"
                    class="menu_item"
                    v-show="isLogin"
                    @click="clearSearch()"
                >
                    开坑
                </a>
            </nav>
            <div class="search">
                <input
                    maxlength="16"
                    autocomplete="off"
                    placeholder="请输入关键字..."
                    name="search"
                    v-model="searchDto.query"
                    class="input"
                    type="text"
                />
                <button type="submit" class="submit" @click="searchNote()">
                    Search
                </button>
            </div>
            <svg
                class="search_icon"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
            >
                <path
                    d="M1008.19 932.031L771.72 695.56a431.153 431.153 0 1 0-76.158 76.158l236.408 236.472a53.758 53.758 0 0 0 76.158 0 53.758 53.758 0 0 0 0-76.158zM107.807 431.185a323.637 323.637 0 0 1 323.316-323.381 323.7 323.7 0 0 1 323.381 323.38 323.637 323.637 0 0 1-323.38 323.317 323.637 323.637 0 0 1-323.317-323.316z"
                ></path>
            </svg>
            <div class="login">
                <router-link to="/login">
                    <svg
                        class="icon"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                    >
                        <path
                            d="M710.698 299a213.572 213.572 0 1 0-213.572 213.954A213.572 213.572 0 0 0 710.698 299zm85.429 0a299.382 299.382 0 1 1-299-299 299 299 0 0 1 299 299z"
                        ></path>
                        <path
                            d="M114.223 1024a46.91 46.91 0 0 1-46.91-46.91 465.281 465.281 0 0 1 468.332-460.704 475.197 475.197 0 0 1 228.827 58.35 46.91 46.91 0 1 1-45.384 82.378 381.378 381.378 0 0 0-183.443-46.909 371.08 371.08 0 0 0-374.131 366.886A47.29 47.29 0 0 1 114.223 1024zM944.483 755.129a38.138 38.138 0 0 0-58.733 0l-146.449 152.55-92.675-91.53a38.138 38.138 0 0 0-58.732 0 43.858 43.858 0 0 0 0 61.402l117.083 122.422a14.492 14.492 0 0 0 8.39 4.577c4.196 0 4.196 4.195 8.39 4.195h32.037c4.195 0 4.195-4.195 8.39-4.195s4.195-4.577 8.39-4.577L946.39 816.15a48.054 48.054 0 0 0-1.906-61.02z"
                        ></path>
                        <path
                            d="M763.328 776.104L730.53 744.45a79.708 79.708 0 0 0 32.798 31.654"
                        ></path>
                    </svg>
                    登录
                </router-link>
            </div>
        </div>
    </header>
</template>
<script>
import '@/assets/ttf/font.css';
import { currentUserSimple } from '@/api/user.js';
import { getStore } from '@/utils/commonUtils.js';
import { globalBus } from '@/utils/globalBus.js';

export default {
    name: 'Header',
    data() {
        return {
            searchDto: {
                pageNum: 1,
                pageSize: 10,
                query: '',
            },
            isChoose: false,
            isLogin: false,
        };
    },
    mounted() {
        this.checkLogin();
        window.addEventListener('setItemEvent', e => {
            console.log(e.newValue);
        });
    },
    methods: {
        checkLogin() {
            currentUserSimple().then(() => {
                this.isLogin = getStore('isLogin');
            });
        },
        togglePay: function() {
            this.isChoose = !this.isChoose;
        },
        searchNote() {
            globalBus.$emit('searchDto', this.searchDto);
        },
        clearSearch() {
            this.searchDto.query = '';
            globalBus.$emit('searchDto', this.searchDto);
        },
    },
};
</script>
<style scoped>
.header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: var(--background);
    box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
    transition: top 0.35s;
}

.header.active {
    top: -60px;
}
.logo {
    font-size: 22px;
    font-family: 'logo';
    position: relative;
    display: flex;
    align-items: center;
    height: 60px;
    padding-right: 15px;
    margin-right: 15px;
}
.container {
    align-items: center;
    max-width: 720px;
    display: flex;
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;
}
.menu {
    display: flex;
    align-items: center;
}
.menu_item {
    position: relative;
    height: 60px;
    line-height: 60px;
    font-size: 15px;
    padding: 0 8px;
    margin-right: 15px;
    transition: color 0.35s;
    white-space: nowrap;
    color: var(--main);
}
.menu_item.active,
.menu_item:hover {
    color: var(--theme);
}
.input[type='text'] {
    background: var(--classC);
    width: 170px;
    height: 34px;
    border: 1px solid transparent;
    padding: 0 18px;
    color: var(--routine);
    transition: background 0.35s, border-color 0.35s, padding-right 0.35s;
    border-radius: 17px 0 0 17px;
}
.submit {
    position: relative;
    z-index: 1;
    height: 34px;
    border: none;
    background: var(--theme);
    color: #fff;
    border-radius: 0 17px 17px 0;
    padding: 0 10px;
}
.search {
    position: relative;
    margin-left: auto;
    display: flex;
    align-items: center;
}
.search_icon {
    margin-left: auto;
}
.slideicon,
.search_icon {
    display: none;
    width: 20px;
    height: 20px;
    fill: var(--routine);
    cursor: pointer;
}
.login {
    margin: 0 15px;
}
.login svg {
    fill: var(--routine);
    margin-right: 5px;
}
.login a {
    color: var(--routine);
    transition: color 0.25s;
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

@media (max-width: 768px) {
    .container {
        justify-content: space-between;
    }
    .slideicon {
        display: block;
    }
    .logo_br {
        display: none;
    }
    .menu {
        display: none;
    }
    .search_icon {
        margin-left: 0;
    }
}

@media (min-width: 992px) {
    .container {
        max-width: 960px;
    }
}

@media (max-width: 992px) {
    .search {
        display: none;
    }
    .search_icon {
        display: block;
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
