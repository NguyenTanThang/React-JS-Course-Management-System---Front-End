/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {useQuery, useMutation} from "@apollo/react-hooks";
import {GET_COURSE_BY_ID, GET_COURSES, DELETE_COURSE} from "../../queries/queries";

const DeleteCourse = (props) => {
  const {
    className,
    courseID
  } = props;
  const courseData = useQuery(GET_COURSE_BY_ID, {
      variables: {
        courseID
      }
  })
  const [deleteCourse, { data }] = useMutation(DELETE_COURSE, {
    update(cache, { data: { deleteCourse } }) {
      const { courses } = cache.readQuery({ query: GET_COURSES })
      cache.writeQuery({
        query: GET_COURSES,
        data: { courses: courses.filter(item => {
            return item.id !== deleteCourse.id
        }) },
      });
    }
  });

  const dipslayTopicList  = (topics) => {
    if (topics.length === 0){
        return <li key={"LOL"}>No topic has assigned to this course</li>
    } else {
        return topics.map(topicItem => {
            return <li key={topicItem.id}>{topicItem.title}</li>
        })
    }
}

    const displayParticipatedStudents = (participated_students) => {
        if (participated_students.length === 0){
            return <li key={"LOL2"}>No student has participated in this course</li>
        } else {
            return participated_students.map(studentItem => {
                return <li key={studentItem.id}>{studentItem.name}</li>
            })
        }
    }

  const displayCourseDetails = () => {
    const {loading, error, data} = courseData
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    const {name, topics, participated_students} = data.getCourseByID;

    return (
        <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 details-title">
                <p><b>Name:</b></p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 details-data">
                <p>{name}</p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 details-title">
                <p><b>Topics:</b></p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 details-data">
                <ul>
                    {dipslayTopicList(topics)}
                </ul>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 details-title">
                <p><b>Participated Students:</b></p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 details-data">
                <ul>
                    {displayParticipatedStudents(participated_students)}
                </ul>
            </div>
        </div>
    )
  }

  const onDelete = async () => {
    await deleteCourse({ variables: { courseID } })
    setModal(false);
  }

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>Delete</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Delete Course</ModalHeader>
        <ModalBody>
            {displayCourseDetails()}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onDelete}>Yes</Button>{' '}
          <Button color="secondary" onClick={toggle}>No</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteCourse;