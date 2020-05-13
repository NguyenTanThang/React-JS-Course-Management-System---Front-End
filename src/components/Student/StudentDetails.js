import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GET_STUDENT_BY_ID, GET_STUDENTS} from "../../queries/queries";
import { Container } from 'reactstrap';
import EditStudent from "./EditStudent";
import {dateParserWithMonth_ISODate, dateParserWithMonth} from "../../utils/dateParser";
import {Link} from "react-router-dom";

function StudentDetails(props) {
    const studentID = props.match.params.studentID;
    const studentData = useQuery(GET_STUDENTS);
    const { loading, error, data } = useQuery(GET_STUDENT_BY_ID, {
        variables: {studentID}
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    const studentItem = data.getStudentByID;
    const {name, created_date, dob, address, phone_number, courses, user} = studentItem;

    const dipslayCourseList = () => {
        if (courses.length === 0){
            return <li key={"LOL"}>No course has been participated by this student</li>
        } else {
            return courses.map(courseItem => {
                return <li key={courseItem.id}><Link to={`/courses/${courseItem.id}`}>{courseItem.name}</Link></li>
            })
        }
    }
    
    return (
        <Container>
            
            <div className="box">
                <h2 className="box-title">Utilities</h2>
                <div className="box-content util-box">
                    {/*<EditStudent studentItem={studentItem}/>*/}
                    <Link to="/students" className="btn btn-dark">Back To List</Link>
                </div>
            </div>
                <div className="box">
                    <h2 className="box-title">Data</h2>
                    <div className="box-content">
                    <div className="row">

                        <div className="col-lg-3 col-md-6 col-sm-6 details-title">
                            <p><b>Name:</b></p>
                        </div>
                        <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                            <p>{name}</p>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 details-title">
                            <p><b>Date of Birth:</b></p>
                        </div>
                        <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                            <p>{dateParserWithMonth_ISODate(dob)}</p>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 details-title">
                            <p><b>Address:</b></p>
                        </div>
                        <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                            <p>{address}</p>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 details-title">
                            <p><b>Phone Number:</b></p>
                        </div>
                        <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                            <p>{phone_number}</p>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 details-title">
                            <p><b>Email:</b></p>
                        </div>
                        <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                            <p><a href={`mailto:${user.email}`}>{user.email}</a></p>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 details-title">
                            <p><b>Created Date:</b></p>
                        </div>
                        <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                            <p>{dateParserWithMonth(created_date)}</p>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 details-title">
                            <p><b>Participated Courses:</b></p>
                        </div>
                        <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                            <ul>
                                {dipslayCourseList()}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

        </Container>
    )
}

export default StudentDetails
