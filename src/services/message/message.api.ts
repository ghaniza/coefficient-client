export const registerMessage = async (
    chatId: string,
    message?: string,
    files?: any[]
) => {
    const init: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access'),
        },
        body: JSON.stringify({ message, files }),
    };

    const url = localStorage.getItem('service-url');
    const response = await fetch(`${url}/v1/message/by-chat/${chatId}`, init);
    return response.json();
};

export const registerAck = async (chatId: string, files?: any[]) => {
    const init: RequestInit = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access'),
        },
    };

    const url = localStorage.getItem('service-url');
    const response = await fetch(
        `${url}/v1/message/by-chat/${chatId}/ack`,
        init
    );
    return response.json();
};

export const messagesByChatIdRequest = async (chatId?: string, cursor = 0) => {
    const init: RequestInit = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access'),
        },
    };

    const url = localStorage.getItem('service-url');
    const response = await fetch(
        `${url}/v1/message/by-chat/${chatId}?cursor=${cursor}`,
        init
    );

    return response.json();
};
