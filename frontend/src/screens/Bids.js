import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";
import axios from "axios";
//import { closeBids } from "../actions/productActions";
import SingleBid from "../components/SingleBid";


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
     // console.log(response);
      setwarehouseName(response.data);
      //        const response = await axios.get("/api/products/auction/byid",userInfo._id);
      // console.log(warehouseName);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getWarehouse();
   
  }, []);

 
  // const closeBId = (id) =>{
  //   // const {data} ={ timer}
  //   // if (window.confirm('Are you sure')) {
  //     try {
  //         axios.put(`/api/products/auction/close/${id}`);

 
  //   } catch (error) {
  //     console.error(error);
  //  // }
  //   }
  //  }


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
              <th>Lastest</th>
              <th>BASEPRCE</th>
              <th>AMOUNT</th>
              <th>IsActive</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {
            warehouseName.map(order => (
              <SingleBid key={order._id} order={order} />
            ))
          }
        </Table>
      )}
    </>
  );
};

export default Bids;
