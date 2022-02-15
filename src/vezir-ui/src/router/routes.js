const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        meta: { requiresAuth: true },
        path: "/j--",
        component: () => import("pages/Index.vue"),
      },
    ],
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("pages/Login.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
