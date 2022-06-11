import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { updateProduct } from "../actions/productActions";

const NewProduct = ({ match, history }) => {
  const productId = match.params.id;
  const [commudity, setCommudity] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [commudityName, setCommudityName] = useState([]);
  const [warehouseName, setwarehouseName] = useState([]);
  const [producer, setProducer] = useState("");
  const [symbol, setSymbol] = useState("");
  const [level, setLevel] = useState("");
  const [market, setMarket] = useState("");
  const [producerid, setProducerid] = useState("");
  const [levels] = [1, 2, 3, 4, 5];

  async function getCommudity() {
    try {
      const response = await axios.get("/api/commodity");
      const name = response.data;
      console.log(name);
      setCommudityName(name);
      setSymbol(name.symbol)
    } catch (error) {
      console.error(error);
    }
  }

  async function getid(email) {
    try {
      const response = await axios.get("/api/users/ider", email);
      const name = response.data._id;
      setProducerid(name);
    } catch (error) {
      console.error(error);
    }
  }

  async function getWarehouse() {
    try {
      const response = await axios.get("/api/warehouse");
      const warehouseName = response.data;
      console.log(warehouseName);
      setwarehouseName(warehouseName);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCommudity();
    getWarehouse();
  }, []);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  async function addproduct() {
    try {
        await axios({
            method: 'post',
            url: '/api/product/new',
            data: {
              producer:  producer,
              commudity: commudity,
              symbol: "symbol",
              warehouse : "warehouse",
              image: image,
              orgin: brand,
              countInStock:countInStock ,
              level: level,
              description: "description",
              market: market,
              category: category
               
            }
          });
    } catch (error) {
      console.error(error);
    }
  }
  const submitHandler = (e) => {
    e.preventDefault();
    //const id = getid(email)
setDescription(description)
addproduct()
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Add Product</h1>

        <Form onSubmit={submitHandler}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Commudity Name</Form.Label>
              <Form.Control
                as="select"
                value={commudity}
                onChange={(e) => setCommudity(e.target.value)}
              >
                {commudityName.map((data) => (
                  <option key={data._id} value={commudityName.value}>
                    {data.commoditieName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Commudity Symbol</Form.Label>
              <Form.Control
                as="select"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              >
                {commudityName.map((data) => (
                  <option key={data._id} value={commudityName.value}>
                    {data.symbol}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>WareHouse Symbol</Form.Label>
              <Form.Control
                as="select"
                placeholder="warehouse"
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
              >
                {warehouseName.map((data) => (
                  <option key={data._id} value={warehouseName.value}>
                    {data.warehouseSymbol}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Row>

          <Form.Group controlId="brand">
            <Form.Label>Producer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Producer ID"
              value={producer}
              onChange={(e) => setProducer(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.File
              id="image-file"
              label="Choose File"
              custom
              onChange={uploadFileHandler}
            ></Form.File>
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Orgin</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Orgin"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>Amount In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <ListGroup.Item>
              <Row>
                <Col>Level</Col>
                <Col>
                  <Form.Control
                    as="select"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Market</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              disabled
              placeholder="Enter description"
              value={"Level "+brand + "  " + level + " " + category + "  " + market}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            ADD
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default NewProduct;
