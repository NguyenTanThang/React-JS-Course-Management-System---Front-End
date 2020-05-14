import {
  gql
} from "apollo-boost";

export const GET_COURSES = gql `
  {
    courses {
      id
      name
      created_date
    }
  }
`;

export const ADD_COURSE = gql `
mutation ($name: String!){
    addCourse(name: $name){
        id
        name
        created_date
      }
}
`;

export const DELETE_COURSE = gql `
mutation ($courseID: ID!){
    deleteCourse(courseID: $courseID) {
      id
    }
  }
`

export const UPDATE_COURSE = gql `
mutation ($courseID: ID!, $name: String){
    updateCourse(courseID: $courseID, name: $name) {
      id
      name
      created_date
    }
  }
`

export const GET_TOPICS = gql `
query {
  topics {
    id
    title
    created_date
    courseID
    course {
      id
      name
    }
  }
}
`

export const ADD_TOPIC = gql `
mutation ($title: String!, $courseID: ID!){
    addTopic(title: $title, courseID: $courseID){
      id
      title
      created_date
      courseID
      course {
        id
        name
      }
    }
}
`;

export const DELETE_TOPIC = gql `
mutation ($topicID: ID!){
    deleteTopic(topicID: $topicID) {
      id
    }
  }
`

export const UPDATE_TOPIC = gql `
mutation ($topicID: ID!, $title: String, $courseID: ID){
    updateTopic(topicID: $topicID, courseID: $courseID, title: $title) {
      id
      title
      created_date
      courseID
      course {
        id
        name
      }
    }
  }
`

export const GET_STUDENTS = gql `
query {
  students {
    id
    name
    dob
    address
    phone_number
    created_date
    coursesIDs
    courses {
      name
      id
    }
    user {
      email
    }
  }
}
`

export const ADD_STUDENT = gql `
mutation ($name: String!, $dob: String!
  , $phone_number: String!, 
  $address: String!,
  $email: String!,
  $password: String!,
  $coursesIDs: [String]){
  addStudent(name: $name,
  dob: $dob,
  phone_number: $phone_number,
  address: $address,
  coursesIDs: $coursesIDs,
  email: $email,
  password: $password) {
    id
    name
    dob
    address
    phone_number
    created_date
    coursesIDs
    courses {
      name
      id
    }
    user {
      email
    }
  }
}
`

export const UPDATE_STUDENT = gql `
mutation ($studentID: ID!, 
  $name: String, 
  $dob: String
  , $phone_number: String, 
  $address: String,
  $coursesIDs: [String]
  ){
  updateStudent(studentID: $studentID
    , name: $name,
  dob: $dob,
  phone_number: $phone_number,
  address: $address,
  coursesIDs: $coursesIDs) {
    id
    name
    dob
    address
    phone_number
    created_date
    coursesIDs
    courses {
      name
      id
    }
    user {
      email
    }
  }
}
`

export const DELETE_STUDENT = gql `
  mutation ($studentID: ID!) {
    deleteStudent(studentID: $studentID) {
      id
    }
  }
`

export const GET_TRAINERS = gql `
query {
  trainers {
    id
    name
    dob
    address
    phone_number
    profession
    topicsIDs
    topics {
      title
    }
    user {
      email
    }
  }
}
`

export const ADD_TRAINER = gql `
mutation ($name: String!,
  $dob: String!,
  $phone_number: String!,
  $address: String!,
  $topicsIDs: [String],
  $email: String!,
  $password: String!,
  $profession: String!){

  addTrainer(name: $name,
  dob: $dob,
  phone_number: $phone_number,
  address: $address,
  topicsIDs: $topicsIDs,
  email: $email,
  password: $password,
  profession: $profession) {
    id
    name
      dob
      address
      phone_number
      profession
      topicsIDs
      topics {
        title
      }
      user {
        email
      }
  }
}
`

export const UPDATE_TRAINER = gql `
mutation ($trainerID: ID!, 
  $name: String,
  $dob: String,
  $phone_number: String,
  $address: String,
  $topicsIDs: [String],
  $profession: String){

  updateTrainer(trainerID: $trainerID, 
  name: $name,
  dob: $dob,
  phone_number: $phone_number,
  address: $address,
  topicsIDs: $topicsIDs,
  profession: $profession) {
    id
    name
      dob
      address
      topicsIDs
      phone_number
      profession
      topics {
        title
      }
      user {
        email
      }
  }
}
`

export const DELETE_TRAINER = gql `
  mutation ($trainerID: ID!) {
    deleteTrainer(trainerID: $trainerID) {
      id
    }
  }
`

export const LOGIN = gql `
mutation ($email: String!, $password: String!){
  login (email: $email, password: $password){
    id
    role
    student {
      name
    }
    trainer {
      name
    }
  }
}
`

export const GET_USER_BY_ID = gql`
query ($userID: ID!){
  getUserByID(userID: $userID) {
    id
    role
    email
    student {
      id
      name
      dob
      address
      coursesIDs
      phone_number
      courses {
        name
        id
      }
    }
    trainer {
      id
      name
      dob
      address
      topicsIDs
      phone_number
      profession
      topics {
        title
        id
      }
    }
  }
}
`

export const ASSIGN_STUDENT_TO_COURSE = gql`
mutation ($courseID: ID!, $studentID: ID!){
  assignStudentToCourse(courseID: $courseID, studentID: $studentID){
    id
    name
    dob
    address
    phone_number
    created_date
    coursesIDs
    courses {
      name
      id
    }
  }
}
`

export const ASSIGN_TRAINER_TO_TOPIC = gql`
mutation ($trainerID: ID!, $topicID: ID!){
  assignTrainerToTopic(trainerID: $trainerID, topicID: $topicID){
    id
    name
    dob
    address
    phone_number
    created_date
    topicsIDs
    topics {
      title
      id
    }
  }
}
`

export const GET_COURSE_BY_ID = gql`
query ($courseID: ID!){
  getCourseByID(courseID: $courseID){
    id
    name
    created_date
    topics {
      title
      id
      assigned_trainers {
        name
        id
      }
    }
    participated_students {
      name
      id
    }
  }
}
`;

export const GET_TOPIC_BY_ID = gql`
query ($topicID: ID!){
  getTopicByID(topicID: $topicID){
    id
    title
    created_date
    courseID
    assigned_trainers {
      name
      id
    }
    course {
      id
      name
      participated_students {
        id
        name
      }
    }
  }
}
`;

export const GET_STUDENT_BY_ID = gql`
query ($studentID: ID!){
  getStudentByID(studentID: $studentID){
    id
    name
    dob
    address
    phone_number
    created_date
    coursesIDs
    user {
      email
    }
    courses {
      name
      id
    }
  }
}
`;

export const GET_TRAINER_BY_ID = gql `
query ($trainerID: ID!) {
  getTrainerByID(trainerID: $trainerID) {
    id
    name
    dob
    address
    phone_number
    profession
    created_date
    topicsIDs
    topics {
      title
      id
    }
    user {
      email
    }
  }
}
`

export const CHANGE_PASWORD = gql`
  mutation ($userID: ID!, $oldPassword: String!, $newPassword: String!) {
    changePassword(userID: $userID, oldPassword: $oldPassword, newPassword: $newPassword) {
      id
    }
  }
`
 