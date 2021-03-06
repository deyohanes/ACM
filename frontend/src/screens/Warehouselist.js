import React, { useEffect,useState } from 'react'
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";


const Warehouselist = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
  const [warehouse, setWarehouse] = useState([]);
  const [email, setEmail] = useState("");
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const {id} = useParams();

  async function getWarehouse() {
    try {
      const response = await axios.get("/api/warehouse");
      const warehouseName = response.data;
       setWarehouse(warehouseName);

    } catch (error) {
      console.error(error);
    }
  }
  async function updatewarehouse() {
    try {
      const response = await axios.put("/api/warehouse/update/:id");
      const warehouseName = response.data;
       setWarehouse(warehouseName);

    } catch (error) {
      console.error(error);
    }
  }
  async function deletewarehouse(id) {
    try {
      const response = await axios.delete(`/api/warehouse/${id}`);
      const warehouseName = response.data;
       setWarehouse(warehouseName);
       window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
   
    getWarehouse()
   
  }, [
   
  ])
 

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Warehouse</h1>
        </Col>
        <Col>
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
        </Col>
        <Col className='text-right'>
            <Link to="/admin/warehouse" className="btn btn-light my-3">
                Create WareHouse
            </Link> 
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
              {warehouse.map((data) => (
                <tr key={data._id}>
                  <td>{data._id}</td>
                  <td>{data.warehouseSymbol}</td>
                  <td>{data.region}</td>
                  <td>{data.size}</td>
                  <td>{data.isFull ? ("Its Full"):("Not Full")}</td>
                  <td>
                    <LinkContainer to={`/admin/warehouse/${data._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                      
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                           onClick={() => deletewarehouse(data._id)}
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

export default Warehouselist
