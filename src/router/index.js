import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index.vue'
import ShowTeam from '@/pages/ShowTeam.vue'
import ShowTodoList from '@/pages/ShowTodoList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/teams/:id',
      name: 'ShowTeam',
      component: ShowTeam
    },
    {
      path: '/todo_lists/:todo_list_id/show',
      name: 'ShowTodoList',
      component: ShowTodoList
    }
  ]
})
