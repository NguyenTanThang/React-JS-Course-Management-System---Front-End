import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GET_TOPIC_BY_ID, GET_TOPICS, GET_USER_BY_ID} from "../../queries/queries";
import { Container } from 'reactstrap';
import EditTopic from "./EditTopic";
import {dateParserWithMonth} from "../../utils/dateParser";
import {Link} from "react-router-dom";

function TopicDetails(props) {
    const topicID = props.match.params.topicID;
    const userID = localStorage.getItem("userID");
    const topicData = useQuery(GET_TOPICS);
    const userData = useQuery(GET_USER_BY_ID, {
        variables: {userID}
    });
    const { loading, error, data } = useQuery(GET_TOPIC_BY_ID, {
        variables: {topicID}
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    const topicItem = data.getTopicByID;
    const {title, created_date, course, assigned_trainers} = topicItem;

    const displayAssignedTrainers = () => {
        if (assigned_trainers.length === 0){
            return <li key={"LOL2"}>No trainer has been assigned to this topic</li>
        } else {
            return assigned_trainers.map(trainerItem => {
                return <li key={trainerItem.id}>{trainerItem.name}</li>
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
                    {/*<EditTopic topicItem={topicItem}/>*/}
                    <Link to="/topics" className="btn btn-dark">Back To List</Link>
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
                            <p>{title}</p>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 details-title">
                            <p><b>Created Date:</b></p>
                        </div>
                        <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                            <p>{dateParserWithMonth(created_date)}</p>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 details-title">
                            <p><b>Course:</b></p>
                        </div>
                        <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                            <p><Link to={`/courses/${course.id}`}>{course.name}</Link></p>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 details-title">
                            <p><b>Assigned Trainers:</b></p>
                        </div>
                        <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                            <ul>
                                {displayAssignedTrainers()}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

        </Container>
    )
}

export default TopicDetails
