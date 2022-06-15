import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
   
  const [message, setMessage] = useState(null)

 
  const userList = useSelector((state) => state.userList);
  const { loading, error } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

   const id = useParams();
  const pid = id.id
  console.log(pid)

  async function postAuction() {
    
    const data = {
      baseprice : baseprice,
      amount : amount
    }
  try {
    
    console.log(pid);
    const response = await axios.post(`/api/products/auction/${pid}`, data );
    const warehouseName = response.data;
    console.log.apply(warehouseName)
    
  } catch (error) {
    console.error(error);
  } 
  
  }

   useEffect(() => {
   
  }, []);


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
            placeholder='Enter An amount to be posted'
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
