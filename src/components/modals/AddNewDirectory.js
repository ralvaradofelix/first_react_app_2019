import React from 'react';
import Modal from 'react-bootstrap/Modal'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import { withTranslation } from 'react-i18next';


const AddNewDirectory = ({
    //functions parent
    mostrarcarpeta,
    mostrardirectorio,
    nuevacarpeta,
    handlechange,
    title_tmp,
    desc_tmp,
    dir_name,
    editar,
    clicky,
    ...props
  }) => (
    <Modal show={ mostrarcarpeta } onHide={ mostrardirectorio }>
      <Modal.Header closeButton>
          <Modal.Title>{editar ? props.t('Editar Carpeta') :props.t('Crear Carpeta')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">{props.t('Título')}</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                name="title"
                aria-label="Default"
                onChange={ handlechange }
                aria-describedby="inputGroup-sizing-default"
                defaultValue={ title_tmp }
                onKeyPress={event => {
                    if (event.key === "Enter") {
                      nuevacarpeta()
                    }
                  }}
            />
            </InputGroup>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text>{props.t('Descripción')}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                    name="description"
                    as="textarea" 
                    onChange={ handlechange }
                    aria-label="With textarea" 
                    defaultValue={ desc_tmp }
                />
            </InputGroup>
            <label />
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">{props.t('Nombre de la carpeta')}:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    name="carpeta"
                    onChange={ handlechange }
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    defaultValue={ dir_name }
                    onKeyPress={event => {
                      if (event.key === "Enter") {
                        nuevacarpeta()
                      }
                    }}
                    required
                />
            </InputGroup>
      </Modal.Body>
      <Modal.Footer>
          <Button 
          variant="secondary"
          onClick={ mostrardirectorio }
          >
              {props.t('Cancelar')}
          </Button>
          <Button 
          type="input"
          
          variant="primary"
          onClick={ nuevacarpeta }
          >
              {editar ? props.t('Guardar') : props.t('Crear')}
          </Button>
      </Modal.Footer>
    </Modal>
  );

  export default withTranslation()(AddNewDirectory);
