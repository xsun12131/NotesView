import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const Note = () => import('../views/Note.vue')
const NoteList = () => import('@/components/note/NoteList.vue')
const NoteDetail = () => import('@/components/note/NoteDetail.vue')
const NoteEditor = () => import('@/components/note/NoteEditor.vue')

const Login = () => import('../views/Login.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'Home',
    component: Home,
    children: [
      {
        path: "",
        redirect: 'note'
      },
      {
        path: 'note',
        component: Note,
        children: [
          {
            path: "",
            component: NoteList
          },
          {
            path: "noteDetail",
            component: NoteDetail
          },
          {
            path: "noteEditor",
            component: NoteEditor
          }
        ]
      }
    ]
  }, {
    path: "/login",
    name: "Login",
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
