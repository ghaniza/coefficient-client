export const resetPasswordRequest = async (url: string, email: string) => {
    const init: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(
        `${url}/v1/user/reset-password?email=${email}`,
        init
    );

    if (response.status !== 204) return null;

    return { status: 'success' };
};

export const createUserRequest = async (body: Record<string, any>) => {
    const { url, ...userParams } = body;
    const init: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userParams),
    };

    const response = await fetch(`${url}/v1/user`, init);

    if (response.status !== 201) return null;

    return response.json();
};
