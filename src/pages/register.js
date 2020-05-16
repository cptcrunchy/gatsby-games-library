import React, {useState, useContext} from 'react'
import {Button, Form, Input} from '../components/common'
import {FirebaseContext} from '../components/Firebase'
import { navigate } from 'gatsby'

const Register = () => {

    const {firebase} = useContext(FirebaseContext)

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    function handleInputChange(e){
        e.persist();
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
               var errorCode = error.code;
               var errorMessage = error.message;
               if (errorCode === 'auth/weak-password') {
                 alert('The password is too weak.');
               } else {
                 alert(errorMessage);
               }
               console.log(error);
             }).then(() => {
                navigate("/login")
            })
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
                minLength={3}
                required
                placeholder="password" />
            <Input
                onChange={handleInputChange}
                value={formValues.confirmPassword}
                name="confirmPassword"
                type="password"
                minLength={3}
                required
                placeholder="confirm password" />
            <Button type="submit" block>Register</Button>

        </Form>
    )
}

export default Register