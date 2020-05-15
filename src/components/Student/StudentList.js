import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GET_STUDENTS, GET_COURSES} from "../../queries/queries";
import StudentItem from "./StudentItem";
import AddStudent from "./AddStudent";
import {Table, Container, Form, Label, Input, FormGroup, Button} from "reactstrap";
import paginate from "../../utils/paginate";
import {studentSearchLogic, paginateLogic} from "../../utils/searchLogic";
import PaginationComponent from "../Partial/Pagination";

function StudentListSearchEngine(props) {
    const courseData = useQuery(GET_COURSES);
    const {searchedName, setSearchedName, searchedCourseID, setSearchedCourseID} = props;

    const displayCourseOptions = (e) => {
        const {loading, error, data} = courseData;
        if (loading) {
            return <option>Loading</option>
        } else if (error) {
            return <option>Error</option>
        } else {
            return data.courses.map(item => {
                return <option key={item.id} value={item.id}>{item.name}</option>
            })
        }
      }

      const resetValue = () => {
        setSearchedName("");
        setSearchedCourseID("");
      }

    return (
            <div className="box">
                <h2 className="box-title">Search</h2>
                <div className="box-content">
                    <Form onSubmit={(e) => e.preventDefault()}>

                        <FormGroup>
                            <Label htmlFor="searched-name">Student Name</Label>
                            <Input type="text" id="searched-name" name="searched-name" value={searchedName} onChange={(e) => {
                                setSearchedName(e.target.value)
                            }}/>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="searchedCourseID">Participated Course:</Label>
                            <select className="custom-select" id="searchedCourseID" name="searchedCourseID" defaultValue={""} value={searchedCourseID} onChange={(e) => {
                                setSearchedCourseID(e.target.value)
                            }} required>
                                <option disabled value={""}>--Course--</option>
                                {displayCourseOptions()}
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <Button color="info" block onClick={resetValue}>Reset</Button>
                        </FormGroup>

                    </Form>
                </div>
            </div>
    )
}

function StudentList() {
    const { loading, error, data } = useQuery(GET_STUDENTS);
    const [searchedName, setSearchedName] = useState("");
    const [searchedCourseID, setSearchedCourseID] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
    let studentList = data.students;

    const pageObject = paginate(studentList.length, currentPage, 6, 5)

    const displayStudentItems = () => {
        studentList = studentSearchLogic(studentList, {searchedName, searchedCourseID})
        studentList = paginateLogic(studentList, pageObject)
        return studentList.map(studentItem => {
            return <StudentItem key={studentItem.id} studentItem={studentItem}/>
        })
    }

    return (
        <Container>

            <div className="box">
                <h2 className="box-title">Utilities</h2>
                <div className="box-content">
                    <AddStudent/>
                </div>
            </div>

            <StudentListSearchEngine searchedName={searchedName} setSearchedName={setSearchedName} searchedCourseID={searchedCourseID} setSearchedCourseID={setSearchedCourseID}/>

            <div className="box table-container">
                <h2 className="box-title">Data</h2>
                <div className="box-content">

                    <Table hover>
                        <thead>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            {/*<th>Created Date</th>*/}
                            <th>Utilities</th>
                        </thead>
                        <tbody>
                            {displayStudentItems()}
                        </tbody>
                    </Table>

                    <PaginationComponent pageObject={pageObject} setCurrentPage={setCurrentPage}/>

                </div>
            </div>
            
        </Container>
    )
}

export default StudentList
