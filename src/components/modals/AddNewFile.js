import React from 'react';
import Modal from 'react-bootstrap/Modal'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import { withTranslation } from 'react-i18next';

const AddNewFile = ({
    //functions parent
    modalOpen,
    onSubmit,
    handleCloseModal,
    onFileChange,
    handlechange,
    ...props
  }) => (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modalOpen} 
      onHide={ handleCloseModal }
  >
    <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">
        {props.t('Añadir nuevo archivo')}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">{ props.t('Título') }</InputGroup.Text>
            </InputGroup.Prepend>
        <FormControl
            name="title"
            aria-label="Default"
            onChange={ handlechange }
            aria-describedby="inputGroup-sizing-default"
        />
        </InputGroup>
        <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text>{ props.t('Descripción') }</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl 
                name="description"
                as="textarea" 
                onChange={ handlechange }
                aria-label="With textarea" 
            />
        </InputGroup>
        <label></label>
        <div className="form-group">
            <input type="file" onChange={onFileChange} required/>
        </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={ handleCloseModal }>
        {props.t('Cerrar')}
      </Button>
      <Button variant="primary" onClick={ onSubmit }>
        {props.t('Subir')}
      </Button>
    </Modal.Footer>
  </Modal>
  );

  // export default AddNewFile;
  export default withTranslation()(AddNewFile);