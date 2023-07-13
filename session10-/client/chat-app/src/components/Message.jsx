import React, { useContext, useEffect } from "react";
import SendMessage from "./SendMessage";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../auth/AuthContext";

const Message = () => {

  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);
  console.log(chatState.mensaje)

  
  console.log(auth.uid)

  return (
    <>
      <div className="mesgs">
        {/* <!-- Historia inicio --> */}
        <div 
        id="mensajes"
        className="msg_history">


          {
          chatState.mensaje.map((msg) =>
            msg.para === auth.uid ? (
              <IncomingMessage key={msg._id} msg={msg}/>
            ) : (
              <OutgoingMessage key={msg._id} msg={msg}/>
            )
          )}

          {/* <!-- Mensaje recibido Inicio --> */}
          {/* <IncomingMessage/> */}
          {/* <!-- Mensaje recibido Fin --> */}

          {/* <!-- Mensaje enviado inicio --> */}
          {/* <OutgoingMessage/> */}
          {/* <!-- Mensaje enviado inicio --> */}
        </div>
        {/* <!-- Historia Fin --> */}

        {/* <!-- Enviar mensaje Inicio --> */}
        <SendMessage />
        {/* <!-- Enviar mensaje Fin --> */}
      </div>
    </>
  );
};

export default Message;
