/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import {UPDATE_COURSE, GET_COURSES} from "../../queries/queries";

const EditCourse = (props) => {
    const {courseItem} = props;
    const [name, setName] = useState(courseItem.name);
    const [updateCourse, { data }] = useMutation(UPDATE_COURSE, {
        update(cache, { data: { updateCourse } }) {
          const { courses } = cache.readQuery({ query: GET_COURSES })
          cache.writeQuery({
            query: GET_COURSES,
            data: { courses: courses.map(item => {
                if (item.id == updateCourse.id) {
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
    await updateCourse({ variables: { name, courseID: courseItem.id } });
    setModal(false);
  }

  return (
    <div>
      <Button color="warning" onClick={toggle}>Update</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Update Course</ModalHeader>
        <ModalBody>
        
            <Form onSubmit={onSubmit}>

                <FormGroup>
                    <Label htmlFor="name">Course Name:</Label>
                    <Input type="text" placeholder="Course Name" id="name" name="name" required value={name} onChange={e => {
                        setName(e.target.value)
                    }}/>
                </FormGroup>

                <FormGroup>
                    <Button color="dark" block type="submit">Update</Button>
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