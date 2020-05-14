import React from 'react';
import {dateParserWithMonth} from "../../utils/dateParser";
import EditCourse from "./EditCourse";
import {Link} from "react-router-dom";
import DeleteCourse from "./DeleteCourse";

function CourseItem(props) {
    const {courseItem} = props;
    const {name, created_date, id} = props.courseItem;

    return (
        <tr>
            <td><Link to={`/courses/${id}`}>{name}</Link></td>
            <td>{dateParserWithMonth(created_date)}</td>
            <td className="utils">
                <EditCourse courseItem={courseItem}/>
                <DeleteCourse courseID={id}/>
            </td>
        </tr>
    )
}

export default CourseItem
