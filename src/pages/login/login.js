import {Link} from "react-router-dom";
import {Form, FormGroup, Label, Input} from "reactstrap";

import classes from './login.module.css'
import Button from "../../components/button/button";

const Login = (props) => {
    const {loginHandler} = props;

    return (
        <div className={classes.div}>
            <div className={classes.form}>
                <h2 style={{textAlign: 'center'}}>Login</h2>
                <Form onSubmit={loginHandler}>
                    <FormGroup>
                        <Label for="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
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
                        />
                    </FormGroup>
                    <Button type='submit' className='w-100 mt-2 mb-3'>{props.loading ? 'Loading...' : 'Login'}</Button>
                </Form>
                <p>Don't have an account? <Link to='/signup'> Create one.</Link></p>
            </div>
        </div>
    )
};

export default Login;