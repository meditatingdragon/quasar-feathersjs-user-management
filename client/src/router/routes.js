const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: "Home", component: () => import("pages/Index.vue") },
      {
        path: "/register",
        name: "Register",
        component: () => import("pages/Register.vue")
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("pages/Login.vue")
      },
      {
        path: "/verify",
        name: "Verify",
        component: () => import("pages/Verify.vue")
      },
      {
        path: "/account",
        name: "Account",
        component: () => import("pages/Account.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: () => import("pages/ForgotPassword.vue")
      },
      {
        path: "/reset-password",
        name: "ResetPassword",
        component: () => import("pages/ResetPassword.vue")
      }
    ]
  },
  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "AdminHome",
        component: () => import("pages/admin/Index.vue"),
        meta: { requiresAuth: true, requiresAdmin: true }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
