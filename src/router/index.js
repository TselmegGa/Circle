import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }, 
    {
      path: '/forums',
      name: 'forums',
      component: () => import('../views/ForumView.vue')
    },
    {
      path: '/forum',
      name: 'forum',
      component: () => import('../views/PostsView.vue'),
      props:true
    },
    {
      path: "/",
      name: "home",
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
