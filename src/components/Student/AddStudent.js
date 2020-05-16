/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import {ADD_STUDENT, GET_STUDENTS} from "../../queries/queries";
import {MessageContext} from "../../context/MessageContext";
import MessageAlert from "../Partial/MessageAlert";

const AddStudent = (props) => {
    const {setMessage, setMessageType, setVisible} = useContext(MessageContext);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [dob, setDob] = useState("");
    const [coursesIDs, setCoursesIDs] = useState([]);
    const [addStudent, { data }] = useMutation(ADD_STUDENT, {
        update(cache, { data: { addStudent } }) {
          const { students } = cache.readQuery({ query: GET_STUDENTS })
          cache.writeQuery({
            query: GET_STUDENTS,
            data: { students: students.concat([addStudent]) },
          });
        }
      });

  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const onSubmit = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    await addStudent({ variables: { name, email, address, password, dob, phone_number, coursesIDs } });
    resetValue();
    setMessage("Successfully created");
    setMessageType("success");
    setVisible(true);
    setButtonDisabled(false);
  }

  const resetValue = () => {
    setName("")
    setEmail("")
    setPassword("")
    setAddress("")
    setPhoneNumber("")
    setDob("")
    setCoursesIDs([])
  }

  return (
    <div>
      <Button color="dark" onClick={toggle}>Add Student</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Create New Student</ModalHeader>
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
                    <Label htmlFor="email">Email:</Label>
                    <Input type="email" placeholder="Email" id="email" name="email" required value={email} onChange={e => {
                        setEmail(e.target.value)
                    }}/>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="password">Password:</Label>
                    <Input type="password" placeholder="Password" id="password" name="password" required value={password} onChange={e => {
                        setPassword(e.target.value)
                    }}/>
                </FormGroup>

                <FormGroup>
                    <Button color="dark" block type="submit" disabled={buttonDisabled}>Create</Button>
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

export default AddStudent;