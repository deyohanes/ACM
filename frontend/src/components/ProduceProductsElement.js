import { LinkContainer } from 'react-router-bootstrap'
import {  FaShareAlt } from "react-icons/fa";
import { 
    Button,} from 'react-bootstrap'

import React from "react";
 import PostForm from '../screens/PostForm';


const ProduceProductsElement = ({detail}) => {
    const [modalShow, setModalShow] = React.useState(false);

    const postAuction = async () => {
    //     const pid = product._id
    //     const uid = userInfo._id
    //     const bd = parseInt(bidprice)

    //   const  data = {
    //     "id": pid,
    //     "userId": uid,
    //     "price": bd
    //     }
    //   await axios.post("/api/products/auction/placebid",data)
    }

    return (
        <tr>
            <td>{detail._id}</td>
            <td>{detail.name}</td>
            <td>{detail.countInStock}</td>
            <td>{detail.symbol}</td>
            <td>{detail.warehouseSymbol}</td>
            <td>
            <LinkContainer to={`/postform/${detail._id}`}>
                <Button  
              //  {  postAuction(); }
            
                variant='light' className='btn-sm'>
                <FaShareAlt/>POST
                </Button>
            </LinkContainer>
            </td>
        </tr>
    )
}

export default ProduceProductsElement;