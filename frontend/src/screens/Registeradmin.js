import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from "../components/Message";
import Loader from "../components/Loader";
import axios from "axios";


const Registeradmin = ({  history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [region, setRegion] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;


 const registeradm = (name, email, password,role,region) => async (dispatch) => {
    try {
     
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        '/api/users/admin',
        { name, email, password,role,region },
        config
      )
       console.log.apply(data)
      
    } catch (error) {
      
    }
  }


 
  const submitHandler = (e) => {
    e.preventDefault()
    const role = "radmin"
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
        
      registeradm(name, email, password,role,region)
    }
  }


  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
     
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);


  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Region</Form.Label>
          <Form.Control
            type='text'
            placeholder='Region'
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

    
    </FormContainer>
  )
}

export default Registeradmin
