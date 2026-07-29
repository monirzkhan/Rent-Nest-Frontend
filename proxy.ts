'use server'

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken'

const AUTH_ROUTES = ['/login', '/register'];
const PUBLIC_ROUTES = ['/properties', '/properties/:id']

export async function proxy(request: NextRequest) {

    const pathName = request.nextUrl.pathname
    const cookieStore = await cookies();
    const accessToken = request.cookies.get('accessToken')?.value

    const decodedToken = accessToken ? jwt.decode(accessToken) as JwtPayload : null;

    let userRole = null;
    if (decodedToken) {
        userRole = decodedToken.role
    }
    if (!decodedToken) {
        cookieStore.delete('accessToken')
    }
    if (accessToken && AUTH_ROUTES.includes(pathName)) {
        if (userRole == "TENANT") {
            return NextResponse.redirect(new URL('/dashboard/tenant', request.url))
        }
        else if (userRole == "LANDLORD") {
            return NextResponse.redirect(new URL('/dashboard/landlord', request.url))
        }
        else if (userRole == "ADMIN") {
            return NextResponse.redirect(new URL('/dashboard/admin', request.url))
        }
        else {
            return NextResponse.redirect(new URL('/', request.url))
        }

    }
    //Authintication
    const isPublicRoutes = PUBLIC_ROUTES.some((route) => pathName === route || pathName.startsWith(route + '/'))

    const isAuthRoutes = AUTH_ROUTES.some((route) => pathName === route || pathName.startsWith(route + '/'))
    if (!accessToken && !isPublicRoutes && !isAuthRoutes) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    //Authorization
    if (pathName.startsWith('/dashboard/tenant') && userRole !== 'TENANT') {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }
    else if (pathName.startsWith('/dashboard/landlord') && userRole !== 'LANDLORD') {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }
    if (pathName.startsWith('/dashboard/admin') && userRole !== 'ADMIN') {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }
    return NextResponse.next()

}

export const config = {
    matcher: [
        // '/tenant-dashboard/:path*'
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'
    ]
}