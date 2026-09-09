import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "www.brianrobt.com";

/**
 * Keep the browser on a single host so relative fetch("/api/...") never
 * follows a cross-host 307 (CORS / opaque redirect failures on mobile).
 * Prefer 308 so POST method and body are preserved if an API call is redirected.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (host === "brianrobt.com") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * All paths except Next internals and static assets.
     * API routes are included so apex POSTs redirect with 308, not a
     * method-stripping hop when something still hits the apex host.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
