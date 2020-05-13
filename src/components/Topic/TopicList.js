import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GET_TOPICS} from "../../queries/queries";
import TopicItem from "./TopicItem";
import AddTopic from "./AddTopic";
import AssignTrainerToTopic from "./AssignTrainerToTopic"
import {Table, Container} from "reactstrap";

function TopicList() {
    const { loading, error, data } = useQuery(GET_TOPICS)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    const displayTopicItems = () => {
        console.log(data);
        return data.topics.map(topicItem => {
            return <TopicItem key={topicItem.id} topicItem={topicItem}/>
        })
    }

    return (
        <Container>

            <div className="box">
                <h2 className="box-title">Utilities</h2>
                <div className="box-content util-box">
                    <AddTopic/>
                    <AssignTrainerToTopic/>
                </div>
            </div>

            <div className="box table-container">
                <h2 className="box-title">Data</h2>
                <div className="box-content">
                    <Table hover>
                        <thead>
                            <th>Title</th>
                            <th>Course</th>
                            <th>Created Date</th>
                            <th>Utilities</th>
                        </thead>
                        <tbody>
                            {displayTopicItems()}
                        </tbody>
                    </Table>
                </div>
            </div>
            
        </Container>
    )
}

export default TopicList
