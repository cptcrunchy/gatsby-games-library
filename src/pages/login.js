import React, {useState} from "react"
import { navigate } from "gatsby"
import {useAuth} from '../components/Firebase'
import {Button, Input, Form} from '../components/common'

import SEO from "../components/seo"

const Login = () => {
  const [formValues, setFormValues] = useState({email: '', password: ''});
  const {firebase} = useAuth();

  function handleSubmit(e){
    e.preventDefault();
    firebase
    .login({email: formValues.email, password: formValues.password})
    .then(() => {
        navigate("/")
    })
    .catch( error => {
          console.log(error);
    });
}

function handleInputChange(e){
    e.persist();
    setFormValues( currentValues => ({
        ...currentValues,
        [e.target.name]: e.target.value
    }))
}

  return (
      <>
        <SEO title="Login" />
        <Form onSubmit={handleSubmit}>
          <Input type="email" value={formValues.email} onChange={handleInputChange} name="email" />
          <Input type="password" value={formValues.password} onChange={handleInputChange} name="password" />
          <Button type="submit" block>
            Login
          </Button>
        </Form>
      </>
  )
}

export default Login;
