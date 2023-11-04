import { UserDTO } from '@/hooks/user.hook';

export const createChatRequest = async (users: UserDTO[]) => {
    const init: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access'),
        },
        body: JSON.stringify({ userIds: users.map((user) => user.id) }),
    };

    const url = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${url}/v1/chat`, init);

    if (response.status !== 201) return null;

    return await response.json();
};
