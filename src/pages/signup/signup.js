import {useState} from "react";

import {Link, useHistory} from "react-router-dom";
import {Form, FormGroup, FormText, Label, Input} from "reactstrap";

import classes from '../login/login.module.css'
import Button from "../../components/button/button";
import axios from "axios";

const Signup = () => {
    const [isEqual, setIsEqual] = useState(true);
    const [isMin, setIsMin] = useState(false);
    const [userExists, setUserExists] = useState(false);
    const history = useHistory();
    const submitHandler = e => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const confirmPassword = e.target[2].value;

        setIsEqual(true);
        setIsMin(false);
        setUserExists(false);

        if (password.length < 6) {
            return setIsMin(true);
        }

        if (password !== confirmPassword) {
            return setIsEqual(false);
        }

        const data = {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };

        axios.post('http://localhost:8080/api/signup', data)
            .then(res => {
                console.log(res)
                if (res.data.success) {
                    history.push('/login')
                }
            })
            .catch(error => {
                console.log(error.message);
                setUserExists(true)
            })
    }
    return (
        <div className={classes.div}>
            <div className={classes.form}>
                <h2 style={{textAlign: 'center'}}>Signup</h2>
                {userExists &&
                    <div className="text-danger text-center">
                        User already exists.
                    </div>
                }
                <Form onSubmit={submitHandler}>
                    <FormGroup>
                        <Label for="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                        />
                        {isMin &&
                            <FormText color="danger">
                                Password should have at least 6 characters.
                            </FormText>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">
                            Confirm Password
                        </Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                        />
                        {!isEqual &&
                            <FormText color="danger">
                                Password should match.
                            </FormText>
                        }
                    </FormGroup>
                    <Button type='submit' className='w-100 mt-2 mb-3'>Signup</Button>
                </Form>
                <p>Have an account? <Link to='/login'> Login.</Link></p>
            </div>
        </div>
    )
};

export default Signup;