import React from 'react';
import {dateParserWithMonth_ISODate} from "../../utils/dateParser";
import {DELETE_TRAINER, GET_TRAINERS} from "../../queries/queries";
import { useMutation } from '@apollo/react-hooks';
import { Button } from "reactstrap";
import EditTrainer from "./EditTrainer";
import {Link} from "react-router-dom"

function TrainerItem(props) {
    const {trainerItem} = props;
    const {name, dob, address, phone_number, created_date, id, user} = trainerItem;
    const {email} = user;

    const [deleteTrainer, { data }] = useMutation(DELETE_TRAINER, {
        update(cache, { data: { deleteTrainer } }) {
          const { trainers } = cache.readQuery({ query: GET_TRAINERS })
          cache.writeQuery({
            query: GET_TRAINERS,
            data: { trainers: trainers.filter(item => {
                return item.id !== deleteTrainer.id
            }) },
          });
        }
      });

      const onDelete = () => {
        deleteTrainer({ variables: { trainerID: id } })
      }

    return (
        <tr>
            <td><Link to={`/trainers/${id}`}>{name}</Link></td>
            <td>{dateParserWithMonth_ISODate(dob)}</td>
            <td>{phone_number}</td>
            <td><a href={`mailto:${email}`}>{email}</a></td>
            {/*<td>{dateParserWithMonth(created_date)}</td>*/}
            <td className="utils">
                <EditTrainer trainerItem={trainerItem}/>
                <Button onClick={onDelete} color="danger">Delete</Button>
            </td>
        </tr>
    )
}

export default TrainerItem
