import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Row,
  Button,
  Col,
  Dropdown,
  DropdownButton,
  ListGroup,
} from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts,filterSearch } from "../actions/productActions";
 
const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
   const pageNumber = match.params.pageNumber || 1;

   const [level, setLevel] = useState("");
  
  const dispatch = useDispatch();
  const [name, setName] = useState([]);
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

 function filterSearchProds(key) {
      dispatch(filterSearch({key,pageNumber}))
 }

  useEffect(() => {
     dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
 
  function filterSearc() {}
  return (
    <>
      {}
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
  <Row>
    <Col>
    
    <Button  onClick={() => filterSearchProds('all')} variant="Secondary" >All</Button>
    <Button onClick={() => filterSearchProds('opened')}  variant="Secondary">Opened</Button>
      </Col>
    <Col> </Col>
    <Col> </Col>
  </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
