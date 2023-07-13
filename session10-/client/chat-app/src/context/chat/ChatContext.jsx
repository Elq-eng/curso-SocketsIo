import React,{ createContext, useReducer  } from "react";
import { chatReducer } from "./chatReducer";

export const ChatContext = createContext()

export const ChatProvider = ({ children }) =>{


  const initialState = {
    uid:'',
    chatActivo:'',
    usuario:[],
    mensajes:[]

  }


  const [ chatState, dispatch] = useReducer( chatReducer, initialState)


  return (
    <ChatContext.Provider value ={{ chatState, dispatch}}> { children } </ChatContext.Provider> 
  )
}