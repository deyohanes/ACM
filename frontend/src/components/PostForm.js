import {Modal,Button,Form,FormLabel } from 'react-bootstrap';
import React  from "react";

const  PostForm= (detail) =>{
  return (
    <Modal
      {...detail}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      

      <Form>
          <FormLabel
            controlId="floatingTextarea"
            label="Comments"
            className="mb-3"
          >
            <Form.Control as="textarea" placeholder="Leave a comment here" />
          </FormLabel>
          <FormLabel
            controlId="floatingTextarea"
            label="Comments"
            className="mb-3"
          >
            <Form.Control as="textarea" placeholder="Leave a comment here" />
          </FormLabel>
          <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form>



      <Modal.Footer>
        <Button onClick={detail.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
 export default PostForm
 


 
 /*import { Button, Modal , FormLabel } from "react-bootstrap";
   import Form from 'react-bootstrap/Form';
   
import React from "react";

const PostForm = ({ detail }) => {

  return (
    <>
      <Modal.Dialog>
         
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form>
          <FormLabel
            controlId="floatingTextarea"
            label="Comments"
            className="mb-3"
          >
            <Form.Control as="textarea" placeholder="Leave a comment here" />
          </FormLabel>
          <FormLabel
            controlId="floatingTextarea"
            label="Comments"
            className="mb-3"
          >
            <Form.Control as="textarea" placeholder="Leave a comment here" />
          </FormLabel>
          <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </>
  );
};

export default PostForm;
*/