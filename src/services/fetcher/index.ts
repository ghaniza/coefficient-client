type FetcherOptions = {
    withAuthorization?: boolean;
};

const fetcher = (options?: FetcherOptions) => {
    return async (path: string) => {
        const init: RequestInit = {};

        if (options?.withAuthorization) {
            init.headers = {
                ...init.headers,
                Authorization: 'Bearer ' + localStorage.getItem('access'),
            };
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
            init
        );
        if (!response.ok) throw new Error('Failed to fetch');

        return await response.json();
    };
};

export default fetcher;
