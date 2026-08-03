"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getAllCategories = async () => {
    
   
   

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
        method: "GET",
        headers: {
            // Authorization : accessToken as unknown as string,
            // Authorization : `${accessToken}`,
            // Authorization : `Bearer ${accessToken}`

            "Content-Type": "application/json",
            
        }
    });

    const result = await res.json();

    if (result.success && result.data.paymentURL) {
        redirect(result.data.paymentURL)
    }

    return result

}