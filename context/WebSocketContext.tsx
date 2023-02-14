import React from 'react';
import { io, Socket } from 'socket.io-client';

export const socket = io('https://coinlivre.blocklize.io/')

export const WebSocketContext = React.createContext<Socket>(socket)

export const WebSocketProvider = WebSocketContext.Provider