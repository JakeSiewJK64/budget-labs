import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./utils/cookiesUtils";
import { getIsTokenExpired } from "./actions/auth";

const publicRoutes = ["/"];
const authRoutes = ["/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const path = nextUrl.pathname;
  const authToken = getCookie("token");
  const tokenExpired = await getIsTokenExpired(authToken?.value);
  const authenticated = authToken && !tokenExpired;

  // check route path
  const isPublicRoute = publicRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  if (path === "/logout") {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("token");
    return response;
  }

  if (isAuthRoute) {
    return NextResponse.next();
  }

  if (!authenticated && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
