import React from 'react';
import {dateParserWithMonth} from "../../utils/dateParser";
import {DELETE_COURSE, GET_COURSES} from "../../queries/queries";
import { useMutation } from '@apollo/react-hooks';
import { Button } from "reactstrap";
import EditCourse from "./EditCourse";
import {Link} from "react-router-dom";

function CourseItem(props) {
    const {courseItem} = props;
    const {name, created_date, id} = props.courseItem;

    const [deleteCourse, { data }] = useMutation(DELETE_COURSE, {
        update(cache, { data: { deleteCourse } }) {
          const { courses } = cache.readQuery({ query: GET_COURSES })
          cache.writeQuery({
            query: GET_COURSES,
            data: { courses: courses.filter(item => {
                return item.id !== deleteCourse.id
            }) },
          });
        }
      });

      const onDelete = () => {
        deleteCourse({ variables: { courseID: id } })
      }

    return (
        <tr>
            <td><Link to={`/courses/${id}`}>{name}</Link></td>
            <td>{dateParserWithMonth(created_date)}</td>
            <td className="utils">
                <EditCourse courseItem={courseItem}/>
                <Button onClick={onDelete} color="danger">Delete</Button>
            </td>
        </tr>
    )
}

export default CourseItem
