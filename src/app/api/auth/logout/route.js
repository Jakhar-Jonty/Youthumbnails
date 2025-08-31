import { serialize } from 'cookie';

export default function handler(req, res) {
  // Create a cookie with the same name but expire it immediately
  const serializedCookie = serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1, // Expire the cookie
    path: '/',
  });

  res.setHeader('Set-Cookie', serializedCookie);
  res.status(200).json({ message: 'Logout successful' });
}
