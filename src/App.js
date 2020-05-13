import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from "./config/client";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import SideNav from "./components/Partial/SideNav";
import TopNav from "./components/Partial/TopNav";
import Login from "./components/User/Login";
import Profile from "./components/User/Profile";
import CourseList from "./components/Course/CourseList";
import CourseDetails from "./components/Course/CourseDetails";
import TopicDetails from "./components/Topic/TopicDetails";
import StudentDetails from "./components/Student/StudentDetails";
import TrainerDetails from "./components/Trainer/TrainerDetails";
import ChangePassword from "./components/User/ChangePassword";
import TopicList from "./components/Topic/TopicList";
import StudentList from "./components/Student/StudentList";
import TrainerList from "./components/Trainer/TrainerList";
import Logout from "./components/Partial/Logout";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <TopNav/>
          <SideNav/>
          <main>
            <Switch>
              <Route path="/" exact component={Login}/>
              <Route path="/profile" exact component={Profile}/>
              <Route path="/courses" exact component={CourseList}/>
              <Route path="/courses/:courseID" component={CourseDetails}/>
              <Route path="/topics" exact component={TopicList}/>
              <Route path="/topics/:topicID" component={TopicDetails}/>
              <Route path="/students/:studentID" component={StudentDetails}/>
              <Route path="/trainers/:trainerID" component={TrainerDetails}/>
              <Route path="/students" exact component={StudentList}/>
              <Route path="/trainers" exact component={TrainerList}/>
              <Route path="/change-password" exact component={ChangePassword}/>
              <Route path="/logout" exact component={Logout}/>
            </Switch>
          </main>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
