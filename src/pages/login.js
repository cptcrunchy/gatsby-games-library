import React, {useState} from "react"
import { navigate } from "gatsby"
import {useAuth} from '../components/Firebase'
import {Button, Input, Form, ErrorMessage} from '../components/common'

import SEO from "../components/seo"

const Login = () => {
  const [formValues, setFormValues] = useState({email: '', password: ''});
  const [errorMessage, setErrorMessage] = useState('')
  const {firebase} = useAuth();

  function handleSubmit(e){
    e.preventDefault();
    firebase
    .login({email: formValues.email, password: formValues.password})
    .then(() => {
        navigate("/")
    })
    .catch( error => {
          setErrorMessage(error.message)
          console.log(error);
    });
}

function handleInputChange(e){
    e.persist();
    setErrorMessage('')
    setFormValues( currentValues => ({
        ...currentValues,
        [e.target.name]: e.target.value
    }))
}

  return (
      <>
        <SEO title="Login" />
        <Form onSubmit={handleSubmit}>
          <Input required type="email" value={formValues.email} onChange={handleInputChange} name="email" />
          <Input required type="password" value={formValues.password} onChange={handleInputChange} name="password" />
          {!!errorMessage &&
            <ErrorMessage>
              {errorMessage}
            </ErrorMessage>
          }
          <Button type="submit" block>
            Login
          </Button>
        </Form>
      </>
  )
}

export default Login;
