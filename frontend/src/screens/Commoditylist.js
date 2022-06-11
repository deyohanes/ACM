import React, { useEffect,useState } from 'react'
import axios from "axios";
import { FaSearch } from "react-icons/fa";

import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, InputGroup, FormControl, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
 

const Commoditylist = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
  const [commodityName, setCommudityName] = useState([]);
  const [email, setEmail] = useState("");

 
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  async function getCommudity() {
    try {
      const response = await axios.get("/api/commodity");
      const name = response.data;
      console.log(name);
      setCommudityName(name);
    //  setSymbol(name.symbol)
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getCommudity()

   
  }, [
   
  ])





 

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Commodity</h1>
        </Col>
        <Form 
          //onSubmit={submitHandler}
          >
            <Row className="align-items-center">
              <Col xs="auto">
                <InputGroup className="mb-2"   >
                  <FormControl
                    id="inlineFormInputGroup"
                    placeholder="Search"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </Col>
             
              <Col xs="auto">
                <Button type="submit" className="mb-2">
                  <FaSearch />
                </Button>
              </Col>
            </Row>
          </Form>
        <Col className='text-right'>
          <Button className='my-3' >
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
    
   
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>Region</th>
                <th>SIZE</th>
                <th>Capacity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {commodityName.map((data) => (
                <tr key={data._id}>
                  <td>{commodityName._id}</td>
                  <td>{commodityName.commoditieName}</td>
                  <td>{commodityName.symbol}</td>
                  <td>{commodityName.orgin}</td>
                  <td>{commodityName.market}</td>
                  <td>
                    <LinkContainer to={`/admin/warehouse/${data._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                      
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                           //onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
 
        </>
   
    </>
  )
}

export default Commoditylist
