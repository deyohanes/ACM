import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,

} from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const Warehouse = ({ match, history }) => {
  const [region, setRegion] = useState("");
  const [name, setName] = useState([]);
  const [size, setSize] = useState("");
 
 
  async function setCommodity() {
    try {
        await axios({
            method: 'post',
            url: '/api/warehouse',
            data: {
              warehouseSymbol: name,
                region:region,
                size:parseInt(size),
               
            }
          });
    } catch (error) {
      console.error(error);
    }
  }

 

  useEffect(() => {
   
  }, []);

 
  const submitHandler = (e) => {
    e.preventDefault();
    //const id = getid(email)
    setCommodity()


  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Add Warehouse</h1>


        <Form onSubmit={submitHandler}>
        <Form.Group controlId="brand">
            <Form.Label>Warehouse name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Warehouse Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Region</Form.Label>
            <Form.Control
              type="text"
              placeholder="Symbol"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Size</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Orgin"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            ></Form.Control>
          </Form.Group>

        <Button type='submit' variant='primary'>
         ADD
        </Button>
      </Form>


    
      </FormContainer>
    </>
  );
};

export default Warehouse;
