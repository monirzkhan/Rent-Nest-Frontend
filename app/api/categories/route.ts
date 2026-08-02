import { NextResponse } from 'next/server';

export async function GET() {
    const baseUrl = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://rentnest-seven.vercel.app';

    try {
        const response = await fetch(`${baseUrl}/api/categories`, {
            cache: 'no-store',
            headers: {
                Accept: 'application/json',
            },
        });

        const result = await response.json();

        return NextResponse.json(result, { status: response.status });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error?.message || 'Failed to load categories',
            },
            { status: 500 }
        );
    }
}
