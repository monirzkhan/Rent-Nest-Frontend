'use server'

import { cookies } from "next/headers";

export const getProperty = async ({query } : { query?: { [key: string]: string | string[] | undefined } }) => {

    // Bad Approach
    // const searchTerm = `${search?.searchTerm ? `?searchTerm=${search.searchTerm}` : ""}`;

    const params = new URLSearchParams()

    if(query && query.searchTerm){
        params.set("searchTerm", query.searchTerm as string)
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`, {
      
        cache : "no-cache",
        next : {
            revalidate : 60 * 60 * 6,
            tags : ["property-posts"]
        }
    });

    const result = await res.json();

    return result;
}