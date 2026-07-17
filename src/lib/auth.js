import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "portfolio_admin";

function expectedToken() {
  const password = process.env.ADMIN_PASSWORD || "admin123";
  return crypto.createHash("sha256").update(`portfolio:${password}`).digest("hex");
}

export function isAuthenticated() {
  const token = cookies().get(COOKIE_NAME)?.value;
  return Boolean(token && token === expectedToken());
}

function cookieSecureFlag() {
  // Required on HTTPS production so browsers keep the admin session cookie.
  if (process.env.COOKIE_SECURE === "true") return true;
  if (process.env.COOKIE_SECURE === "false") return false;
  return process.env.NODE_ENV === "production";
}

export function getAuthCookieOptions() {
  return {
    name: COOKIE_NAME,
    value: expectedToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: cookieSecureFlag(),
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export function clearAuthCookieOptions() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: cookieSecureFlag(),
    path: "/",
    maxAge: 0,
  };
}

export function checkPassword(password) {
  return password === (process.env.ADMIN_PASSWORD || "admin123");
}
