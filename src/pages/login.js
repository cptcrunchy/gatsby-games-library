import React, {useState} from "react"
import { navigate } from "gatsby"
import {useAuth} from '../components/Firebase'

import SEO from "../components/seo"
import Layout from '../components/layout'

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
    <Layout>
      <SEO title="Login" />
      <form onSubmit={handleSubmit}>
        <input type="email" value={formValues.email} onChange={handleInputChange} name="email" />
        <input type="password" value={formValues.password} onChange={handleInputChange} name="password" />
        <button type="submit">
          Login
        </button>
      </form>
    </Layout>
  )
}

export default Login;
