/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {GET_STUDENTS, GET_COURSES, ASSIGN_STUDENT_TO_COURSE} from "../../queries/queries";
import {MessageContext} from "../../context/MessageContext";
import MessageAlert from "../Partial/MessageAlert";

const AssignStudentToCourse = (props) => {
    const courseData = useQuery(GET_COURSES)
    const studentData = useQuery(GET_STUDENTS)
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const {setMessage, setMessageType, setVisible} = useContext(MessageContext);
    const [assignStudentToCourse, assignData] = useMutation(ASSIGN_STUDENT_TO_COURSE, {
      update(cache, { data: { assignStudentToCourse } }) {
        const { students } = cache.readQuery({ query: GET_STUDENTS })
        cache.writeQuery({
          query: GET_STUDENTS,
          data: { students: students.map(item => {
            if (item.id === assignStudentToCourse.id) {
                return assignStudentToCourse;
            } 
            return item;
        }) },
        });
      }
    })
    const [courseID, setCourseID] = useState("");
    const [studentID, setStudentID] = useState("");
    
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const displayCourseSelect = () => {
    const { loading, error, data } = courseData;

    if (loading || studentData.loading) return <option disabled>Loading...</option>;

    if (error || studentData.error) return <option disabled>{error.message}</option>;

    let selectedStudent;
    let currentCourses = data.courses;

    if (studentID){
      selectedStudent = studentData.data.students.filter(studentItem => {
        return studentItem.id === studentID
      })[0];

      currentCourses = currentCourses.filter(courseItem => {
        return !selectedStudent.coursesIDs.includes(courseItem.id)
      })
    }

    if (currentCourses.length === 0){
      return <option disabled key={"LOL3"}>
            No student has been specified or this student has participated in all available courses
          </option> 
    }

    return currentCourses.map(courseItem => {
          return <option value={courseItem.id} key={courseItem.id}>
            {courseItem.name}
          </option>
        })
  }

  const displayStudentSelect = () => {
    const { loading, error, data } = studentData;

    if (loading) return <option disabled>Loading...</option>;

    if (error) return <option disabled>{error.message}</option>;

    let currentStudents = data.students;

    return currentStudents.map(studentItem => {
          return <option value={studentItem.id} key={studentItem.id}>
            {studentItem.name}
          </option>
        })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    await assignStudentToCourse({variables: {courseID, studentID}})
    setCourseID("");
    setStudentID("");
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
      <Button color="dark" onClick={toggle}>Assign Student To Course</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Assign Student To Course</ModalHeader>
        <ModalBody>
        
            <Form onSubmit={onSubmit}>
            <MessageAlert/>

            <FormGroup>
              <Label htmlFor="studentID">Student:</Label>
              <select className="custom-select" id="studentID" name="studentID" defaultValue={""} value={studentID} onChange={(e) => {
                setStudentID(e.target.value)
              }}>
                <option value={""} disabled>--Student--</option>
              {displayStudentSelect()}
              </select>
            </FormGroup>

                <FormGroup>
                    <Label htmlFor="courseID">Course:</Label>
                    <select className="custom-select" id="courseID" name="courseID" defaultValue={""} value={courseID} onChange={(e) => {
                      setCourseID(e.target.value)
                    }}>
                      <option value={""} disabled>--Course--</option>
                    {displayCourseSelect()}
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

export default AssignStudentToCourse;