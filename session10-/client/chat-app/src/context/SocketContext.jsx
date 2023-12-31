import React, { useContext, useEffect } from 'react'
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from './chat/ChatContext';
import { types } from '../types/types';
import { scrollToBottom, scrollToBottomAnimated } from '../helpers/scrollToBotton';

export const SocketContext = createContext()

export const SocketProvider = ({children}) => {

  const { socket, online, conectarSocket,desconectarSocket } = useSocket('http://localhost:8080')
  const { auth } = useContext( AuthContext )
  const { dispatch } = useContext( ChatContext)

  useEffect(() => {
    if( auth.logged ){
      conectarSocket()
    }
  
  }, [ auth ]);
  useEffect(() => {
    if( !auth.logged ){
      desconectarSocket()
    } 
  
  }, [ auth ]);


  // mostrat todos los usuarios 
  useEffect(() => {
  
    socket?.on('lista-usuarios', ( usuarios )=>{

      dispatch({
        type: types.usuariosCargados,
        payload: usuarios
      })

    })
  }, [socket, dispatch]);

  useEffect(()=>{
    socket?.on('mensaje-personal',( mensaje )=>{
      dispatch({
        type: types.nuevoMensaje, 
        payload: mensaje 
      })

    })


    scrollToBottomAnimated('mensajes')


  },[ socket, dispatch ])



  return (
    <SocketContext.Provider value={{ socket,online }}>
      { children }
    </SocketContext.Provider>
  )
}
