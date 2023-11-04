import { io } from 'socket.io-client';

export const makeIO = () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL ?? '';

    (window as any).socketIo = io(url, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 30,
        secure: false,
        extraHeaders: {
            authorization: 'Bearer ' + localStorage.getItem('access'),
        },
    });

    return (window as any).socketIo;
};

export const getIO = () => {
    if (!(window as any).socketIo) return makeIO();
    return (window as any).socketIo;
};
