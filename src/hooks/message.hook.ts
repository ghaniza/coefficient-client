import useSWR from 'swr';
import fetcher from '@/services/fetcher';
import { ChatDTO } from '@/hooks/chat.hook';
import { UserDTO } from '@/hooks/user.hook';

export type MessageDTO = {
    id: string;
    content: string;
    from: UserDTO;
    chat: ChatDTO;
    timestamp: Date;
    fromId?: string;
    chatId?: string;
};

export const useMessages = (chatId?: string) => {
    const { data, isLoading, mutate, error } = useSWR<MessageDTO[]>(
        `/v1/message/by-chat/${chatId}`,
        fetcher({ withAuthorization: true })
    );

    return {
        messages: data ?? [],
        revalidate: mutate,
        isLoading,
        error,
    };
};
