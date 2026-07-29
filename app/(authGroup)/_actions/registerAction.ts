'use server'
type LoginState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: string
}
export const registerAction = async (loginState: LoginState, formData: FormData) => {


    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const profilePhoto = formData.get('profilePhoto')
    const bio = formData.get('bio')
    const payload = {
        name, email, password, profilePhoto,bio
    }

    console.log(payload);
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)

    })

    const result = await res.json()
    // console.log(result);
    return result
}