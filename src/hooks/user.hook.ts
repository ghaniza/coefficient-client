import useSWR from 'swr';
import fetcher from '@/services/fetcher';

export type UserDTO = {
    id: string;
    name: string;
    email: string;
    online: boolean;
    lastOnline: Date;
};

export const useUser = () => {
    const { data, mutate, isLoading, error } = useSWR<UserDTO>(
        '/v1/user',
        fetcher({ withAuthorization: true })
    );

    return {
        user: data,
        revalidate: mutate,
        isLoading,
        error,
    };
};
