import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '@/views/LoginView.vue';
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue';
import FirebaseSigninView from '@/views/FirebaseSigninView.vue';
import { ref } from 'vue';
import UserPage from '@/views/UserPage.vue';
import AdminPage from '@/views/AdminPage.vue';
import { isAuthenticated, userRole } from '../authState'; // 从全局状态文件中导入
import AddBookView from '@/views/AddBookView.vue';
import GetBookCountView from '@/views/GetBookCountView.vue';
import WeatherView from '@/views/WeatherView.vue';
import CountBookAPI from '@/views/CountBookAPI.vue';
import GetAllBokkAPI from '@/views/GetAllBokkAPI.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { isAuthenticated: true }, // About  page requires authentication
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/firelogin',
    name: 'FireLogin',
    component: FirebaseSigninView,
  },
  {
    path: '/fireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView,
  },
  {
    path: '/userpage',
    name: 'UserPage',
    component: UserPage,
    meta: { isAuthenticated: true, role: 'user' }
  },
  {
    path: '/adminpage',
    name: 'AdminPage',
    component: AdminPage,
    meta: { isAuthenticated: true, role: 'admin' }
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView,
  },
  {
    path: '/getBookCount',
    name: 'GetBookCount',
    component: GetBookCountView,
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBokkAPI
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isAuthenticated

  )) {
    if (!isAuthenticated.value) {
      alert('You need to log in to access this page.');
      next({
        name: 'FireLogin',
        query: { redirect: to.fullPath },
      });
    } else if (to.meta.role && to.meta.role !== userRole.value) {
      alert('You do not have permission to access this page.');
      next({ name: 'FireLogin' });
    } else {
      console.log(userRole)
      next();
    }
  } else {
    next();
  }
});

export default router;
export { isAuthenticated };