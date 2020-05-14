/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {useQuery, useMutation} from "@apollo/react-hooks";
import {GET_TRAINERS, GET_TRAINER_BY_ID, DELETE_TRAINER} from "../../queries/queries";

const DeleteTrainer = (props) => {
  const {
    className,
    trainerID
  } = props;
  const trainerData = useQuery(GET_TRAINER_BY_ID, {
      variables: {
        trainerID
      }
  })
  const [deleteTrainer, { data }] = useMutation(DELETE_TRAINER, {
    update(cache, { data: { deleteTrainer } }) {
      const { trainers } = cache.readQuery({ query: GET_TRAINERS })
      cache.writeQuery({
        query: GET_TRAINERS,
        data: { trainers: trainers.filter(item => {
            return item.id !== deleteTrainer.id
        }) },
      });
    }
  });

  const dipslayTopicList = (topics) => {
    if (topics.length === 0){
        return <li key={"LOL"}>No course has been participated by this student</li>
    } else {
        return topics.map(topicItem => {
            return <li key={topicItem.id}>{topicItem.title}</li>
        })
    }
  }

  const displayTrainerDetails = () => {
    const {loading, error, data} = trainerData;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    const {name, topics} = data.getTrainerByID;

    return (
        <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 details-title">
                <p><b>Name:</b></p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 details-data">
                <p>{name}</p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 details-title">
                <p><b>Courses:</b></p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 details-data">
                <ul>
                    {dipslayTopicList(topics)}
                </ul>
            </div>
        </div>
    )
  }

  const onDelete = async () => {
    await deleteTrainer({ variables: { trainerID } })
    setModal(false);
  }

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>Delete</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Delete Student</ModalHeader>
        <ModalBody>
            {displayTrainerDetails()}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onDelete}>Yes</Button>{' '}
          <Button color="secondary" onClick={toggle}>No</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteTrainer;