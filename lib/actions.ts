'use server';
import { NextRequest, NextResponse } from 'next/server';

export async function Register(req: NextRequest) {
    const body = await req.json();
    console.log(body);
    if (body.username === 'admin' && body.password === 'admin') {
        return NextResponse.redirect('/signin');
    }
}
