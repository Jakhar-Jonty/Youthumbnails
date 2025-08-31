import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    // Redirect to login if no token is found
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verify the token
    await jwtVerify(token, JWT_SECRET);
    // If token is valid, proceed to the requested page
    return NextResponse.next();
  } catch (error) {
    // If token verification fails, redirect to login
    console.error('JWT Verification Error:', error.message);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Specify which paths this middleware should apply to
export const config = {
  matcher: ['/', '/dashboard/:path*'], // Protect the homepage and any dashboard routes
};
