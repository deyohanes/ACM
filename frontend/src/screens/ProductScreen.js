import React, { useState, useEffect,useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Rate from "../components/Rate";

import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import Countdown from "react-countdown";
import {
  listProductDetails,
  createProductReview,
 biding
} from "../actions/productActions";

import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
  //const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  //const [products, setProduct] = useState();
  const [bidprice, setbidPrice] = useState("");
  const [timer, setTimer] = useState('00:00:00');
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //const productPostcreate = useSelector((state) => state.productPostcreate);
  const {id} = useParams();
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;
    const Ref = useRef(null);
  
    const addToCartHandler = () => {
      history.push(`/cart/${match.params.id}?qty=${product.currentPrice}`)
    }

    async function bidngHandler() {
         const userId = userInfo._id
         const price = parseInt(bidprice)

       const  data = { 
         "userId": userId,
         "price": price
         }
       await axios.post(`/api/products/auction/placebid/${id}`,data)  
       window.location.reload();
       }
       


  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
        total, hours, minutes, seconds
    };
}

const startTimer = (e) => {
  let { total, hours, minutes, seconds } 
              = getTimeRemaining(e);
  if (total >= 0) {
    minutes = product.timer /60
      setTimer(
          (hours > 10 ? hours : '0' + hours) + ':' +
          (minutes > 9 ? minutes : '' + minutes) + ':'
          + (seconds > 9 ? seconds : '0' + seconds)
      )
  }
}
const clearTimer = (e) => {
   
  setTimer('00:00:00');
 
  if (Ref.current) clearInterval(Ref.current);
  const id = setInterval(() => {
      startTimer(e);
  }, 1000)
  Ref.current = id;
}

const getDeadTime = () => {
  let deadline = new Date();

  // This is where you need to adjust if 
  // you entend to add more time
  deadline.setSeconds(deadline.getSeconds() + 10);
  return deadline;
}



useEffect(() => {
  clearTimer(getDeadTime());
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [product._id, dispatch, match, successProductReview]);
  /*
  const bidngHandler = () => {
    const id = product._id
    const userId  =userInfo._id
    biding( id, userId,  price)
    //history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
*/

   const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
 

  return (
    <>
      {userInfo ? (
        <>
          {" "}
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Meta title={product.name} />
              <Row>
                <Col md={6}>
                  <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rate
                        // value={product.rating}
                        text={`Number Of Bids ${product.numberOfbids} `}
                      />
                    </ListGroup.Item>
                    {product.currentPrice ? (
                      <>
                        {" "}
                        <ListGroup.Item>
                          Latest Bid Price: {product.currentPrice}ETB
                        </ListGroup.Item>
                      </>
                    ) : (
                      <>
                        <ListGroup.Item>Product is Not For Sale</ListGroup.Item>
                      </>
                    )}
                    {
                      product.isEnd ? (<> <ListGroup.Item>
                        Winner: {product.purchasedBy}
                      </ListGroup.Item></>):(<></>)
                    }
                    <ListGroup.Item>
                      Description: {product.description}
                    </ListGroup.Item>
                   
                    <ListGroup.Item>
                      <Link to={"/producer"}>Producer: {product.user}</Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={3}>
                  {userInfo.isAdmin ? (
                    <></>
                  ) : (
                    <>
                      
                      {
                        userInfo.role == "member" 
                         ?(<>
                         <Card>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <Row>
                              <Col>Price:</Col>
                              <Col>
                                <strong>
                                  {" "}
                                  <input
                                  type="number"
                                    value={bidprice}
                                    onChange={(e) =>
                                      setbidPrice(e.target.value)
                                    }
                                    name="price"
                                  />{" "}
                                  ETB
                                </strong>
                              </Col>
                            </Row>
                          </ListGroup.Item>

                          <ListGroup.Item>
                            <Row>
                              <Col>Status:</Col>
                              {
                                product.isLive ? (<> <Col>
                                  Ends In: <h2>{timer}</h2>
                                 
                                </Col></>) : (<> <Col>
                              </Col></>)
                              }
                             
                              <Col>
                                {product.isLive
                                  ? "Auction is Started"
                                  : "Auction Not Started"}
                              </Col>
                            </Row>
                          </ListGroup.Item>

                          {product.countInStock > 0 && (
                            <ListGroup.Item>
                              <Row>
                                <Col>Quantity</Col>
                                <Col>
                                  <strong> {product.amount} Ton</strong>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          )}

                          <ListGroup.Item>
                            {product.isPosted ?(<>
                              <Button
                                onClick={bidngHandler}
                              
                                className="btn-block"
                                type="button"
                                disabled={!product.isLive  ||   ( product.currentPrice > bidprice) }
                              >
                                Bid
                              </Button> </>) : (<>   <Button
                               
                              
                                className="btn-block"
                                type="button"
                                disabled={product.isEnd }
                              >
                                Add To Cart
                              </Button> </>)
                             
                            }
                           
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                        </>)
                        :
                        (<></>)
                      }
                      
                     




                    </>
                  )}
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <h2>Reviews</h2>
                  {product.reviews.length === 0 && (
                    <Message>No Reviews</Message>
                  )}
                  <ListGroup variant="flush">
                    {product.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                    {
                   userInfo.role ==="producer" &&  userInfo.isAdmin ? (
                      <>
                        </>
                    ) : (
                      <>
                        <ListGroup.Item>
                          <h2>Write a Customer Review</h2>
                          {successProductReview && (
                            <Message variant="success">
                              Review submitted successfully
                            </Message>
                          )}
                          {loadingProductReview && <Loader />}
                          {errorProductReview && (
                            <Message variant="danger">
                              {errorProductReview}
                            </Message>
                          )}
                          {userInfo ? (
                            <Form onSubmit={submitHandler}>
                              <Form.Group controlId="rating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                  as="select"
                                  value={rating}
                                  onChange={(e) => setRating(e.target.value)}
                                >
                                  <option value="">Select...</option>
                                  <option value="1">1 - Poor</option>
                                  <option value="2">2 - Fair</option>
                                  <option value="3">3 - Good</option>
                                  <option value="4">4 - Very Good</option>
                                  <option value="5">5 - Excellent</option>
                                </Form.Control>
                              </Form.Group>
                              <Form.Group controlId="comment">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  row="3"
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                ></Form.Control>
                              </Form.Group>
                              <Button
                                disabled={loadingProductReview}
                                type="submit"
                                // onSubmit={addbid}
                                variant="primary"
                              >
                                Submit
                              </Button>
                            </Form>
                          ) : (
                            <Message>
                              Please <Link to="/login">sign in</Link> to write a
                              review{" "}
                            </Message>
                          )}
                        </ListGroup.Item>
                      </>
                    )}
                  </ListGroup>
                </Col>
              </Row>
            </>
          )}
        </>
      ) : (
        <>
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Meta title={product.name} />
              <Row>
                <Col md={6}>
                  <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </ListGroup.Item>
                    {
                      // auctions.baseprice ?(<> <ListGroup.Item>Price: {auctions.baseprice}ETB</ListGroup.Item></>):(<><ListGroup.Item>Product is Not For Sale</ListGroup.Item></>)
                    }

                    <ListGroup.Item>
                      Description: {product.description}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to={"/producer"}>Producer: {product.user}</Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                <Col md={3}>
                  {userInfo ? (
                    <>
                      <Card>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <Row>
                              <Col>Price:</Col>
                              <Col>
                                <strong>
                                  {" "}
                                  <input
                                    value={bidprice}
                                    onChange={(e) =>
                                      setbidPrice(e.target.value)
                                    }
                                    name="price"
                                  />{" "}
                                  ETB
                                </strong>
                              </Col>
                            </Row>
                          </ListGroup.Item>

                          <ListGroup.Item>
                            <Row>
                              <Col>Status:</Col>
                              <Col>
                                {
                                  // auctions.isLive   ? 'Auction Open' : 'Auction Not Started'
                                }
                              </Col>
                            </Row>
                          </ListGroup.Item>

                          {product.countInStock > 0 && (
                            <ListGroup.Item>
                              <Row>
                                <Col>Quantity</Col>
                                <Col>
                                  <strong>
                                    {" "}
                                    {
                                      //products.amount
                                    }{" "}
                                    Ton
                                  </strong>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          )}

                          <ListGroup.Item>
                            <Button
                              onClick={bidngHandler}
                              className="btn-block"
                              type="button"
                              disabled={product.countInStock === 0}
                            >
                              Bid
                            </Button>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <h2>Reviews</h2>
                  {product.reviews.length === 0 && (
                    <Message>No Reviews</Message>
                  )}
                  <ListGroup variant="flush">
                    {product.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}

                    <ListGroup.Item>
                      <h2>Write a Customer Review</h2>
                      {successProductReview && (
                        <Message variant="success">
                          Review submitted successfully
                        </Message>
                      )}
                      {loadingProductReview && <Loader />}
                      {errorProductReview && (
                        <Message variant="danger">{errorProductReview}</Message>
                      )}
                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as="select"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="">Select...</option>
                              <option value="1">1 - Poor</option>
                              <option value="2">2 - Fair</option>
                              <option value="3">3 - Good</option>
                              <option value="4">4 - Very Good</option>
                              <option value="5">5 - Excellent</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="comment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                              as="textarea"
                              row="3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Button
                            disabled={loadingProductReview}
                            type="submit"
                            // onSubmit={addbid}
                            variant="primary"
                          >
                            Submit
                          </Button>
                        </Form>
                      ) : (
                        <Message>
                          Please <Link to="/login">sign in</Link> to write a
                          review{" "}
                        </Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductScreen;
