import createMiddleware from 'next-intl/middleware';
import {createServerClient} from '@supabase/ssr';
import {NextResponse, type NextRequest} from 'next/server';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({name, value}) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({name, value, options}) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {data: {user}} = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const protectedRoutes = ['/saved', '/dashboard', '/add-opportunity', '/profile'];
  const isProtected = protectedRoutes.some((route) =>
    pathname.includes(route)
  );

  if (isProtected && !user) {
    const loginUrl = new URL('/fa/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const intlResponse = intlMiddleware(request);
  
  intlResponse.cookies.getAll().forEach(({name, value}) => {
    response.cookies.set(name, value);
  });

  return intlResponse;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};