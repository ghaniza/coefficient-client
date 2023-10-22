import useSWR from "swr";
import fetcher from "@/services/fetcher";
import { UserDTO } from "@/hooks/user.hook";
import {FileDTO, VoiceClipDTO} from "@/components/message";

export type ChatDTO = {
    id: string;
    messages: MessageDTO[];
    participants: UserDTO[];
}

export type MessageDTO = {
    id: string;
    content: string;
    from: UserDTO;
    chat: ChatDTO;
    timestamp: Date;
    fromId?: string;
    chatId?: string;
}

export type ChatDataDTO = {
    participants: UserDTO[];
    lastMessage: MessageDTO;
    unreadMessageCount: number;
};

export const useMessages = (chatId: string) => {
    const { data, isLoading, mutate, error } = useSWR<ChatDTO>(`/v1/chat/${chatId}`, fetcher);

    return {
        messages: data?.messages ?? [],
        revalidate: mutate,
        isLoading,
        error,
    }
}

export const useChat = () => {
    const { data, isLoading, mutate, error } = useSWR<ChatDataDTO[]>('/v1/chat', fetcher);

    return {
        chats: data ?? [],
        isLoading,
        revalidate: mutate,
        error
    }
}