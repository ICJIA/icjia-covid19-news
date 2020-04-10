const manualRoutes = [
  {
    path: "/404",
    name: "404",
    meta: {
      title: "404",
      showInSitemap: false
    },

    component: () => import(/* webpackChunkName: "404" */ "../views/404.vue")
  },
  {
    path: "/search",
    name: "search",
    meta: {
      title: "search",
      showInSitemap: true
    },

    component: () =>
      import(/* webpackChunkName: "sandbox" */ "../views/Search.vue")
  },
  {
    path: "/home",
    name: "altHome",
    redirect: "/"
  }
];

module.exports = manualRoutes;
