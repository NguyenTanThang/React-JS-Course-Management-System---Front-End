import React from 'react';
import {dateParserWithMonth} from "../../utils/dateParser";
import {DELETE_TOPIC, GET_TOPICS} from "../../queries/queries";
import { useMutation } from '@apollo/react-hooks';
import { Button } from "reactstrap";
import EditTopic from "./EditTopic";
import {Link} from "react-router-dom"

function TopicItem(props) {
    const {topicItem} = props;
    const {title, course, created_date, id} = props.topicItem;
    const {name} = course;

    const [deleteTopic, { data }] = useMutation(DELETE_TOPIC, {
        update(cache, { data: { deleteTopic } }) {
          const { topics } = cache.readQuery({ query: GET_TOPICS })
          cache.writeQuery({
            query: GET_TOPICS,
            data: { topics: topics.filter(item => {
                return item.id !== deleteTopic.id
            }) },
          });
        }
      });

      const onDelete = () => {
        deleteTopic({ variables: { topicID: id } })
      }

    return (
        <tr>
            <td><Link to={`/topics/${id}`}>{title}</Link></td>
            <td>{name}</td>
            <td>{dateParserWithMonth(created_date)}</td>
            <td className="utils">
                <EditTopic topicItem={topicItem}/>
                <Button onClick={onDelete} color="danger">Delete</Button>
            </td>
        </tr>
    )
}

export default TopicItem
