import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from "../components/Message";
import Loader from "../components/Loader";
import axios from "axios";
import { Row, Col,NavLink } from 'react-bootstrap';


const PostForm = ({history}) => {
  const [baseprice, setPrice] = useState('')
  const [amount, setAmount] = useState('')
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

 const postAuction = () => async (dispatch) => {
    try {
     
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.put(
        '/api/products/auction',
        {  amount ,baseprice },
        config
      )
       console.log.apply(data)
      
    } catch (error) {
      
    }
  }

   useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
        history.push("/login");
    } else {
     
    }
  }, [dispatch, history, successDelete, userInfo]);


  return (
    <FormContainer>
      <Row>
      <Col>  
      <h1>Post Product</h1>
      
      </Col>
        
      </Row>
     
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      
      <Form onSubmit={postAuction}>
        <Form.Group controlId='name'>
          <Form.Label>BasePrice</Form.Label>
          <Form.Control
            type='number'
            placeholder='Base Price'
            value={baseprice}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter email'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></Form.Control>
        </Form.Group>

        

        <Button type='submit' variant='primary'>
          Post Auction
        </Button>
      </Form>

    
    </FormContainer>
  )
}

export default PostForm
