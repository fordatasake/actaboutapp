import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home';
import Search from '@/components/Search';
import Category from '@/components/Category';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/search',
      name: 'search',
      component: Search
    }, {
      path: '/category/:categoryName',
      name: 'category',
      component: Category,
      props: true
    }
  ]
});

export default router;
