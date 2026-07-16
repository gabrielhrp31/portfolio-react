import { NextResponse } from "next/server";
import {
  checkPassword,
  getAuthCookieOptions,
} from "@/lib/auth";

export async function POST(request) {
  const body = await request.json();
  if (!checkPassword(body.password || "")) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  const cookie = getAuthCookieOptions();
  response.cookies.set(cookie.name, cookie.value, {
    httpOnly: cookie.httpOnly,
    sameSite: cookie.sameSite,
    path: cookie.path,
    maxAge: cookie.maxAge,
  });
  return response;
}
