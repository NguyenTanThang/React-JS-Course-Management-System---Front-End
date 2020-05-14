import React from 'react';
import {dateParserWithMonth_ISODate} from "../../utils/dateParser";
import EditTrainer from "./EditTrainer";
import {Link} from "react-router-dom"
import DeleteTrainer from "./DeleteTrainer";

function TrainerItem(props) {
    const {trainerItem} = props;
    const {name, dob, phone_number, id, user} = trainerItem;
    const {email} = user;

    return (
        <tr>
            <td><Link to={`/trainers/${id}`}>{name}</Link></td>
            <td>{dateParserWithMonth_ISODate(dob)}</td>
            <td>{phone_number}</td>
            <td><a href={`mailto:${email}`}>{email}</a></td>
            {/*<td>{dateParserWithMonth(created_date)}</td>*/}
            <td className="utils">
                <EditTrainer trainerItem={trainerItem}/>
                <DeleteTrainer trainerID={id}/>
            </td>
        </tr>
    )
}

export default TrainerItem
