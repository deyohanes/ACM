import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";
import axios from "axios";

const Bids = ({ history }) => {
  const dispatch = useDispatch();
  const [warehouseName, setwarehouseName] = useState([]);

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  async function getWarehouse() {
    try {
      const response = await axios.get("/api/products/auction/all");
      setwarehouseName(response.data);

      //        const response = await axios.get("/api/products/auction/byid",userInfo._id);

      // console.log(warehouseName);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getWarehouse();
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

 
  async function closeBId(timer) {
    // const {data} ={ timer}
     try {
         const response = await axios.put("/api/products/auction/verify",timer);
          //console.log(req.params)
          
 
 //        const response = await axios.get("/api/products/auction/byid",userInfo._id);
 
      // console.log(warehouseName);
  
     } catch (error) {
       console.error(error);
     }
   }


  return (
    <>
      <h1>Bids</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>PRODUCT NAME</th>
              <th>PRODUCER</th>
              <th>BASEPRCE</th>
              <th>AMOUNT</th>
              <th>IsActive</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {warehouseName.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.name}</td>
                <td>{order.user}</td>
                <td>{order.baseprice}ETB</td>
                <td>{order.amount}</td>
                <td>
                  {order.isLive ? (
                    <i class="fa fa-play" aria-hidden="green"></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  {order.isLive ? (
                    <>
                      <LinkContainer to={`/close/${order._id}`}>
                        <Button onClick={closeBId(order._id)} variant="Close" className="btn-sm">
                          Close
                        </Button>
                      </LinkContainer>
                    </>
                  ) : (
                    <>
                      <LinkContainer to={`/verifypost/${order._id}`}>
                        <Button variant="light" className="btn-sm">
                          verify
                        </Button>
                      </LinkContainer>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Bids;