import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GET_COURSE_BY_ID, GET_COURSES, GET_USER_BY_ID} from "../../queries/queries";
import { Container } from 'reactstrap';
import EditCourse from "./EditCourse";
import {dateParserWithMonth} from "../../utils/dateParser";
import {Link} from "react-router-dom";

function CourseDetails(props) {
    const courseID = props.match.params.courseID;
    const userID = localStorage.getItem("userID");
    const courseData = useQuery(GET_COURSES);
    const userData = useQuery(GET_USER_BY_ID, {
        variables: {userID}
    });
    const { loading, error, data } = useQuery(GET_COURSE_BY_ID, {
        variables: {courseID},
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    const courseItem = data.getCourseByID;
    const {name, created_date, topics, participated_students} = courseItem;
    let assignedTrainers = [];

    const dipslayTopicList  = () => {
        if (topics.length === 0){
            return <li key={"LOL"}>No topic has assigned to this course</li>
        } else {
            return topics.map(topicItem => {
                return <li key={topicItem.id}><Link to={`/topics/${topicItem.id}`}>{topicItem.title}</Link></li>
            })
        }
    }
    
    const displayAssignedTrainers = () => {
        topics.forEach(topicItem => {
            const {assigned_trainers} = topicItem;
            assigned_trainers.forEach(trainerItem => {
                if (!assignedTrainers.includes(trainerItem.name)){
                    assignedTrainers.push(trainerItem.name);
                }
            })
        });
        if (assignedTrainers.length === 0){
            return <li key={"LOL1"}>No trainer has been assigned</li>
        } else {
            return assignedTrainers.map((trainerItem, index) => {
                return <li key={`${name}-${index}`}>{trainerItem}</li>
            })
        }
    }

    const displayParticipatedStudents = () => {
        console.log(participated_students)
        if (participated_students.length === 0){
            return <li key={"LOL2"}>No student has participated in this course</li>
        } else {
            return participated_students.map(studentItem => {
                return <li key={studentItem.id}>{studentItem.name}</li>
            })
        }
    }

    const displayUtilBox = () => {
        const {role} = userData.data.getUserByID;
        if (userData.loading) return <p>Loading...</p>;
        if (userData.error) return <p>{userData.error.message}</p>;
        if (role === "Admin"){
            return (
                <div className="box">
                <h2 className="box-title">Utilities</h2>
                <div className="box-content util-box">
                    {/*<EditCourse courseItem={courseItem}/>*/}
                    <Link to="/courses" className="btn btn-dark">Back To List</Link>
                </div>
            </div>
            )
        } else {
            return "";
        }
    }

    return (
        <Container>
            
                {displayUtilBox()}

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
                            <p><b>Created Date:</b></p>
                        </div>
                        <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                            <p>{dateParserWithMonth(created_date)}</p>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 details-title">
                            <p><b>Topics:</b></p>
                        </div>
                        <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                            <ul>
                                {dipslayTopicList()}
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 details-title">
                            <p><b>Assigned Trainers:</b></p>
                        </div>
                        <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                            <ul>
                                {displayAssignedTrainers()}
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 details-title">
                            <p><b>Participated Students:</b></p>
                        </div>
                        <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                            <ul>
                                {displayParticipatedStudents()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </Container>
    )
}

export default CourseDetails
