import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GET_COURSES} from "../../queries/queries";
import CourseItem from "./CourseItem";
import AddCourse from "./AddCourse";
import AssignStudentToCourse from "./AssignStudentToCourse";
import {Table, Container, Form, Label, Input, FormGroup, Button} from "reactstrap";
import {courseSearchLogic, paginateLogic} from "../../utils/searchLogic";
import paginate from "../../utils/paginate";
import PaginationComponent from "../Partial/Pagination";

function CourseListSearchEngine(props) {

    const {searchedName, setSearchedName} = props;

    const resetValue = () => {
        setSearchedName("");
    }

    return (
            <div className="box">
                <h2 className="box-title">Search</h2>
                <div className="box-content">
                    <Form onSubmit={(e) => e.preventDefault()}>

                        <FormGroup>
                            <Label htmlFor="searched-name">Course Name</Label>
                            <Input type="text" id="searched-name" name="searched-name" value={searchedName} onChange={(e) => {
                                setSearchedName(e.target.value)
                            }}/>
                        </FormGroup>

                        <FormGroup>
                            <Button color="info" block onClick={resetValue}>Reset</Button>
                        </FormGroup>

                    </Form>
                </div>
            </div>
    )
}

function CourseList() {
    const { loading, error, data } = useQuery(GET_COURSES);
    const [searchedName, setSearchedName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
    let courseList = data.courses;

    const pageObject = paginate(courseList.length, currentPage, 6, 5)

    const displayCourseItems = () => {
        courseList = courseSearchLogic(courseList, {searchedName})
        courseList = paginateLogic(courseList, pageObject)
        return courseList.map(courseItem => {
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

            <CourseListSearchEngine searchedName={searchedName} setSearchedName={setSearchedName}/>

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

                    <PaginationComponent pageObject={pageObject} setCurrentPage={setCurrentPage}/>

                </div>
            </div>
            
        </Container>
    )
}

export default CourseList
