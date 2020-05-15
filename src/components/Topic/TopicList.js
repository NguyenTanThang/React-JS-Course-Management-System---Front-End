import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GET_TOPICS, GET_COURSES} from "../../queries/queries";
import TopicItem from "./TopicItem";
import AddTopic from "./AddTopic";
import AssignTrainerToTopic from "./AssignTrainerToTopic"
import {Table, Container, Form, Label, Input, FormGroup, Button} from "reactstrap";
import paginate from "../../utils/paginate";
import {topicSearchLogic, paginateLogic} from "../../utils/searchLogic";
import PaginationComponent from "../Partial/Pagination";

function TopicListSearchEngine(props) {
    const courseData = useQuery(GET_COURSES);
    const {searchedTitle, setSearchedTitle, searchedCourseID, setSearchedCourseID} = props;

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
        setSearchedTitle("");
        setSearchedCourseID("");
      }

    return (
            <div className="box">
                <h2 className="box-title">Search</h2>
                <div className="box-content">
                    <Form onSubmit={(e) => e.preventDefault()}>

                        <FormGroup>
                            <Label htmlFor="searched-title">Topic Title</Label>
                            <Input type="text" id="searched-title" name="searched-title" value={searchedTitle} onChange={(e) => {
                                setSearchedTitle(e.target.value)
                            }}/>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="searchedCourseID">Course:</Label>
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

function TopicList() {
    const { loading, error, data } = useQuery(GET_TOPICS);
    const [searchedTitle, setSearchedTitle] = useState("");
    const [searchedCourseID, setSearchedCourseID] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
    let topicList = data.topics;

    const pageObject = paginate(topicList.length, currentPage, 6, 5)

    const displayTopicItems = () => {
        topicList = topicSearchLogic(topicList, {searchedTitle, searchedCourseID})
        topicList = paginateLogic(topicList, pageObject)
        return topicList.map(topicItem => {
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

            <TopicListSearchEngine searchedTitle={searchedTitle} setSearchedTitle={setSearchedTitle} searchedCourseID={searchedCourseID} setSearchedCourseID={setSearchedCourseID}/>

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

                    <PaginationComponent pageObject={pageObject} setCurrentPage={setCurrentPage}/>

                </div>
            </div>
            
        </Container>
    )
}

export default TopicList
