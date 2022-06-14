import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rate from './Rate'

import { Button } from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rate
           
            text={`${product.description}`}
            
          />
        </Card.Text>

        <Card.Text as='h3'>
            <>{ }
            </>
          {product.currentPrice}ETB
        {
          product.isLive ? (<> <Button  variant="success">Open</Button></>) : (<>  <Button disabled variant="danger">Not Started</Button></>)
        }
   </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
