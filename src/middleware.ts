import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import useBasketStore from './store/basketStore';


const isAuthenticated = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken');
  return Boolean(authToken);
};

export async function middleware(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  // const { products } = useBasketStore();

  // Case 1: If the user is not authenticated and tries to access '/basket', redirect to '/register'
  if (!(await isAuthenticated()) && pathname === '/basket') {
    return NextResponse.redirect(new URL('/register', req.url));
  }

  // Case 2: If the user is authenticated and tries to access '/register', redirect to '/'
  if (await isAuthenticated() && pathname === '/register') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Case 3: If the user is not authenticated or doesn't have basket and tries to access '/checkout', redirect to '/home'
  if (!(await isAuthenticated() ) && pathname === '/basket/checkout') {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
}

// Optional: Apply middleware to only specific paths
export const config = {
  matcher: ['/basket', '/register'],
};
