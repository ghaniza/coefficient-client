import { io } from "socket.io-client";

let socketIo = io(process.env.NEXT_PUBLIC_WS_BASE_URL ?? "", {
    autoConnect: false,
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: 10,
    secure: false,
})

export default socketIo;