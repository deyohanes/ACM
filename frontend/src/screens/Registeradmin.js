import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from "../components/Message";
import Loader from "../components/Loader";
import axios from "axios";
import {Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Registeradmin = ({  history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [region, setRegion] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('radmin')

  const [message, setMessage] = useState(null)
  const [warehouse , setWarehouse] =useState([])
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;



  async function registerAdmin() {
    try {
      let data ={
        name : name ,   email : email , password : password ,  region  :region 
      }
    let response =  await axios({
        method: "post",
        url: "/api/users/adminregister" , data
        
      });
      setWarehouse(response.data)
        } catch (error) {
       console.error(error);
    }
  } 

  async function warehouselist() {
    try {
    let response =  await axios({
        method: "get",
        url: "/api/warehouse" 
      });
      setWarehouse(response.data)
        } catch (error) {
       console.error(error);
    }
  }

 
  const submitHandler = (e) => {
    e.preventDefault()
    const role = "radmin"
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
     
      if (window.confirm("Confirm")) {
        registerAdmin(e)
      }
    }
 
  }


  useEffect(() => {

    if (userInfo && userInfo.isAdmin) {
    warehouselist()
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);


  return (
    <FormContainer>
      <Row>
      <Col>  
      <h1>Register Admin</h1>
      
      </Col>
        <Col> 
        <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      </Col>
      </Row>
     
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

        <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Commudity Name</Form.Label>
              <Form.Control
                as="select"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                {warehouse.map((data) => (
                  <option key={data._id} value={warehouse.value}>
                    {data.warehouseSymbol}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

    
    </FormContainer>
  )
}

export default Registeradmin
