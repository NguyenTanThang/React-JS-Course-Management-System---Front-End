/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import {ADD_COURSE, GET_COURSES} from "../../queries/queries";

const AddCourse = (props) => {
  const {
    className
  } = props;
    const [name, setName] = useState("");
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
    await addCourse({ variables: { name } });
    setName("");
  }

  return (
    <div>
      <Button color="dark" onClick={toggle}>Add Course</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Create New Course</ModalHeader>
        <ModalBody>
        
            <Form onSubmit={onSubmit}>

                <FormGroup>
                    <Label htmlFor="name">Course Name:</Label>
                    <Input type="text" placeholder="Course Name" id="name" name="name" required value={name} onChange={e => {
                        setName(e.target.value)
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

export default AddCourse;