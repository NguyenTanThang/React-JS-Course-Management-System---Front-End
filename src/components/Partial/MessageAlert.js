import React, {useContext} from 'react';
import { UncontrolledAlert, Modal, ModalFooter, ModalBody, ModalHeader, Button } from 'reactstrap';
import {MessageContext} from "../../context/MessageContext";

const MessageAlert = (props) => {
    const {message, messageType, visible, setVisible} = useContext(MessageContext)
    const theMessage = message;

    if (!message) return <></>

    const toggle = () => {
      setVisible(false);
    }

  return (
    <Modal isOpen={visible} toggle={toggle}>
      <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <UncontrolledAlert color={messageType}>
            {theMessage}
          </UncontrolledAlert>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
    </Modal>
  );
}

export default MessageAlert;