/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import {ADD_TRAINER, GET_TRAINERS} from "../../queries/queries";

const AddTrainer = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [dob, setDob] = useState("");
    const [profession, setProfession] = useState("");
    const [topicsIDs, setTopicsIDs] = useState([]);
    const [addTrainer, { data }] = useMutation(ADD_TRAINER, {
        update(cache, { data: { addTrainer } }) {
          const { trainers } = cache.readQuery({ query: GET_TRAINERS })
          cache.writeQuery({
            query: GET_TRAINERS,
            data: { trainers: trainers.concat([addTrainer]) },
          });
        }
      });

  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const onSubmit = (e) => {
    e.preventDefault();
    addTrainer({ variables: { name, email, address, password, dob, phone_number, topicsIDs, profession } });
    resetValue();
    setModal(false);
  }

  const resetValue = () => {
    setName("")
    setEmail("")
    setPassword("")
    setProfession("")
    setAddress("")
    setPhoneNumber("")
    setDob("")
    setTopicsIDs([])
  }

  return (
    <div>
      <Button color="dark" onClick={toggle}>Add Trainer</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Create New Trainer</ModalHeader>
        <ModalBody>
        
            <Form onSubmit={onSubmit}>

                <FormGroup>
                    <Label htmlFor="name">Name:</Label>
                    <Input type="text" placeholder="Name" id="name" name="name" required value={name} onChange={e => {
                        setName(e.target.value)
                    }}/>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="profession">Profession:</Label>
                    <Input type="text" placeholder="Profession" id="profession" name="profession" required value={profession} onChange={e => {
                        setProfession(e.target.value)
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
                    <textarea id="address" name="address" className="form-control" rows="5" placeholder="Address" value={address} onChange={e => {
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
                    <Button color="dark" block type="submit">Create</Button>
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

export default AddTrainer;