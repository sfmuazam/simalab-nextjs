import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth'; 

// Daftar route yang tidak perlu autentikasi
const publicRoutes = [
  '/api/auth/login',
  '/favicon.ico',
  '/_next/',
  '/static/',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cek apakah route adalah public (tidak perlu autentikasi)
  const isPublic = publicRoutes.some(route => pathname.startsWith(route));

  const token = request.cookies.get('token')?.value;

  // Jika route bukan public dan tidak ada token, redirect ke login atau blok akses
  if (!isPublic) {
    if (!token) {
      if (pathname.startsWith('/dashboard')) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
      }

      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    } else {
      try {
        const valid = await verifyToken(token);
        if (!valid) {
          throw new Error('Invalid token');
        }
      } catch (error) {
        console.error('Token verification failed:', error);

        // Jika token tidak valid, redirect ke login atau respon dengan 401
        if (pathname.startsWith('/dashboard')) {
          const url = request.nextUrl.clone();
          url.pathname = '/';
          return NextResponse.redirect(url);
        }

        if (pathname.startsWith('/api/')) {
          return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }
      }
    }
  }

  // Jika pengguna sudah login (token valid) dan mencoba mengakses halaman login ('/')
  if (token) {
    try {
      const valid = await verifyToken(token); 
      if (valid && pathname === '/') {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard'; 
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
    }
  }

  return NextResponse.next();
}

// Konfigurasi middleware untuk route tertentu
export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*', '/'], 
};
