import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GET_TRAINER_BY_ID, GET_TRAINERS} from "../../queries/queries";
import { Container } from 'reactstrap';
import EditTrainer from "./EditTrainer";
import {dateParserWithMonth_ISODate, dateParserWithMonth} from "../../utils/dateParser";
import {Link} from "react-router-dom";

function TrainerDetails(props) {
    const trainerID = props.match.params.trainerID;
    const trainerData = useQuery(GET_TRAINERS);
    const { loading, error, data } = useQuery(GET_TRAINER_BY_ID, {
        variables: {trainerID}
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    const trainerItem = data.getTrainerByID;
    const {name, created_date, dob, address, phone_number, profession, topics, user} = trainerItem;
    console.log(trainerItem)

    const dipslayTopicList = () => {
        if (topics.length === 0){
            return <li key={"LOL"}>No course has been participated by this student</li>
        } else {
            return topics.map(topicItem => {
                return <li key={topicItem.id}><Link to={`/topics/${topicItem.id}`}>{topicItem.title}</Link></li>
            })
        }
    }
    
    return (
        <Container>
            
            <div className="box">
                <h2 className="box-title">Utilities</h2>
                <div className="box-content util-box">
                    {/*<EditTrainer trainerItem={trainerItem}/>*/}
                    <Link to="/trainers" className="btn btn-dark">Back To List</Link>
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
                            <p><b>Profession:</b></p>
                        </div>
                        <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                            <p>{profession}</p>
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
                            <p><b>Assigned Topics:</b></p>
                        </div>
                        <div className="col-lg-9 col-md-6 col-sm-6 details-data">
                            <ul>
                                {dipslayTopicList()}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

        </Container>
    )
}

export default TrainerDetails
