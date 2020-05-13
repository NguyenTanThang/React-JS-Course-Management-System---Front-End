import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GET_STUDENTS} from "../../queries/queries";
import StudentItem from "./StudentItem";
import AddStudent from "./AddStudent";
import {Table, Container} from "reactstrap";

function StudentList() {
    const { loading, error, data } = useQuery(GET_STUDENTS)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    const displayStudentItems = () => {
        return data.students.map(studentItem => {
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
                </div>
            </div>
            
        </Container>
    )
}

export default StudentList
