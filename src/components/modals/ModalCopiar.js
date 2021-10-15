import React from 'react';
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'

const Login = (props) => (
    <Modal show={props.show} onHide={props.cerrar}>
        <Modal.Header closeButton>
          <Modal.Title>Enlace</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ props.enlace }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.cerrar}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
  );

  export default Login;