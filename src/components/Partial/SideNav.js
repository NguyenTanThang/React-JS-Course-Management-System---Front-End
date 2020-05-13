import React from 'react';
import {Link} from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import {GET_USER_BY_ID} from "../../queries/queries";

function SideNav() {
    const userID = localStorage.getItem("userID");
    const userData = useQuery(GET_USER_BY_ID, {
        variables: {userID}
    });

    const displayNavLinks = () => {
        const {loading, error} = userData;

        if (loading) return <p>Loading...</p>;
        if (error) return (
            <>
                <li>
                    <Link to="/">
                        Login
                    </Link>
                </li>
            </>
        )

        const {role} = userData.data.getUserByID;
        if (role === "Admin"){
            return (
                <>
                    <li>
                        <Link to="/profile">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/courses">
                            Courses
                        </Link>
                    </li>
                    <li>
                        <Link to="/topics">
                            Topics
                        </Link>
                    </li>
                    <li>
                        <Link to="/trainers">
                            Trainers
                        </Link>
                    </li>
                    <li>
                        <Link to="/students">
                            Students
                        </Link>
                    </li>
                    <li>
                        <Link className="text-danger" to="/logout">
                            Logout
                        </Link>
                    </li>
                </>
            )
        } else if (role === "Student" || role === "Trainer") {
            return (
                <>
                    <li>
                        <Link to="/profile">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link className="text-danger" to="/logout">
                            Logout
                        </Link>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li>
                        <Link to="/">
                            Login
                        </Link>
                    </li>
                </>
            )
        }
    }

    const displayProfile = () => {
        const {loading, error} = userData;

        if (loading) return <p>Loading...</p>;
        if (error) return (
            <div className="profile">
                <h4>No user has been specified</h4>
                <h6>Please login</h6>
            </div>
        )

        const {role, email} = userData.data.getUserByID;
        return (
            <div className="profile">
                <h4>{email}</h4>
                <h6>{role}</h6>
            </div>
        )
    }

    return (
        <div className="side-nav">

            <div className="close-nav-btn">
                X
            </div>
            
            {displayProfile()}

            <div className="side-nav-list">
                <ul>
                    {displayNavLinks()}
                </ul>
            </div>
            
        </div>
    )
}

export default SideNav
