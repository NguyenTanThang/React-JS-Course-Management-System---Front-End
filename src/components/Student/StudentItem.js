import React from 'react';
import {dateParserWithMonth_ISODate} from "../../utils/dateParser";
import {DELETE_STUDENT, GET_STUDENTS} from "../../queries/queries";
import { useMutation } from '@apollo/react-hooks';
import { Button } from "reactstrap";
import EditStudent from "./EditStudent";
import {Link} from "react-router-dom"

function StudentItem(props) {
    const {studentItem} = props;
    const {name, dob, address, phone_number, created_date, id, user} = studentItem;
    const {email} = user;

    const [deleteStudent, { data }] = useMutation(DELETE_STUDENT, {
        update(cache, { data: { deleteStudent } }) {
          const { students } = cache.readQuery({ query: GET_STUDENTS })
          cache.writeQuery({
            query: GET_STUDENTS,
            data: { students: students.filter(item => {
                return item.id !== deleteStudent.id
            }) },
          });
        }
      });

      const onDelete = () => {
        deleteStudent({ variables: { studentID: id } })
      }

    return (
        <tr>
            <td><Link to={`/students/${id}`}>{name}</Link></td>
            <td>{dateParserWithMonth_ISODate(dob)}</td>
            <td>{phone_number}</td>
            <td><a href={`mailto:${email}`}>{email}</a></td>
            {/*<td>{dateParserWithMonth(created_date)}</td>*/}
            <td className="utils">
                <EditStudent studentItem={studentItem}/>
                <Button onClick={onDelete} color="danger">Delete</Button>
            </td>
        </tr>
    )
}

export default StudentItem
