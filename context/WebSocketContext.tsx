import React from 'react';
import { io, Socket } from 'socket.io-client';

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!)

export const WebSocketContext = React.createContext<Socket>(socket)

export const WebSocketProvider = WebSocketContext.Provider