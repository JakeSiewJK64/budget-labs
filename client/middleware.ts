import { NextRequest } from "next/server";
import { checkUserSession } from "./utils/checkUserSession";

export async function middleware(request: NextRequest) {
  return await checkUserSession(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
