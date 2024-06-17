import { NextRequest, NextResponse } from "next/server";
import { getIsTokenExpired } from "@/actions/auth";

const publicRoutes = ["/"];
const authRoutes = ["/auth/login", "/auth/register"];

export const checkUserSession = async (request: NextRequest) => {
  const nextUrl = request.nextUrl;
  const path = nextUrl.pathname;
  const tokenExpired = await getIsTokenExpired();

  // check route path
  const isPublicRoute = publicRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  if (path === "/logout") {
    const res = NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    res.cookies.delete("token");
    return res;
  }

  if (!isPublicRoute && tokenExpired && !isAuthRoute) {
    const res = NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    return res;
  }

  return NextResponse.next();
};
