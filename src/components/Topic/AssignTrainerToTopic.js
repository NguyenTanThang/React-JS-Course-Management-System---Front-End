/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {GET_COURSES, GET_TOPICS, GET_TRAINERS, ASSIGN_TRAINER_TO_TOPIC, GET_TOPIC_BY_ID} from "../../queries/queries";
import {MessageContext} from "../../context/MessageContext";
import MessageAlert from "../Partial/MessageAlert";

const AssignTrainerToTopic = (props) => {
    const {setMessage, setMessageType, setVisible} = useContext(MessageContext);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const courseData = useQuery(GET_COURSES)
    const trainerData = useQuery(GET_TRAINERS)
    const topicData = useQuery(GET_TOPICS)
    const [assignTrainerToTopic, assignData] = useMutation(ASSIGN_TRAINER_TO_TOPIC, {
        update(cache, { data: { assignTrainerToTopic } }) {
            const { trainers } = cache.readQuery({ query: GET_TRAINERS })
            cache.writeQuery({
              query: GET_TRAINERS,
              data: { students: trainers.map(item => {
                if (item.id === assignTrainerToTopic.id) {
                    return assignTrainerToTopic;
                } 
                return item;
              }) },
            });
          }
    })
    const [courseID, setCourseID] = useState("");
    const [trainerID, setTrainerID] = useState("");
    const [topicID, setTopicID] = useState("");
    
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const displayCourseSelect = () => {
    const { loading, error, data } = courseData;

    if (loading) return <option disabled>Loading...</option>;

    if (error) return <option disabled>{error.message}</option>;

    let currentCourses = data.courses;

    return currentCourses.map(courseItem => {
          return <option value={courseItem.id} key={courseItem.id}>
            {courseItem.name}
          </option>
        })
  }

  const displayTrainerSelect = () => {
    const { loading, error, data } = trainerData;

    if (loading) return <option disabled>Loading...</option>;

    if (error) return <option disabled>{error.message}</option>;

    let currentTrainers = data.trainers;

    return currentTrainers.map(trainerItem => {
          return <option value={trainerItem.id} key={trainerItem.id}>
            {trainerItem.name}
          </option>
        })
  }

  const displayTopicSelect = () => {
    const { loading, error, data } = topicData;

    if (loading || trainerData.loading) return <option disabled>Loading...</option>;

    if (error || trainerData.error) return <option disabled>{error.message}</option>;

    
    let currentTopics = data.topics;
    currentTopics = currentTopics.filter(topicItem => {
        return topicItem.courseID === courseID;
    })

    if (trainerID) {
        let selectedTrainer = trainerData.data.trainers.filter(trainerItem => {
            return trainerItem.id === trainerID;
        })[0];
        currentTopics = currentTopics.filter(topicItem => {
            return !selectedTrainer.topicsIDs.includes(topicItem.id)
        })
    }

    if (currentTopics.length === 0) return <option disabled>There is no topics related to the selected course or this trainer has been assign to all the topics in this course</option>;

    return currentTopics.map(topicItem => {
          return <option value={topicItem.id} key={topicItem.id}>
            {topicItem.title}
          </option>
        })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    await assignTrainerToTopic({variables: {topicID, trainerID}})
    setTrainerID("");
    setCourseID("");
    setTopicID("");
    setMessage("Successfully assigned");
    setMessageType("success");
    setVisible(true);
    setButtonDisabled(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000)
  }

  return (
    <div>
      <Button color="dark" onClick={toggle}>Assign Trainer To Topic</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Assign Trainer To Topic</ModalHeader>
        <ModalBody>
        
            <Form onSubmit={onSubmit}>

            <MessageAlert/>

            <FormGroup>
                <Label htmlFor="trainerID">Trainer:</Label>
                <select className="custom-select" id="trainerID" name="trainerID" required defaultValue={""} value={trainerID} onChange={(e) => {
                setTrainerID(e.target.value)
                }}>
                <option value={""} disabled>--Trainer--</option>
                {displayTrainerSelect()}
                </select>
            </FormGroup>

                <FormGroup>
                    <Label htmlFor="courseID">Course:</Label>
                    <select required className="custom-select" id="courseID" name="courseID" defaultValue={""} value={courseID} onChange={(e) => {
                      setCourseID(e.target.value)
                    }}>
                      <option value={""} disabled>--Course--</option>
                    {displayCourseSelect()}
                    </select>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="topicID">Topic:</Label>
                    <select required className="custom-select" id="topicID" name="topicID" defaultValue={""} value={topicID} onChange={(e) => {
                      setTopicID(e.target.value)
                    }}>
                      <option value={""} disabled>--Topic--</option>
                    {displayTopicSelect()}
                    </select>
                </FormGroup>

                <FormGroup>
                    <Button color="dark" block type="submit" disabled={buttonDisabled}>Assign</Button>
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

export default AssignTrainerToTopic;