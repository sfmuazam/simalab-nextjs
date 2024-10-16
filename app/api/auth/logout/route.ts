/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  
  const response = NextResponse.json({ 
    success: true,
    message: 'Logged out successfully' }, { status: 200 });
  response.cookies.set({
    name: 'token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'strict',
    expires: new Date(0), // Expire the cookie
  });
  return response;
}
