import React, {useEffect} from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GET_COURSES} from "../../queries/queries";
import CourseItem from "./CourseItem";
import AddCourse from "./AddCourse";
import AssignStudentToCourse from "./AssignStudentToCourse";
import {Table, Container} from "reactstrap";
import MessageAlert from "../Partial/MessageAlert";

function CourseList() {
    const { loading, error, data } = useQuery(GET_COURSES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    const displayCourseItems = () => {
        return data.courses.map(courseItem => {
            return <CourseItem key={courseItem.id} courseItem={courseItem}/>
        })
    }

    return (
        <Container>

            <div className="box">
                <h2 className="box-title">Utilities</h2>
                <div className="box-content util-box">
                    <AddCourse/>
                    <AssignStudentToCourse/>
                </div>
            </div>

            <div className="box table-container">
                <h2 className="box-title">Data</h2>
                <div className="box-content">
                    <Table hover>
                        <thead>
                            <th>Name</th>
                            <th>Created Date</th>
                            <th>Utilities</th>
                        </thead>
                        <tbody>
                            {displayCourseItems()}
                        </tbody>
                    </Table>
                </div>
            </div>
            
        </Container>
    )
}

export default CourseList
