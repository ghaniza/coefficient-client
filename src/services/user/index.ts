export const registerMessage = async (chatId: string, fromId?: string, message?: string, files?: any[]) => {
    const init: RequestInit = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, files, fromId })
    }

    const response = await fetch(`http://localhost:3000/v1/message/${chatId}`, init);
    return response.json();
}