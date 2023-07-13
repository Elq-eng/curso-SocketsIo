import React, { useContext } from 'react'
import SidebarChatItem from './SidebarChatItem'
import { ChatContext } from '../context/chat/ChatContext';
import { AuthContext } from '../auth/AuthContext';

const Sidebar = () => {

  const chat = [1,2,3,4,5,6,7,8]
  const { chatState } = useContext( ChatContext );
  const { auth } = useContext( AuthContext );

  const { uid  } = auth




  return (
    <>
     <div className="inbox_chat">
          {/* <!-- conversación activa inicio --> */}
          
          {
            chatState.usuarios?.filter( user => user.uid !== uid ).map( ( usuario )=> (

              <SidebarChatItem 
              key={ usuario.uid }
              usuario={ usuario }
              />
             ))
          }
          {/* <!-- conversación activa Fin --> */}

          {/* <!-- conversación inactiva inicio --> */}
          
          {/* <!-- conversación inactiva inicio -->


    <!-- Espacio extra para scroll --> */}
          <div className="extra_space"></div>
        </div>
    </>
  )
}

export default Sidebar