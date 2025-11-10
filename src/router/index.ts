import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '@/views/SearchView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/search',
      name: 'Search',
      component: SearchView
    },
    {
      // 这里我们定义一个动态路由，用于显示不同活动的详情
      // `:id` 是一个参数，可以匹配像 /event/1, /event/abc 这样的路径
      path: '/event/:id',
      name: 'Detail',
      // 我们使用路由懒加载，这是一种优化，只在用户访问该页面时才加载组件
      component: () => import('@/views/EventDetailView.vue')
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: () => import('@/views/Favorites.vue')
    }
  ]
})

export default router
