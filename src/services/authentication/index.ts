'use client';

export const authenticate = async (
    username: string,
    password: string,
    scopes = ['*']
) => {
    const init: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, scopes }),
    };

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/login`,
        init
    );

    if (response.status !== 201) return null;

    return await response.json();
};

export const logoff = async (url?: string, token?: string) => {
    const init: RequestInit = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };
    await fetch(`${url}/v1/auth/logoff`, init);
};
