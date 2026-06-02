 import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(['/']);

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();
    const currentUrl = new URL(req.url);

    // 🌟 FIX: If the user is signed in and trying to access the homepage, redirect them instantly
    if (userId && currentUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
