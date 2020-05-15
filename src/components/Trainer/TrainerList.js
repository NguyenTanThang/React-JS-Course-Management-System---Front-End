import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GET_TRAINERS, GET_TOPICS} from "../../queries/queries";
import TrainerItem from "./TrainerItem";
import AddTrainer from "./AddTrainer";
import {Table, Container, Form, Label, Input, FormGroup, Button} from "reactstrap";
import paginate from "../../utils/paginate";
import {trainerSearchLogic, paginateLogic} from "../../utils/searchLogic";
import PaginationComponent from "../Partial/Pagination";

function TrainerListSearchEngine(props) {
    const topicDate = useQuery(GET_TOPICS);
    const {searchedName, setSearchedName, searchedTopicID, setSearchedTopicID} = props;

    const displayTopicOptions = (e) => {
        const {loading, error, data} = topicDate;
        if (loading) {
            return <option>Loading</option>
        } else if (error) {
            return <option>Error</option>
        } else {
            return data.topics.map(item => {
                return <option key={item.id} value={item.id}>{item.title}</option>
            })
        }
      }

      const resetValue = () => {
        setSearchedName("");
        setSearchedTopicID("");
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
                            <Label htmlFor="searchedTopicID">Assigned Topic:</Label>
                            <select className="custom-select" id="searchedTopicID" name="searchedTopicID" defaultValue={""} value={searchedTopicID} onChange={(e) => {
                                setSearchedTopicID(e.target.value)
                            }} required>
                                <option disabled value={""}>--Topic--</option>
                                {displayTopicOptions()}
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

function TrainerList() {
    const { loading, error, data } = useQuery(GET_TRAINERS)
    const [searchedName, setSearchedName] = useState("");
    const [searchedTopicID, setSearchedTopicID] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
    let trainerList = data.trainers;

    const pageObject = paginate(trainerList.length, currentPage, 6, 5)

    const displayTrainerItems = () => {
        trainerList = trainerSearchLogic(trainerList, {searchedName, searchedTopicID})
        trainerList = paginateLogic(trainerList, pageObject)
        return trainerList.map(trainerItem => {
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

            <TrainerListSearchEngine searchedName={searchedName} setSearchedName={setSearchedName} searchedTopicID={searchedTopicID} setSearchedTopicID={setSearchedTopicID}/>

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

                    <PaginationComponent pageObject={pageObject} setCurrentPage={setCurrentPage}/>
                </div>
            </div>
            
        </Container>
    )
}

export default TrainerList
