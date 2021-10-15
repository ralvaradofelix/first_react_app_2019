import React, { Component } from 'react';
import Group from '../../hooks/Group'
import Login from './../../components/modals/Login';
import { usuario, password } from '../../credentials'
import { withTranslation } from 'react-i18next';
class Principal extends Component {
    constructor(props) {
        super(props);
        this.psw= password;
        this.usr = usuario;
        this.state = {
            form:{
                usuario:'',
                password:''
            },
            loading: false, // to keep track of when form submitted
            errors: null, // for displaying errors
            file: '', // the file type the user chooses to download
            is_admin: (localStorage.getItem('logeado') === "true"),
            show_login: false,
        }
        this.estado_login= this.estado_login.bind(this)
        this.onHandleChange=this.onHandleChange.bind(this)
        this.submitLogin=this.submitLogin
        this.cerrarSesion=this.cerrarSesion.bind(this)
    }
    
    estado_login = () => {
        this.setState({
            show_login : !this.state.show_login,
        })
    }
    onHandleChange(e) {
        e.persist();
        this.setState((prevState, nextProps) => ({
            form: { ...prevState.form, [e.target.name]: e.target.value }
          }));
    }
    submitLogin = () => {

        if( this.state.form.usuario=== this.usr && this.state.form.password === this.psw ) {
            this.setState({is_admin: true})
            localStorage.setItem('logeado', true);
            this.estado_login()
        } else {
            alert(this.props.t('Usuario o contraseña incorrectos!'))
        }
    }
    cerrarSesion = () => {
        this.setState({
            is_admin: false,
        }, () => {
            localStorage.removeItem('logeado')
        })

    }
    render() {
        return (
            <div>
                <div className='contenedor_principal'>
                    <Login mostrar={this.state.show_login} showLogin={this.estado_login} submitLogin={this.submitLogin} handlechange={this.onHandleChange}/>
                    <Group cerrarSesion={this.cerrarSesion} is_admin={this.state.is_admin} showLogin={this.estado_login} />
                </div>
            </div>
        )
    }
}
export default withTranslation()(Principal);