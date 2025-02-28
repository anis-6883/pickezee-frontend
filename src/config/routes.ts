export const routes = {
  publicRoutes: {
    home: "/",
    login: "/login",
    adminLogin: "/secret-root/admin/login",
  },
  privateRoutes: {
    admin: {
      dashboard: "/secret-root/admin/dashboard",
    },
  },
};
