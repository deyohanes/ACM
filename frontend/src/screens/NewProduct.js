import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col ,Row   } from "react-bootstrap";
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

  

  async function getCommudity() {
    try {
      const response = await axios.get("/api/commodity");
      const name = response.data;
      console.log(name);
      setCommudityName(name);
      
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

  const submitHandler = (e) => {
    e.preventDefault();

    updateProduct({
      _id: productId,
      commudity,
      warehouse,
      image,
      brand,
      category,
      description,
      countInStock,
    });
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
      <select
              className="formitemss"
              type="text"
              value={commudity}
              onChange={(e) => setCommudity(e.target.value)}
            >
              {commudityName.map((data) => (
                <option key={data._id} value={commudityName.value}>
                  {data.commoditieName}
                </option>
              ))}
            </select>
    </Form.Group>
    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Commudity Symbol</Form.Label>
      <select
              className="formitemss"
              type="text"
              value={commudity}
              onChange={(e) => setCommudity(e.target.value)}
            >
              {commudityName.map((data) => (
                <option key={data._id} value={commudityName.value}>
                  {data.Symbol}
                </option>
              ))}
            </select>
    </Form.Group>
   
 

          <Form.Group as={Col} controlId="name">
            <label className="formitems" htmlFor="">
              Warehouse
            </label>
            <select
              className="formitemss"
              type="text"
              placeholder="warehouse"
              value={warehouse}
              onChange={(e) => setWarehouse(e.target.value)}
            >
              {warehouseName.map((data) => (
                <option key={data._id} value={warehouseName.value}>
                  {data.warehouseSymbol}
                </option>
              ))}
            </select>
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
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
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
