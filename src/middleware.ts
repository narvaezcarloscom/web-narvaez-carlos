import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "es"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // English is canonically served without a prefix — see buildAlternates() in
  // src/lib/seo.ts, which emits /about (not /en/about) as the EN canonical, and
  // src/app/sitemap.ts, which lists only the prefix-less EN URLs.
  //
  // The rewrite below made /en/about reachable as a second, non-canonical URL
  // for the same page. That also broke the locale switcher: from /en/about it
  // built /es + pathname = /es/en/about, which 404s (Navbar.tsx assumes EN has
  // no prefix). Redirecting collapses EN back to a single URL, which fixes the
  // switcher by construction rather than by patching it in a second place.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice("/en".length) || "/";
    return NextResponse.redirect(url, 308);
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  request.nextUrl.pathname = `/en${pathname}`;
  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon\\.ico|sitemap\\.xml|robots\\.txt|emprendedor|sitios|tu-negocio|work/.*\\.png|.*\\.svg|.*\\.png|.*\\.ico|.*\\.jpg|.*\\.webp).*)"],
};
