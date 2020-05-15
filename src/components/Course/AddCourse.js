/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import {ADD_COURSE, GET_COURSES} from "../../queries/queries";
import {MessageContext} from "../../context/MessageContext";
import MessageAlert from "../Partial/MessageAlert";

const AddCourse = (props) => {
    const {
      className
    } = props;
    const {setMessage, setMessageType, setVisible} = useContext(MessageContext);
    const [name, setName] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [addCourse, { data }] = useMutation(ADD_COURSE, {
        update(cache, { data: { addCourse } }) {
          console.log(addCourse);
          const { courses } = cache.readQuery({ query: GET_COURSES })
          cache.writeQuery({
            query: GET_COURSES,
            data: { courses: courses.concat([addCourse]) },
          });
        }
      });

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const onSubmit = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    await addCourse({ variables: { name } });
    setName("");
    setMessage("Successfully created");
    setMessageType("success");
    setVisible(true);
    setButtonDisabled(false);
  }

  return (
    <div>
      <Button color="dark" onClick={toggle}>Add Course</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Create New Course</ModalHeader>
        <ModalBody>
        
            <Form onSubmit={onSubmit}>
                <MessageAlert/>

                <FormGroup>
                    <Label htmlFor="name">Course Name:</Label>
                    <Input type="text" placeholder="Course Name" id="name" name="name" required value={name} onChange={e => {
                        setName(e.target.value)
                    }}/>
                </FormGroup>

                <FormGroup>
                    <Button color="dark" block type="submit"  disabled={buttonDisabled}>Create</Button>
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

export default AddCourse;