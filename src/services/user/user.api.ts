export const resetPasswordRequest = async (email: string) => {
    const init: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/reset-password?email=${email}`,
        init
    );

    if (response.status !== 204) return null;

    return { status: 'success' };
};

export const createUserRequest = async (body: Record<string, any>) => {
    const init: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user`,
        init
    );

    if (response.status !== 201) return null;

    return response.json();
};
