"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getAllCategories = async () => {
    
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
        // throw new Error("User Not Logged In!");

        return {
            success: false,
            message: "User not logged in!"
        }
    }
   

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
        method: "GET",
        headers: {
            // Authorization : accessToken as unknown as string,
            // Authorization : `${accessToken}`,
            // Authorization : `Bearer ${accessToken}`

            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken}`
        }
    });

    const result = await res.json();

    if (result.success && result.data.paymentURL) {
        redirect(result.data.paymentURL)
    }

    return result

}