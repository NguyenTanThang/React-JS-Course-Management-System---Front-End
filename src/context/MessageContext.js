import React, {createContext, useState} from 'react';

export const MessageContext = createContext();

function MessageContextProvider(props) {
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [visible, setVisible] = useState(false);

    return (
        <MessageContext.Provider value={{message, visible, messageType, setMessage, setMessageType, setVisible}}>
            {props.children}
        </MessageContext.Provider>
    )
}

export default MessageContextProvider
