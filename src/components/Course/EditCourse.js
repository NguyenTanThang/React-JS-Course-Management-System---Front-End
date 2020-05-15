/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import {UPDATE_COURSE, GET_COURSES} from "../../queries/queries";
import {MessageContext} from "../../context/MessageContext";
import MessageAlert from "../Partial/MessageAlert";

const EditCourse = (props) => {
    const {courseItem} = props;
    const [name, setName] = useState(courseItem.name);
    const {setMessage, setMessageType, setVisible} = useContext(MessageContext);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [updateCourse, { data }] = useMutation(UPDATE_COURSE, {
        update(cache, { data: { updateCourse } }) {
          const { courses } = cache.readQuery({ query: GET_COURSES })
          cache.writeQuery({
            query: GET_COURSES,
            data: { courses: courses.map(item => {
                if (item.id === updateCourse.id) {
                    return updateCourse;
                } 
                return item;
            }) },
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
    await updateCourse({ variables: { name, courseID: courseItem.id } });
    setMessage("Successfully updated");
    setMessageType("success");
    setVisible(true);
    setButtonDisabled(false);
  }

  return (
    <div>
      <Button color="warning" onClick={toggle}>Update</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Update Course</ModalHeader>
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

export default EditCourse;