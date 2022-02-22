const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),

    children: [
      {
        path: "/",
        component: () => import("pages/Index.vue"),
      },
      {
        path: "/cari-hesaplar/:id",
        component: () => import("pages/CurrentAccount.vue"),
      },
      {
        path: "/cari-hesaplar/ekle",
        component: () => import("pages/CurrentAccountAdd.vue"),
      },
      {
        path: "/FileUpload",
        component: () => import("pages/FileUpload.vue"),
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
