import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { loginSchema } from "@/lib/schema";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";
import { serialize } from "cookie";

const rateLimitStore = new Map();
const RATE_LIMIT_COUNT = 5;
const RATE_LIMIT_WINDOW = 60 * 1000; // 60 seconds

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";

  const now = Date.now();
  const userRequests = (rateLimitStore.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW,
  );

  if (userRequests.length >= RATE_LIMIT_COUNT) {
    return NextResponse.json(
      { message: "Too many requests, please try again later." },
      { status: 429 },
    );
  }

  rateLimitStore.set(ip, [...userRequests, now]);

  try {
    const body = await request.json();
    const { username, password } = loginSchema.parse(body);

    const user = await prisma.users.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = await signToken({
      userId: user.id_user,
      username: user.username,
      role: user.role.toString(),
    });

    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "strict",
    });

    const response = NextResponse.json({ message: "Login successful" });
    response.headers.set("Set-Cookie", cookie);

    return response;
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { message: "Invalid input", errors: error.errors },
        { status: 400 },
      );
    }
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
