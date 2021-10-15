import React from 'react';
import Modal from 'react-bootstrap/Modal'
import { Button, InputGroup, FormControl } from 'react-bootstrap'

const Login = (props) => (
    <Modal show={ props.mostrar } onHide={ props.showLogin }>
      <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body className='input_login'>
      <InputGroup size="sm" className="mb-3">
          Usuario:&nbsp;
        <FormControl
            aria-label="Small"
            name='usuario'
            onChange={ props.handlechange }
            aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
      <InputGroup size="sm" className="mb-3">
          Contraseña:&nbsp;
        <FormControl
            type='password'
            name='password'
            aria-label="Small"
            onChange={ props.handlechange }
            aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
      </Modal.Body>
      <Modal.Footer>
          <Button 
          variant="secondary"
          onClick={ props.showLogin }
          >
              Cancelar
          </Button>
          <Button 
          variant="primary"
          onClick={ props.submitLogin }
          >
              Entrar
          </Button>
      </Modal.Footer>
    </Modal>
  );

  export default Login;