import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { routes } from "./config/routes";

function extractLinks(obj: any) {
  let links: any = [];

  for (let key in obj) {
    if (typeof obj[key] === "string") {
      links.push(obj[key]);
    } else if (typeof obj[key] === "object") {
      links = links.concat(extractLinks(obj[key]));
    } else if (typeof obj[key] === "function") {
      // If it's a function, you can call it with a sample ID to get a sample link
      links.push(obj[key]());
    }
  }

  return links;
}

const adminProtectedRoutes = extractLinks(routes?.privateRoutes?.admin);
// const retailerProtectedRoutes = extractLinks(routes?.privateRoutes?.retailer);

const middleware = withAuth(
  function middleware(request) {
    const token = request.nextauth?.token;
    const pathname = request.nextUrl.pathname;

    const isAdminProtected = adminProtectedRoutes.includes(pathname);
    // const isRetailerProtected = retailerProtectedRoutes.includes(pathname);

    if (!token && isAdminProtected) {
      return NextResponse.redirect(new URL(routes.publicRoutes.login, request.nextUrl));
    }

    // if (token) {
    //   if (token.role === ROLE.RETAILER && isAdminProtected) {
    //     return NextResponse.redirect(new URL(routes.privateRoutes.retailer.dashboard, request.nextUrl));
    //   }
    //   if (token.role === ROLE.ADMIN && isRetailerProtected) {
    //     return NextResponse.redirect(new URL(routes.privateRoutes.Admin.dashboard, request.nextUrl));
    //   }
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => true,
    },
  }
);

export default middleware;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|fonts|default|favicon.ico|sitemap.xml|robots.txt|$).*)"],
};
