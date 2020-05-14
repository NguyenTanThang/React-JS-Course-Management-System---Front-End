/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {useQuery, useMutation} from "@apollo/react-hooks";
import {GET_STUDENTS, GET_STUDENT_BY_ID, DELETE_STUDENT} from "../../queries/queries";

const DeleteStudent = (props) => {
  const {
    className,
    studentID
  } = props;
  const studentData = useQuery(GET_STUDENT_BY_ID, {
      variables: {
        studentID
      }
  })
  const [deleteStudent, { data }] = useMutation(DELETE_STUDENT, {
    update(cache, { data: { deleteStudent } }) {
      const { students } = cache.readQuery({ query: GET_STUDENTS })
      cache.writeQuery({
        query: GET_STUDENTS,
        data: { students: students.filter(item => {
            return item.id !== deleteStudent.id
        }) },
      });
    }
  });

  const dipslayCourseList = (courses) => {
    if (courses.length === 0){
        return <li key={"LOL"}>No course has been participated by this student</li>
    } else {
        return courses.map(courseItem => {
            return <li key={courseItem.id}>{courseItem.name}</li>
        })
    }
}

  const displayStudentDetails = () => {
    const {loading, error, data} = studentData;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    const {name, courses} = data.getStudentByID;

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
                    {dipslayCourseList(courses)}
                </ul>
            </div>
        </div>
    )
  }

  const onDelete = async () => {
    await deleteStudent({ variables: { studentID } })
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
            {displayStudentDetails()}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onDelete}>Yes</Button>{' '}
          <Button color="secondary" onClick={toggle}>No</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteStudent;