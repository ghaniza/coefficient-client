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

    const response = await fetch(
        `${localStorage.getItem('service-url')}/v1/message/${chatId}`,
        init
    );
    return response.json();
};

export const registerAck = async (chatId: string, files?: any[]) => {
    const init: RequestInit = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access'),
        },
    };

    const response = await fetch(
        `${localStorage.getItem('service-url')}/v1/message/${chatId}/ack`,
        init
    );
    return response.json();
};
