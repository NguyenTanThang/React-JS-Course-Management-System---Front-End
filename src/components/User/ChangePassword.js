import React, {useState} from 'react';
import {useMutation} from "@apollo/react-hooks";
import {CHANGE_PASWORD} from "../../queries/queries";
import {Form, FormGroup, Input, Button, Label, Container} from "reactstrap";
import {Link} from "react-router-dom";

function ChangePassword(props) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [change_password, { data }] = useMutation(CHANGE_PASWORD);

    const onSubmit = async (e) => {
        e.preventDefault();
        const userID = localStorage.getItem("userID");
        change_password({
            variables: {userID, oldPassword, newPassword}
        })
        props.history.push("/logout");
    }

    return (
        <Container>
            <div className="box">
                <h2 className="box-title">Change Password</h2>
                <div className="box-content">
                    <Form onSubmit={onSubmit}>

                        <FormGroup>
                            <Label htmlFor="oldPassword">Old Password:</Label>
                            <Input type="password" placeholder="Old Password" id="oldPassword" name="oldPassword" required value={oldPassword} onChange={e => {
                                setOldPassword(e.target.value)
                            }}/>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="newPassword">New Password:</Label>
                            <Input type="password" placeholder="New Password" id="newPassword" name="newPassword" required value={newPassword} onChange={e => {
                                setNewPassword(e.target.value)
                            }}/>
                        </FormGroup>

                        <FormGroup>
                            <Button color="dark" block type="submit">Change Password</Button>
                            <Link to="/profile" className="btn btn-info btn-block mt-2">Back To Profile</Link>
                        </FormGroup>

                    </Form>
                </div>
            </div>
        </Container>
    )
}

export default ChangePassword
