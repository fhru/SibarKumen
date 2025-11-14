import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // LOGIN PAGE — block user who already logged in
  if (pathname.startsWith("/login")) {
    if (token) {
      const payload = await verifyToken(token);
      if (payload) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else {
        // delete invalid token
        const res = NextResponse.next();
        res.cookies.set("token", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development" ? true : false,
          sameSite: "strict",
          expires: new Date(0),
          path: "/",
        });
        return res;
      }
    }
    return NextResponse.next();
  }

  // PROTECTED ROUTES
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = await verifyToken(token);
    if (payload) {
      return NextResponse.next();
    } else {
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development" ? true : false,
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
      });
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
