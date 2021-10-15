import React, { Component } from 'react';
import ListFiles from '../components/ListFiles';
import { GetEstadoConeccion } from './../utils/api'
import { Icon } from 'antd'

// ESTO AL FINAL NO ES UN HOOK

export default class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalOpen: false,
            mostrarCrearCarpeta: false,
            isEditing: false,
            viewModalOpen: false,
            conectado: null,
        }
        this.createDirectory = this.createDirectory.bind(this);
        this.changeStateCrearCarpeta = this.changeStateCrearCarpeta.bind(this)
    }
    _handleCloseModal = () => {
        this.setState((prevState, nextProps) => ({
          viewModalOpen: false,
          isEditing: false,
          addModalOpen: false
        }));
      };
    _handleOpenAddModal = () => {
        this.setState((prevState, nextProps) => ({
            addModalOpen: true
        }));
    };
    createDirectory() {
        this.setState({ mostrarCrearCarpeta: true })
        this.state.mostrarCrearCarpeta ? this.setState({ mostrarCrearCarpeta: false }) : this.setState({ mostrarCrearCarpeta: true })
    }
    componentDidMount() {
        GetEstadoConeccion().then(
            (response) => { 
                this.setState({conectado: true})
            },
	        (error) => { 
                this.setState({conectado: false}) 
            }
        )
    }
    changeStateCrearCarpeta() {
        this.setState({ mostrarCrearCarpeta: !this.state.mostrarCrearCarpeta })
    }
    render() {
        if (this.state.conectado === true) {
            return (
                <div className="me">
                    <ListFiles 
                    cerrarSesion={ this.props.cerrarSesion }
                    changeStateMostrarCarpeta={this.changeStateCrearCarpeta}
                    is_admin={this.props.is_admin}
                    ModalOpen= { this.state.addModalOpen }
                    mostrarCrearCarpeta={ this.state.mostrarCrearCarpeta }
                    _handleOpenAddModal={ this._handleOpenAddModal }
                    createDirectory={ this.createDirectory }
                    _handleCloseModal={ this._handleCloseModal}
                    showLogin={this.props.showLogin} />
                </div>
            )
        } else if (this.state.conectado === false ){
            return (<span>Revisa la conexión con el servidor.</span>)
        } else {
            return (<Icon type="loading" />)
        }
    }
}