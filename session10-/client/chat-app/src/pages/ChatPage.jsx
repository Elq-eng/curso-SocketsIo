import React, { useContext } from 'react'
import '../css/chat.css'
import InboxPeople from '../components/InboxPeople'
import Message from '../components/Message'
import ChatSelect from '../components/ChatSelect'
import { ChatContext } from '../context/chat/ChatContext'

const ChatPage = () => {

  const { chatState } = useContext( ChatContext)


  return (
    <>
    
    <div className="messaging">
        <div className="inbox_msg">

            {/* <!-- Inbox people inicio --> */}
            <InboxPeople/>
            {/* <!-- Inbox people Fin --> */}


            {/* <!-- Chat inicio --> */}

            {
              (chatState.chatActivo)
              ?<Message/>
              :<ChatSelect/> 
            }
            
            {/* <Message/> */}
            {/* <!-- Chat Fin --> */}

        </div>


    </div>

    </>
  )
}

export default ChatPage