import React, { useEffect,useState } from "react";
import { axios } from 'axios';
import { FaSearch , FaShareAlt } from "react-icons/fa";
import { LinkContainer  } from 'react-router-bootstrap'
import { useParams } from "react-router-dom";
import {   Table,
    Button,
    Row,
    Col,
    InputGroup,
    FormControl,
    Modal , FormLabel,
    Form, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import ProduceProductsElement from '../components/ProduceProductsElement';

const Producerproducts = ({ history, match }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const [modalShow, setModalShow] = React.useState(false)
  const pageNumber = match.params.pageNumber || 1
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
const [auction ,setAuction] = useState([])
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList
  const {id} = useParams();
  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
/*

  async function getProducts() {
   
        try {
            const id = {
                "user" : "626fdea97f20b6ca874ae158"
             }
            const config = {
                headers: {
                    "Content-type": "application/json"
                },
            };   
            const { response } = await  axios.get("/api/products/own",
                {
                    id 
                },
                config
            );
         const ownproducts = response.data;
         console.log(ownproducts);       
    } catch (error) {
      console.error(error);
    }
  }
  */

  async function ownproducts() {
    try {
     console.log(id)
     const response = await axios.get(`/api/products/products/own/${id}`);
     const auction = response.data;
     console.log(auction);
     setAuction(auction);
   } catch (error) {
     console.log("You dont Have any bids here")
   }
 }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
        const config = {
            headers: {
                "Content-type": "application/json"
            },
        };
        const { response } = await axios.post(
            "/api/products/search",
            {
                email 
            },
            config
        );
        const name = response.data;
        console.log(name);
        setEmail(name);
        
    } catch (error) {
      console.error(error);
    }
};
 
  useEffect(() => {
    ownproducts()
    if (!userInfo ) {
      history.push('/login')
      
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
      
    } else {
      dispatch(listProducts('', pageNumber))
     
    }
    
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])


  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

 
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col>
          <Form onSubmit={submitHandler}>
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
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>CountInStock</th>
                <th>Symbol</th>
                <th>warehouse</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => <ProduceProductsElement detail={product} key={product._id}/>)
              }
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
 
    </>
  )
}

export default Producerproducts
