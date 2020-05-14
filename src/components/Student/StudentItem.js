import React from 'react';
import {dateParserWithMonth_ISODate} from "../../utils/dateParser";
import EditStudent from "./EditStudent";
import {Link} from "react-router-dom";
import DeleteStudent from "./DeleteStudent";

function StudentItem(props) {
    const {studentItem} = props;
    const {name, dob, phone_number, id, user} = studentItem;
    const {email} = user;

    return (
        <tr>
            <td><Link to={`/students/${id}`}>{name}</Link></td>
            <td>{dateParserWithMonth_ISODate(dob)}</td>
            <td>{phone_number}</td>
            <td><a href={`mailto:${email}`}>{email}</a></td>
            {/*<td>{dateParserWithMonth(created_date)}</td>*/}
            <td className="utils">
                <EditStudent studentItem={studentItem}/>
                <DeleteStudent studentID={id}/>
            </td>
        </tr>
    )
}

export default StudentItem
