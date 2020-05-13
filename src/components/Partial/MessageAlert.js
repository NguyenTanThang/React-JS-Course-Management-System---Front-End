import React, {useState} from 'react';
import { UncontrolledAlert } from 'reactstrap';

const MessageAlert = (props) => {
    const message = props.message;
    const messageType = props.messageType;

    if (!message) return <></>

  return (
    <UncontrolledAlert color={messageType}>
      {message}
    </UncontrolledAlert >
  );
}

export default MessageAlert;