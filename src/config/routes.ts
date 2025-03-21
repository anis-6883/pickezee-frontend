export const routes = {
  publicRoutes: {
    home: "/",
    login: "/login",
    signup: "/signup",
    adminLogin: "/secret-root/admin/login",
  },
  privateRoutes: {
    admin: {
      dashboard: "/secret-root/admin/dashboard",
    },
  },
};
