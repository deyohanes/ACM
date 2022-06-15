import React from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { closeBids } from "../actions/productActions";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { axios } from 'axios';


const SingleBid = ({order}) => {
    const dispatch = useDispatch();
    const {ids} = useParams();
    const a  = ids
    const auctionId ={
        "auctionId" : a
    }
    const closebid = (id) => {
     
        if (window.confirm("Are You Sure")) {
            // axios.put(`/auction/close/${id}`);
           dispatch(closeBids(id));
            window.location.reload();
        }
    }

    return (
        <tbody>
            <tr>
            <td>{order._id}</td>
            <td>{order.name}</td>
            <td>{order.user}</td>
            <td>{order.currentBidder}</td>
            <td>{order.baseprice}ETB</td>
            <td>{order.amount}</td>
            
            <td>
                {order.isLive ? (
                <i className="fa fa-play" aria-hidden="green"></i>
                ) : (
                <>
                {
                order.isPosted ?
                    (<><i class="fa fa-spinner" aria-hidden="true"></i></>) : 
                (<><i className="fas fa-times" style={{ color: "red" }}></i></>)
                }
                </>
                //<i className="fas fa-times" style={{ color: "red" }}></i>
                )}
            </td>

            <td>
                {
                order.isLive ? 
                    <>           
                      <LinkContainer to={`/bids/${order._id}`}>
                      <div className="custom-button" onClick={() => closebid(order._id)}>
                            Close
                        </div>
                        </LinkContainer>
                       
                    </>
                    : 
                    <>
                        <LinkContainer to={`/verifypost/${order._id}`}>
                        <Button 
                            variant="light" className="btn-sm">
                            verify
                        </Button>
                        </LinkContainer>
                    </>
                }
            </td>
            </tr>
          </tbody>
    )
}

export default SingleBid;