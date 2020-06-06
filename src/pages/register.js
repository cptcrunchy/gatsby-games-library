import React, {useState, useContext} from 'react'
import {Button, Form, FormLabel, Input, ErrorMessage} from '../components/common'
import {FirebaseContext} from '../components/Firebase'
import { navigate } from 'gatsby'

const Register = () => {

    const {firebase} = useContext(FirebaseContext)
    const [errorMessage, setErrorMessage] = useState('')
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    function handleInputChange(e){
        e.persist();
        setErrorMessage('')
        setFormValues( currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
        if(formValues.password === formValues.confirmPassword) {
            firebase.register({
                username: formValues.username,
                email: formValues.email,
                password: formValues.password
            }).catch( error => {
                // Handle Errors here.
                setErrorMessage(error.message)
             }).then(() => {
                navigate("/login")
            })
        } else {
            setErrorMessage('The passwords entered do not match')
        }
    }


    return(
        <Form onSubmit={handleSubmit}>
            <FormLabel>Username</FormLabel>
            <Input
                onChange={handleInputChange}
                value={formValues.username}
                name="username"
                type="text"
                required
                placeholder="username" />

            <FormLabel>Email</FormLabel>
            <Input
                onChange={handleInputChange}
                value={formValues.email}
                name="email"
                type="email"
                required
                placeholder="email" />
            <FormLabel>Password</FormLabel>
            <Input
                onChange={handleInputChange}
                value={formValues.password}
                name="password"
                type="password"
                minLength={6}
                required
                placeholder="password" />
            <FormLabel>Confirm Password</FormLabel>
            <Input
                onChange={handleInputChange}
                value={formValues.confirmPassword}
                name="confirmPassword"
                type="password"
                minLength={6}
                required
                placeholder="confirm password" />
            {!!errorMessage &&
                <ErrorMessage>
                    {errorMessage}
                </ErrorMessage>
            }
            <Button type="submit" block>Register</Button>

        </Form>
    )
}

export default Register