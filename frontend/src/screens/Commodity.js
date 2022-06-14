import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Col,
  Row
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { newProduct } from "../actions/commodityAction";

const Commodity = ({ match, history }) => {
  const [market, setMarket] = useState("");
  const [orgin, setOrand] = useState("");
  const [commudityName, setCommudityName] = useState([]);
  const [symbol, setSymbol] = useState("");
 
 
  async function setCommodity() {
    try {
        await axios({
            method: 'post',
            url: '/api/commodity',
            data: {
                commoditieName: commudityName,
                symbol:symbol,
                orgin:orgin,
                market:market
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
        <h1>Add Commodity</h1>
 <Form onSubmit={submitHandler}>
  
        <Form.Group controlId="brand">
            <Form.Label>Commodity</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Commodity"
              value={commudityName}
              onChange={(e) => setCommudityName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Symbol</Form.Label>
            <Form.Control
              type="text"
              placeholder="Symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Orgin</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Orgin"
              value={orgin}
              onChange={(e) => setOrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Control
                    as="select"
                    value={market}
                    onChange={(e) => setMarket(e.target.value)}
                  >
                    <option>Both</option>
                    <option>Local</option>
                    <option>Export</option>
                  </Form.Control>

        <Button type='submit' variant='primary'>
         ADD
        </Button>
      </Form>


    
      </FormContainer>
    </>
  );
};

export default Commodity;
