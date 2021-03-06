import React, {useState, useContext} from 'react';
import {useMutation} from "@apollo/react-hooks";
import {LOGIN} from "../../queries/queries";
import {Form, FormGroup, Input, Button, Label, Container} from "reactstrap";
import {MessageContext} from "../../context/MessageContext";
import {filterGraphQLString} from "../../utils/graphQLErrorSorter";
import MessageAlert from "../Partial/MessageAlert";

function Login(props) {
    const {setMessage, setMessageType, setVisible} = useContext(MessageContext);
    const userID = localStorage.getItem("userID");
    if (userID){
        localStorage.removeItem("userID");
        window.location.reload();
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { data }] = useMutation(LOGIN);

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            const loginData = await login({ variables: { email, password } });
            console.log(loginData)
            if (loginData.data.login.id){
                localStorage.setItem("userID", loginData.data.login.id);
                props.history.push("/profile");
                window.location.reload();
            }
        } catch (error) {
            setMessage(filterGraphQLString(error.message));
            setMessageType("danger");
            setVisible(true);
        }
    }

    return (
        <Container>
            <div className="box">
                <h2 className="box-title">Login</h2>
                <div className="box-content">
                    <Form onSubmit={onSubmit}>

                        <MessageAlert/>

                        <FormGroup>
                            <Label htmlFor="email">Email:</Label>
                            <Input type="email" placeholder="Email" id="email" name="email" required value={email} onChange={e => {
                                setEmail(e.target.value)
                            }}/>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="password">Password:</Label>
                            <Input type="password" placeholder="Password" id="password" name="password" required value={password} onChange={e => {
                                setPassword(e.target.value)
                            }}/>
                        </FormGroup>

                        <FormGroup>
                            <Button color="dark" block type="submit">Login</Button>
                        </FormGroup>

                    </Form>
                </div>
            </div>
        </Container>
    )
}

export default Login
