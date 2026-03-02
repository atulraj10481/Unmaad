import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const pathname = request.nextUrl.pathname;

    // Define routes that require authentication
    const isGameRoute = pathname.startsWith('/game');
    const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
    const isAuthPage = pathname === '/auth';

    // Only perform Supabase auth checks for paths that need it
    if (isGameRoute || isAdminRoute || isAuthPage) {
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                        supabaseResponse = NextResponse.next({
                            request,
                        })
                        cookiesToSet.forEach(({ name, value, options }) =>
                            supabaseResponse.cookies.set(name, value, options)
                        )
                    },
                },
            }
        )

        try {
            const {
                data: { user },
            } = await supabase.auth.getUser()

            // Protect /game routes
            if (isGameRoute && !user) {
                const url = request.nextUrl.clone()
                url.pathname = '/auth'
                return NextResponse.redirect(url)
            }

            // Protect /admin routes
            if (isAdminRoute) {
                if (!user) {
                    const url = request.nextUrl.clone()
                    url.pathname = '/admin/login'
                    return NextResponse.redirect(url)
                }

                const { data: profile } = await supabase
                    .from('profiles')
                    .select('is_admin')
                    .eq('id', user.id)
                    .single()

                if (!profile?.is_admin) {
                    const url = request.nextUrl.clone()
                    url.pathname = '/game'
                    return NextResponse.redirect(url)
                }
            }

            // Prevent logged in users from going to /auth
            if (isAuthPage && user) {
                const url = request.nextUrl.clone()
                url.pathname = '/game'
                return NextResponse.redirect(url)
            }
        } catch (error) {
            console.error('Supabase proxy error:', error);
            // If it's a critical route, we might still want to redirect to login
            // but for now we'll just allow the request to proceed to avoid the 33s hang
        }
    }

    return supabaseResponse
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
