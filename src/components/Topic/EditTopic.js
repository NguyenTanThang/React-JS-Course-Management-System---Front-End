/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {UPDATE_TOPIC, GET_COURSES, GET_TOPICS} from "../../queries/queries";

const EditTopic = (props) => {
    const {topicItem} = props
    const [title, setTitle] = useState(topicItem.title);
    const [courseID, setCourseID] = useState(topicItem.courseID);
    const courseQueryObject = useQuery(GET_COURSES);
    let {loading, error} = courseQueryObject;
    let courseData = courseQueryObject.data;
    const [updateTopic, { data }] = useMutation(UPDATE_TOPIC, {
        update(cache, { data: { updateTopic } }) {
          const { topics } = cache.readQuery({ query: GET_TOPICS })
          cache.writeQuery({
            query: GET_TOPICS,
            data: { topics: topics.map(item => {
                if (item.id == updateTopic.id) {
                    return updateTopic;
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

  const onSubmit = (e) => {
    e.preventDefault();
    updateTopic({ variables: { topicID: topicItem.id, title, courseID } });
    setModal(false);
  }

  const displayCourseOptions = (e) => {
    if (loading) {
        return <option>Loading</option>
    } else if (error) {
        return <option>Error</option>
    } else {
        return courseData.courses.map(item => {
            return <option value={item.id}>{item.name}</option>
        })
    }
  }

  return (
    <div>
      <Button color="warning" onClick={toggle}>Update</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Update Topic</ModalHeader>
        <ModalBody>
        
            <Form onSubmit={onSubmit}>

                <FormGroup>
                    <Label htmlFor="title">Topic Title:</Label>
                    <Input type="text" placeholder="Topic Title" id="title" name="title" required value={title} onChange={e => {
                        setTitle(e.target.value)
                    }}/>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="courseID">Course:</Label>
                    <select className="custom-select" id="courseID" name="courseID" defaultValue={courseID} value={courseID} onChange={(e) => {
                        setCourseID(e.target.value)
                    }} required>
                        <option disabled value={""}>--Course--</option>
                        {displayCourseOptions()}
                    </select>
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

export default EditTopic;