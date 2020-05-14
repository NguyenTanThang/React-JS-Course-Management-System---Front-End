import React from 'react';
import {dateParserWithMonth} from "../../utils/dateParser";
import EditTopic from "./EditTopic";
import {Link} from "react-router-dom"
import DeleteTopic from "./DeleteTopic";

function TopicItem(props) {
    const {topicItem} = props;
    const {title, course, created_date, id} = props.topicItem;
    const {name} = course;

    return (
        <tr>
            <td><Link to={`/topics/${id}`}>{title}</Link></td>
            <td>{name}</td>
            <td>{dateParserWithMonth(created_date)}</td>
            <td className="utils">
                <EditTopic topicItem={topicItem}/>
                <DeleteTopic topicID={id}/>
            </td>
        </tr>
    )
}

export default TopicItem
