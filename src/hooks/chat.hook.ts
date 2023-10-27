import useSWR from 'swr';
import fetcher from '@/services/fetcher';
import { UserDTO } from '@/hooks/user.hook';
import { MessageDTO } from '@/hooks/message.hook';

export type ChatDTO = {
    id: string;
    messages: MessageDTO[];
    participants: UserDTO[];
};

export type ChatDataDTO = {
    id: string;
    participants: UserDTO[];
    lastMessage: MessageDTO;
    unreadMessageCount: number;
};

export const useChat = (unreadOnly = false) => {
    const { data, isLoading, mutate, error } = useSWR<ChatDataDTO[]>(
        `/v1/chat${unreadOnly ? '?unread=true' : ''}`,
        fetcher({ withAuthorization: true })
    );

    return {
        chats: data ?? [],
        isLoading,
        revalidate: mutate,
        error,
    };
};
