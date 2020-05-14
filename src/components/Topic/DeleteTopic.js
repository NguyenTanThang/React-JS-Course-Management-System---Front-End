/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {useQuery, useMutation} from "@apollo/react-hooks";
import {GET_TOPICS, GET_TOPIC_BY_ID, DELETE_TOPIC} from "../../queries/queries";

const DeleteTopic = (props) => {
  const {
    className,
    topicID
  } = props;
  const topicData = useQuery(GET_TOPIC_BY_ID, {
      variables: {
        topicID
      }
  })
  const [deleteTopic, { data }] = useMutation(DELETE_TOPIC, {
    update(cache, { data: { deleteTopic } }) {
      const { topics } = cache.readQuery({ query: GET_TOPICS })
      cache.writeQuery({
        query: GET_TOPICS,
        data: { topics: topics.filter(item => {
            return item.id !== deleteTopic.id
        }) },
      });
    }
  });

    const displayAssignedTrainers = (assigned_trainers) => {
        if (assigned_trainers.length === 0){
            return <li key={"LOL2"}>No trainer has been assigned to this topic</li>
        } else {
            return assigned_trainers.map(trainerItem => {
                return <li key={trainerItem.id}>{trainerItem.name}</li>
            })
        }
    }

  const displayTopicDetails = () => {
    const {loading, error, data} = topicData
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    const {title, course, assigned_trainers} = data.getTopicByID;

    return (
        <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 details-title">
                <p><b>Title:</b></p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 details-data">
                <p>{title}</p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 details-title">
                <p><b>Course:</b></p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 details-data">
                <ul>
                    {course.name}
                </ul>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 details-title">
                <p><b>Assigned Trainers:</b></p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 details-data">
                <ul>
                    {displayAssignedTrainers(assigned_trainers)}
                </ul>
            </div>
        </div>
    )
  }

  const onDelete = async () => {
    await deleteTopic({ variables: { topicID } })
    setModal(false);
  }

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>Delete</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Delete Topic</ModalHeader>
        <ModalBody>
            {displayTopicDetails()}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onDelete}>Yes</Button>{' '}
          <Button color="secondary" onClick={toggle}>No</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteTopic;