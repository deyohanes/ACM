import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import axios from "axios";

const VerifyPost = ({ match, history }) => {
  const userId = match.params.id
  const [warehouseName, setwarehouseName] = useState([]);

  const [timer, setTimer] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate
  
  useEffect(() => {
    //getWarehouse() 
  }, [ ])

  const submitHandler = (e) => {
    e.preventDefault()
    updateUser()
  }
  async function updateUser() {
   // const {data} ={ timer}
    try {
        const response = await axios.put("/api/products/auction/verify",timer);
        //console.log(req.params)
        setwarehouseName(response.data);

//        const response = await axios.get("/api/products/auction/byid",userInfo._id);

     // console.log(warehouseName);
 
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Link to='/bids' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Verify Post</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type='number'                
                placeholder=""
                value={timer}
                onChange={(e) => setTimer(e.target.value)}
              ></Form.Control>
            </Form.Group>

            

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Verify'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default VerifyPost
