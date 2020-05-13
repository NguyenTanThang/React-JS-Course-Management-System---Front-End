import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GET_TRAINERS} from "../../queries/queries";
import TrainerItem from "./TrainerItem";
import AddTrainer from "./AddTrainer";
import {Table, Container} from "reactstrap";

function TrainerList() {
    const { loading, error, data } = useQuery(GET_TRAINERS)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    const displayTrainerItems = () => {
        return data.trainers.map(trainerItem => {
            return <TrainerItem key={trainerItem.id} trainerItem={trainerItem}/>
        })
    }

    return (
        <Container>

            <div className="box">
                <h2 className="box-title">Utilities</h2>
                <div className="box-content">
                    <AddTrainer/>
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
                            {displayTrainerItems()}
                        </tbody>
                    </Table>
                </div>
            </div>
            
        </Container>
    )
}

export default TrainerList
