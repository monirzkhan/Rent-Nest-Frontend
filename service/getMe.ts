"use server"

import { cookies } from "next/headers"

export const getMe = async () => {
    const cookieStore = await cookies()

    const accessToken = cookieStore.get('accessToken')?.value || null;
    // console.log(accessToken,'My Token');

    if (!accessToken) {
        return {
            success: false,
            message: "User Not Logged In"
        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
        headers: {
            // Authorization : accessToken as unknown as string,
            // Authorization : `${accessToken}`,
            // Authorization : `Bearer ${accessToken}`
            Cookie: `accessToken=${accessToken}`
        },
        cache: 'force-cache',
        next: {
            revalidate: 60 * 60 * 24,
            tags: ['my-profile']
        }
    })
    const result = await res.json()
    // console.log(result);
    return result


}