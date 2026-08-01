"use server"

import { cookies } from "next/headers";

const reviewAction = async (prevState: any, formData: FormData) => {
    const propertyId = formData.get("propertyId") as string;
    const rating = Number(formData.get("rating"));
    const comment = formData.get("review") as string;

    if (!rating || !comment || !propertyId) {
        return {
            success: false,
            message: "Missing required fields"
        }
    }
     const accessToken = (await cookies()).get("accessToken")?.value;
    const payload = {
        rating,
        comment,
        propertyId
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
        body: JSON.stringify(payload),
    });

    const result = await res.json();

    return result;
}

export default reviewAction;