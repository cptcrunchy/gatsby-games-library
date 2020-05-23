import React, {useState, useContext} from 'react'
import {Button, Form, Input, ErrorMessage} from '../components/common'
import {FirebaseContext} from '../components/Firebase'
import { navigate } from 'gatsby'

const Register = () => {

    const {firebase} = useContext(FirebaseContext)
    const [errorMessage, setErrorMessage] = useState('')
    const [formValues, setFormValues] = useState({
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
            <Input
                onChange={handleInputChange}
                value={formValues.email}
                name="email"
                type="email"
                required
                placeholder="email" />
            <Input
                onChange={handleInputChange}
                value={formValues.password}
                name="password"
                type="password"
                minLength={6}
                required
                placeholder="password" />
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