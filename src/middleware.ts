import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "es"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  request.nextUrl.pathname = `/en${pathname}`;
  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon\\.ico|work/.*\\.png|.*\\.svg|.*\\.png|.*\\.ico|.*\\.jpg|.*\\.webp).*)"],
};
