import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: '' } },
    { path: '/news', name: 'news', component: () => import('../views/NewsView.vue'), meta: { title: '新聞快報' } },
    { path: '/articles', name: 'articles', component: () => import('../views/ArticlesView.vue'), meta: { title: '專題' } },
    { path: '/articles/:slug', name: 'article', component: () => import('../views/ArticleView.vue'), props: true },
    { path: '/showcase', name: 'showcase', component: () => import('../views/ShowcaseView.vue'), meta: { title: '成員作品' } },
    { path: '/showcase/:slug', name: 'work', component: () => import('../views/WorkView.vue'), props: true },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue'), meta: { title: '關於與投稿' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue'), meta: { title: '找不到這一頁' } },
  ],
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 72 }
    return { top: 0 }
  },
})

const BASE_TITLE = 'The Game Test Space · 遊戲測試的地方'
router.afterEach((to) => {
  const t = to.meta.title as string | undefined
  if (t !== undefined) document.title = t ? `${t} · ${BASE_TITLE}` : BASE_TITLE
})

export default router
