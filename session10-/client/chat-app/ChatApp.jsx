import React from 'react'
import AppRouter from './src/router/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './src/auth/AuthContext'
import { SocketProvider } from './src/context/SocketContext'
import { ChatProvider } from './src/context/chat/ChatContext'

import moment from 'moment'

import 'moment/locale/es';
moment.locale('es')

const ChatApp = () => {
  return (
     <ChatProvider>
      <AuthProvider>
        <SocketProvider>
            <BrowserRouter>
              <AppRouter/>
              
            </BrowserRouter>
        </SocketProvider>
    </AuthProvider>
  </ChatProvider>
  )
}

export default ChatApp