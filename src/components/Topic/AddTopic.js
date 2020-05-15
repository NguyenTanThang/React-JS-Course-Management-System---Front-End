/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {ADD_TOPIC, GET_COURSES, GET_TOPICS} from "../../queries/queries";
import {MessageContext} from "../../context/MessageContext";
import MessageAlert from "../Partial/MessageAlert";

const AddTopic = (props) => {
    const {setMessage, setMessageType, setVisible} = useContext(MessageContext);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [title, setTitle] = useState("");
    const [courseID, setCourseID] = useState("");
    const courseQueryObject = useQuery(GET_COURSES);
    let {loading, error} = courseQueryObject;
    let courseData = courseQueryObject.data;
    const [addTopic, { data }] = useMutation(ADD_TOPIC, {
        update(cache, { data: { addTopic } }) {
          const { topics } = cache.readQuery({ query: GET_TOPICS })
          cache.writeQuery({
            query: GET_TOPICS,
            data: { topics: topics.concat([addTopic]) },
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
    await addTopic({ variables: { title, courseID } });
    setTitle("");
    setMessage("Successfully created");
    setMessageType("success");
    setVisible(true);
    setButtonDisabled(false);
    //window.location.reload();
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
      <Button color="dark" onClick={toggle}>Add Topic</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Create New Topic</ModalHeader>
        <ModalBody>
        
            <Form onSubmit={onSubmit}>
                <MessageAlert/>

                <FormGroup>
                    <Label htmlFor="title">Topic Title:</Label>
                    <Input type="text" placeholder="Topic Title" id="title" name="title" required value={title} onChange={e => {
                        setTitle(e.target.value)
                    }}/>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="courseID">Course:</Label>
                    <select className="custom-select" id="courseID" name="courseID" defaultValue={""} value={courseID} onChange={(e) => {
                        setCourseID(e.target.value)
                    }} required>
                        <option disabled value={""}>--Course--</option>
                        {displayCourseOptions()}
                    </select>
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

export default AddTopic;