import useSWR from "swr";
import fetcher from "@/services/fetcher";

export type UserDTO = {
    id: string;
    name: string;
    email: string;
    online: boolean;
    lastOnline: Date;
}

export const useUser = (userId: string) => {
    const {data, mutate, isLoading, error} = useSWR<UserDTO>(`/v1/user/${userId}`, fetcher);

    return {
        user: data,
        revalidate: mutate,
        isLoading,
        error,
    }
}