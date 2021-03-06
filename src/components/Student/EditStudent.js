/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import {UPDATE_STUDENT, GET_STUDENTS} from "../../queries/queries";
import {MessageContext} from "../../context/MessageContext";
import MessageAlert from "../Partial/MessageAlert";

const EditStudent = (props) => {
    const {
        className,
        studentItem
      } = props;

    const {setMessage, setMessageType, setVisible} = useContext(MessageContext);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [name, setName] = useState(studentItem.name);
    const [address, setAddress] = useState(studentItem.address);
    const [phone_number, setPhoneNumber] = useState(studentItem.phone_number);
    const [dob, setDob] = useState(studentItem.dob);
    const [coursesIDs, setCoursesIDs] = useState(studentItem.coursesIDs);
    const [updateStudent, { data }] = useMutation(UPDATE_STUDENT, {
        update(cache, { data: { updateStudent } }) {
          const { students } = cache.readQuery({ query: GET_STUDENTS })
          cache.writeQuery({
            query: GET_STUDENTS,
            data: { data: { students: students.map(item => {
                if (item.id == updateStudent.id) {
                    return updateStudent;
                } 
                return item;
            }) }, },
          });
        }
      });

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const onSubmit = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    await updateStudent({ variables: { studentID: studentItem.id, name, address, dob, phone_number, coursesIDs } });
    const url = window.location.href;
    if (url.includes("profile")){
      setMessage("Successfully updated. Please reload to take effect");
      setMessageType("success");
      setVisible(true);
    } else {
      setMessage("Successfully updated");
      setMessageType("success");
      setVisible(true);
    }
    setButtonDisabled(false);
  }

  return (
    <div>
      <Button color="warning" onClick={toggle}>Update</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Update Student</ModalHeader>
        <ModalBody>
        
            <Form onSubmit={onSubmit}>

                <MessageAlert/>

                <FormGroup>
                    <Label htmlFor="name">Name:</Label>
                    <Input type="text" placeholder="Name" id="name" name="name" required value={name} onChange={e => {
                        setName(e.target.value)
                    }}/>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="dob">Date of Birth:</Label>
                    <Input type="date" placeholder="DOB" id="dob" name="dob" required value={dob} onChange={e => {
                        setDob(e.target.value)
                    }}/>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="phone_number">Phone Number:</Label>
                    <Input type="tel" placeholder="Phone Number" id="phone_number" name="phone_number" required value={phone_number} onChange={e => {
                        setPhoneNumber(e.target.value)
                    }}/>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="address">Address:</Label>
                    <textarea id="address" name="address" className="form-control" rows="5" placeholder="Address" required value={address} onChange={e => {
                        setAddress(e.target.value)
                    }}>
                    </textarea>
                </FormGroup>

                <FormGroup>
                    <Button color="dark" block type="submit" disabled={buttonDisabled}>Update</Button>
                </FormGroup>

            </Form>

        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EditStudent;