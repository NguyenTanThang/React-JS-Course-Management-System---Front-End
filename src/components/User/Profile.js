import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GET_USER_BY_ID} from "../../queries/queries";
import {Container} from "reactstrap";
import {Link} from "react-router-dom";
import {dateParserWithMonth_ISODate} from "../../utils/dateParser";
import EditStudent from "../Student/EditStudent";
import EditTrainer from "../Trainer/EditTrainer";

function Profile(props) {
    const userID = localStorage.getItem("userID");
    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
        variables: {userID}
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    const {role, email, student, trainer} = data.getUserByID;

    const displayUpdateButtons = () => {
        if (role === "Admin") {
            return "";
        } else if (role === "Student") {
            return <EditStudent studentItem={student}/>
        } else if (role === "Trainer") {
            return <EditTrainer trainerItem={trainer}/>
        } 
    }

    const displayProfile = () => {
        if (role === "Admin") {
            return (
                <div>
                    
                </div>
            )
        } else if (role === "Student") {
            const {name, dob, address, phone_number, courses} = student
            const courseList = courses.length === 0 ? (
                <ul>
                    <li>
                        Nothing to learn
                    </li>
                </ul>
            ) : (
                <ul>
                    {courses.map(courseItem => {
                    return <li key={courseItem.id} >
                                <Link to={`/courses/${courseItem.id}`}>
                                {courseItem.name}
                                </Link>
                            </li>
                    })}
                </ul>
            )
            return (
                <div>
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
                        <p>{email}</p>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6 details-title">
                        <p><b>Participated Courses:</b></p>
                    </div>
                    <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                        <p>{courseList}</p>
                    </div>

                    </div>               
                </div>
            )
        } else if (role === "Trainer") {
            const {name, dob, address, phone_number, topics, profession} = trainer
            const topicList = topics.length === 0 ? (
                <ul>
                    <li>
                        Nothing to teach
                    </li>
                </ul>
            ) : (
                <ul>
                    {topics.map(topicItem => {
                    return <li key={topicItem.id} >
                                <Link to={`/topics/${topicItem.id}`}>
                                {topicItem.title}
                                </Link>
                            </li>
                    })}
                </ul>
            )
            return (
                <div>
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
                            <p>{email}</p>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 details-title">
                            <p><b>Profession:</b></p>
                        </div>
                        <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                            <p>{profession}</p>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 details-title">
                            <p><b>Assigned Topics:</b></p>
                        </div>
                        <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                            <p>{topicList}</p>
                        </div>

                    </div>               
                </div>
            )
        }
    }

    return (
        <Container>
            <div className="box">
                <h2 className="box-title">Profile</h2>
                <div className="box-content">
                    <h4>Logged in as {email}</h4>
                    <h6 style={{marginBottom: "30px"}}>{role}</h6>
                    {displayProfile()}
                </div>
            </div>
            <div className="box">
                <h2 className="box-title">Configuration</h2>
                <div className="box-content util-box align-items-center">
                    <Link to="/change-password" className="btn btn-primary">Change Password</Link>
                    {displayUpdateButtons()}
                    <Link to="/logout" className="btn btn-danger">Logout</Link>
                </div>
            </div>
        </Container>
    )
}

export default Profile
