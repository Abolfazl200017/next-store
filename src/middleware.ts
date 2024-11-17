import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const isAuthenticated = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken');
  return Boolean(authToken);
};

export async function middleware(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Case 1: If the user is not authenticated and tries to access '/basket', redirect to '/register'
  if (!(await isAuthenticated()) && pathname === '/basket') {
    return NextResponse.redirect(new URL('/register', req.url));
  }

  // Case 2: If the user is authenticated and tries to access '/register', redirect to '/'
  if (await isAuthenticated() && pathname === '/register') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Optional: Apply middleware to only specific paths
export const config = {
  matcher: ['/basket', '/register'],
};
