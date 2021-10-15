import React, { Component, Fragment } from 'react';
import { saveFile, saveDirectory, UpdateDirectoryById } from './../../utils/api'
import AddNewFile from './../modals/AddNewFile'
import AddNewDirectory from './../modals/AddNewDirectory'

export default class FilesUploadComponent extends Component {

    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
        this.newDirectory=this.newDirectory.bind(this)
        this.onSubmitCarpeta=this.onSubmitCarpeta.bind(this)
        this.cerrarModal = this.cerrarModal.bind(this)

        this.state = {
            profileImg: '',
            form: {
                title: this.props.title_tmp,
                description: this.props.desc_tmp,
                carpeta:this.props.dir_name
            }
        }
    }
    onHandleChange(e) {
        e.persist();
        this.setState((prevState, nextProps) => ({
            form: { ...prevState.form, [e.target.name]: e.target.value }
          }));
    }

    onFileChange(e) {
        this.setState({ profileImg: e.target.files[0] })
    }

    onSubmit(e) {
        var fecha = Date.now()
        e.preventDefault()
        const formData = new FormData()
        formData.append(
            'profileImg', this.state.profileImg,
        )
        formData.append(
            'title',this.state.form.title
        )
        formData.append(
            'description',this.state.form.description
        )
        formData.append(
            'ruta',this.props.ruta
        )
        formData.append(
            'fecha',fecha
        )
        saveFile(formData).then(res => {
            this.props.update()
        })
        this.props._handleCloseModal()
    }
    onSubmitCarpeta(e) {
        var fecha = Date.now()
        let ruta = ''
        if (this.props.ruta === '/') {
            ruta = this.props.ruta
        } else {
            ruta = this.props.ruta
        }
        if (this.props.editar) {
            var title = (this.state.form.title !== this.props.title_tmp && this.state.form.title!=='')? this.state.form.title : this.props.title_tmp
            var descripcio = (this.state.form.description !== this.props.desc_tmp && this.state.form.description !== '')? this.state.form.description : this.props.desc_tmp
            var carpeta = (this.state.form.carpeta !== this.props.dir_name && this.state.form.carpeta !== '')? this.state.form.carpeta : this.props.dir_name
            UpdateDirectoryById(this.props.id_tmp, title, descripcio, carpeta).then(res => {
                this.props.cambiarestado()
                this.props.createDirectory()
                this.props.update()    
            })
        } else {
            saveDirectory(this.state.form, this.props.nivel, fecha,ruta).then(res => {
                this.props.createDirectory()
                this.props.update()
            })
        }
    }
    newDirectory() {
        this.props.createDirectory()
    }
    cerrarModal() {
        this.props.cambiarestado()
        this.props.createDirectory()
    }

    clicky(target){
        return
    }

    render() {
        return (
            <Fragment>
                <AddNewFile
                    onSubmit={ this.onSubmit }
                    modalOpen={ this.props.ModalOpen }
                    onFileChange={ this.onFileChange }
                    handleCloseModal={ this.props._handleCloseModal }
                    handlechange={ this.onHandleChange }
                />
                <AddNewDirectory
                    clicky= {this.clicky}
                    dir_name= { this.props.dir_name}
                    title_tmp= { this.props.title_tmp}
                    desc_tmp= { this.props.desc_tmp}
                    editar = { this.props.editar }
                    mostrarcarpeta={ this.props.mostrarCrearCarpeta }
                    mostrardirectorio={ this.cerrarModal }
                    nuevacarpeta={ this.onSubmitCarpeta }
                    handlechange={ this.onHandleChange }
                />
            </Fragment>
        )
    }
}