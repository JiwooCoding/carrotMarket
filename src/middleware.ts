import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export {default} from 'next-auth/middleware';

export async function middleware(req:NextRequest) {
    const session = await getToken({req, secret: process.env.JWT_SECRET})
    //console.log('session', session)
    //console.log('req.nextUrl.pathname', req.nextUrl.pathname);
    const pathname = req.nextUrl.pathname;

    //로그인된 유저만 접근 가능
    // '/user'로 시작된 경로이고 session이 없다면 (로그인이 되어있지 않은 사람)
    if(pathname.startsWith('/user') && !session){
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    //admin 유저만 접근 가능
    if(pathname.startsWith('/admin') && (session?.role !== 'Admin')){
        return NextResponse.redirect(new URL('/', req.url));
    }

    //로그인된 유저는 로그인, 회원가입 페이지에 접근 X
    if(pathname.startsWith('/auth') && session){
        return NextResponse.redirect(new URL('/', req.url));
    }
    //모든 if문에 해당하지 않는 경우 그냥 다음으로 통과 
    return NextResponse.next();
}

//export const config = {matcher:["/admin/:path*", "/user"]}