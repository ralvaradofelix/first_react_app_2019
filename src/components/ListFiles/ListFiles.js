import React, { Component } from 'react';
import { delFile, getFiles_by_ruta, getFolders_by_ruta, getDirectories, ExistsOrNot, delFolder, GetDirectory, GetDataDirectoryById, getNombreBackend, getInfoFolder } from './../../utils/api'
import FilesUploadComponent from './../FilesUploadComponent'
import { Icon, Table, Dropdown, Menu } from 'antd'
import { Link, BrowserRouter } from 'react-router-dom'
import  SideBar  from './../../components/Sidebar';
import BreadCrumbs from '../Breadcrumbs';
import Helpers from './../../utils/helpers'
import { withTranslation } from 'react-i18next';
import { url_backend, titulo_base, description_base, URL_BASE } from './../../credentials'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Alert from 'react-bootstrap/Alert'

class ListFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_tmp: null,
            historial_rutas: '/',
            files: [],
            ruta_actual: '/',
            mensaje_principal: '',
            numero_archivos: 0,
            nivel: 0,
            enlaces: [],
            url_valida: false,
            actual_element: false,
            titulo: titulo_base,
            description: description_base,
            show: this.props.t('Mostrar más'),
            title_tmp: '',
            desc_tmp: '',
            dir_name: '',
            editar: false,
            load_files: true,
            copiar: false,
            enlace_a_copiar: "Error",
            es_archivo: false
        }
        this.child = React.createRef();
        this.UpdateList = this.UpdateList.bind(this);
        this.delete_element = this.delete_element.bind(this)
        this.UpdateRuta= this.UpdateRuta.bind(this)
        this.InstanceElement= this.InstanceElement.bind(this)
        this.ShowDescription= this.ShowDescription.bind(this)
        this.FormatTimestamp= this.FormatTimestamp.bind(this)
        this.ChangeStateEditar= this.ChangeStateEditar.bind(this)
        this.changeCopiar = this.changeCopiar.bind(this)
    }
    HandleMostrar() {
        this.setState({ mostrar_mas: !this.state.mostrar_mas })
    }
    ShowDescription() {
        const ruta = this.state.historial_rutas
        if (ruta !== '/') {
            GetDirectory(ruta).then(res => {
                this.setState({ titulo: res.data.datos[0].title, description: res.data.datos[0].description })
            })
        } else {
            this.setState({ titulo: titulo_base, description: description_base })
        }
    }
    UpdateList() {
        getFolders_by_ruta(this.state.ruta_actual).then(res => {
            const folders = res.data.users
            folders.sort(function(a, b){
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            })
            this.setState({files: folders}, () => {
                getFiles_by_ruta(this.state.ruta_actual).then(res => {
                    const files = res.data.users
                    files.sort(function(a, b){
                        if(a.date > b.date) { return -1; }
                        if(a.date < b.date) { return 1; }
                        return 0;
                    })
                    this.setState({ files: [...this.state.files, ...files], load_files: false })
                })
            });
        })
        this.Lista_enlaces()
    }
    InstanceElement(thing) {
        this.setState({
            actual_element: thing,
        })
    }
    ChangeStateEditar() {
        this.setState({
            id_tmp: null,
            title_tmp: '',
            desc_tmp: '',
            dir_name: '',
            editar: false
        })
    }
    Lista_enlaces() {
        getDirectories().then(res => {
            const files = res.data.users
            var mmn = []
            files.map(el => {
                return mmn.push(el.ruta)
            })
        })
    }
    delete_element(id, tipo) {
        if (tipo === 'file') {
            delFile(id).then( () => {
                this.UpdateList();
            })
        } else {
            delFolder(id).then( () => {
                this.UpdateList();
            })
        }
    }
    componentDidMount() {
        var path, path_real
        var g = false
        path = path_real = decodeURI(window.location.pathname)
        var lastcharacter = path.substring(path.length-1,path.length)
        if (path.indexOf('.pdf') !== -1 || path.indexOf('.jpg') !== -1 || path.indexOf('.png') !== -1 || path.indexOf('.jpeg') !== -1 || path.indexOf('.gif') !== -1 ) {
            this.setState({
                es_archivo_mostrable : true
            }, () => {
                let arr = window.location.pathname.split('/')
                let nombre = decodeURI(arr[arr.length-1])
                console.log(nombre)
                arr.splice(-1,1)
                let ruta = decodeURI(arr.join('/'))
                console.log( ruta + '/')
                getNombreBackend(nombre, ruta + '/').then(res => {
                    console.log(res)
                    console.log("llego")
                    const nom_back = res.data.name
                    this.abrirArchivo(nombre, nom_back)
                    return null
                })
            })
        }
        if (lastcharacter !== '/') {
            let pt = path_real
            path+='/'
            path_real+='/'
            let n = pt.substring(pt.lastIndexOf('/') + 1, pt.length)
            let r = pt.substring(0, pt.lastIndexOf('/')) + '/'
            n = n.replace('%20', ' ')
            n = n.replace('%20', ' ')
            n = n.replace('%20', ' ')
            n = n.replace('%20', ' ')
            getNombreBackend(n, r).then( data => {
                if (!this.state.es_archivo_mostrable) {
                    this.myarchivo(pt.substring(pt.lastIndexOf('/') + 1, pt.length), data.data.name)
                }
                // this.myarchivo(pt.substring(pt.lastIndexOf('/') + 1, pt.length), data.data.name)
                this.setState({ 
                    historial_rutas: r,
                    ruta_actual: r
                }, () => {
                    getInfoFolder(r).then(res => {
                        this.setState({
                            titulo: res.data.datos[0].title,
                            description: res.data.datos[0].description
                        })
                    })
                    this.UpdateList();
                })
                g = true
            })
        }
        if (path === '/') {
            this.setState({ historial_rutas: '/' })
            this.UpdateList(); 
        } else {
            setTimeout(() => {
                if (g === false) {
                    ExistsOrNot(path).then(res => {
                        var r = res.data.datos
                        if(r) {
                            this.setState({ 
                                ruta_actual: path_real,
                                url_valida: true,
                                historial_rutas: path
                            },
                            () => {
                                this.UpdateList(); 
                                this.ShowDescription();
                            })
                        } else {
                            this.setState({ mensaje_principal: 'No existe la carpeta, Error 404'})
                        }
                    })
                }
            }, 1000);
        }
        
    }
    UpdateLevel(num) {
        this.setState({ nivel: num })
    }
    UpdateRuta(string, name, slug) {
        this.setState({
            ruta_actual: slug,
            historial_rutas: slug,
            load_files: true,
        }, () => {
            this.UpdateList();
            this.ShowDescription();
        });
    }
    FormatTimestamp(timestamp) {
        var date = new Date(timestamp)
        var cero = date.getMinutes()
        if (date.getMinutes()<10) {
            cero = '0'+date.getMinutes()
        }
        return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+this.props.t(' a las ')+date.getHours()+':'+cero
    }
    FormatSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
    PreEditar(data) {
        GetDataDirectoryById(data).then(res => {
            this.setState({
                    id_tmp: res.data.datos[0]._id,
                    title_tmp: res.data.datos[0].title,
                    desc_tmp: res.data.datos[0].description,
                    dir_name: res.data.datos[0].name,
                    editar: true
            }, () =>{
                this.props.changeStateMostrarCarpeta()
            })
        })
    }
    PreEliminar(id, tipo){
        this.delete_element(id, tipo)
    }
    getenlace(d) {
        return URL_BASE + d[4] + d[3]
    }
    mensaje_copiado = () => {
        this.setState({
            copiar : true
        })
        setTimeout(() =>{ 
            this.setState({
                copiar : false
            })
         }, 2500);
    }
    GenerarMenu(data) {
        return (
            <Menu>
                { (data[1] === 'folder' && this.props.is_admin===true) ? (
                    <Menu.Item key="0" onClick={ () => 
                            this.PreEditar(data[0])
                        }>
                        <Icon type="edit" />{this.props.t('Editar')}
                    </Menu.Item>) : ''
                }
              { (data[1] === 'file') ? (
                <Menu.Item key="2" onClick={ () =>
                    this.myarchivo(data[3], data[2])
                }>
                    <Icon type="download" />{this.props.t('Descargar')}
                </Menu.Item>
                ) : ''
              }
              { (data[1] === 'file') ? (
                <CopyToClipboard text={ this.getenlace(data) }>
                    <Menu.Item key="12" onClick={ this.mensaje_copiado } >
                        <Icon type="link" />{this.props.t('Copiar enlace')}
                    </Menu.Item>
                </CopyToClipboard>
                ) : ''
              }
              { (this.props.is_admin===true) ?
                <Menu.Item key="1" onClick={ () => {
                    if (window.confirm("Seguro que quieres eliminar este elemento?")) this.PreEliminar(data[0], data[1])
                }}>
                    <Icon type="delete" />{this.props.t('Eliminar')}
                </Menu.Item>
              : ""}
              
            </Menu>
        )
    }
    changeCopiar = () => {
        this.setState({
            copiar: !this.state.copiar
        })
    }

    abrirArchivo = (nombre,archivo_ruta) => {
        if (nombre.toLowerCase().indexOf('.pdf') !== -1 || nombre.toLowerCase().indexOf('.jpg') !== -1 || nombre.toLowerCase().indexOf('.png') !== -1 || nombre.toLowerCase().indexOf('.jpeg') !== -1 || nombre.toLowerCase().indexOf('.gif') !== -1 ) {
            Helpers.httpRequest(
                url_backend+`api/download?ruta=${archivo_ruta}`,
                'get',
              )
              //Convertir datos a blob para poder descargarlos
              // 1. Convert the data into 'blob'
              .then((response) => response.blob())
              .then((blob) => {
               
                // 2. Create blob link to download
                let enlace = null
                if (nombre.toLowerCase().indexOf('.pdf') !== -1) {
                    const file = new Blob(
                        [blob], 
                        {type: 'application/pdf'});
                    enlace = URL.createObjectURL(file);
                } else if (nombre.toLowerCase().indexOf('.jpg') !== -1) {
                    const file = new Blob(
                        [blob],
                        {type: 'image/jpg'});
                    enlace = URL.createObjectURL(file);
                } else if (nombre.toLowerCase().indexOf('.png') !== -1) {
                    const file = new Blob(
                        [blob],
                        {type: 'image/png'});
                    enlace = URL.createObjectURL(file);
                } else if (nombre.toLowerCase().indexOf('.jpeg') !== -1) {
                    const file = new Blob(
                        [blob],
                        {type: 'image/jpeg'});
                    enlace = URL.createObjectURL(file);
                } else if (nombre.toLowerCase().indexOf('.gif') !== -1) {
                    const file = new Blob(
                        [blob],
                        {type: 'image/gif'});
                    enlace = URL.createObjectURL(file);
                } else {
                    const file = new Blob(
                        [blob]);
                    enlace = URL.createObjectURL(file);
                }
                const link = document.createElement('a');
                link.href = enlace;
                link.setAttribute('download', `${nombre}`);
                // 3. Append to html page
                document.body.appendChild(link);
                // 4. Force download
                window.location.href = enlace
                // link.click(); //Esto es para poder descargarlo
                // 5. Clean up and remove the link
                link.parentNode.removeChild(link);
                this.setState({
                  loading: false
                });
              })
              /*.catch((error) => {
                error.json().then((json) => {
                  this.setState({
                    errors: json,
                    loading: false
                  });
                })
              }); */
        } else {
            this.myarchivo(nombre, archivo_ruta)
        }
    }

    myarchivo = (nombre,archivo_ruta) => {
        Helpers.httpRequest(
            url_backend+`api/download?ruta=${archivo_ruta}`,
            'get',
          )
          //Convertir datos a blob para poder descargarlos
          // 1. Convert the data into 'blob'
          .then((response) => response.blob())
          .then((blob) => {
           
            // 2. Create blob link to download
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${nombre}`);
            // 3. Append to html page
            document.body.appendChild(link);
            // 4. Force download
            link.click(); //Esto es para poder descargarlo
            // 5. Clean up and remove the link
            link.parentNode.removeChild(link);
            this.setState({
              loading: false
            });
          })
          /*.catch((error) => {
            error.json().then((json) => {
              this.setState({
                errors: json,
                loading: false
              });
            })
          }); */
    }


    render() {
        const es_archivo = this.state.es_archivo
        const columns = [
            {
                title: this.props.t('Nombre'),
                dataIndex: 'nombre',
                render: files => {
                    if(files[1] === 'folder') {
                        return (
                            <span className="latabla">
                                <Link onClick={() =>
                                    this.UpdateRuta(files[2]+files[0]+'/', files[0], files[3])
                                } to={ files[3] } className="link">
                                    <svg width="40" height="40" viewBox="0 0 40 40" focusable="false"role="img">
                                        <g fill="none" fillRule="evenodd">
                                            <path d="M18.422 11h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 32 5 31.331 5 30.507V9.493C5 8.663 5.671 8 6.5 8h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z" fill="#71B9F4"></path>
                                            <path d="M18.422 10h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 31 5 30.331 5 29.507V8.493C5 7.663 5.671 7 6.5 7h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z" fill="#92CEFF"></path>
                                        </g>
                                    </svg>
                                    &nbsp;{ files[0] }
                                    <br />
                                    <small className="small_mobile">Subido el 13 de Junio</small>
                                </Link>
                            </span>
                        )
                    } else {
                        return (
                            <span className='file_style' onClick= { () => this.abrirArchivo(files[0],files[2]) }>
                                { (files[0].substr(-4, 4)) === '.pdf' ? (
                                <svg width="40" height="40" viewBox="0 0 40 40" focusable="false" role="img">
                                    <defs>
                                        <rect id="mc-content-pdf-small-b" x="8" y="5" width="24" height="30" rx="1.5"></rect>
                                        <filter x="-2.1%" y="-1.7%" width="104.2%" height="106.7%" filterUnits="objectBoundingBox" id="mc-content-pdf-small-a">
                                            <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                            <feColorMatrix values="0 0 0 0 0.858859196 0 0 0 0 0.871765907 0 0 0 0 0.884672619 0 0 0 1 0" in="shadowOffsetOuter1"></feColorMatrix>
                                        </filter>
                                    </defs>
                                    <g fill="none" fillRule="evenodd">
                                        <g>
                                            <use fill="#000" filter="url(#mc-content-pdf-small-a)" href="#mc-content-pdf-small-b"></use>
                                            <use fill="#F7F9FA" href="#mc-content-pdf-small-b"></use>
                                        </g>
                                        <path d="M14.768 22.003h-.704V24h-1.312v-6.12h2.128c1.328 0 2.173.576 2.173 1.992 0 1.488-.917 2.131-2.285 2.131zm-.704-1.006h.792c.68 0 1.072-.413 1.072-1.125 0-.752-.392-.887-1.056-.887h-.808v2.012zM18.011 24v-6.12H20.1c1.808 0 2.576 1.256 2.576 3.047 0 1.791-.752 3.073-2.544 3.073h-2.12zm1.244-1.131h.82c1.056 0 1.274-.817 1.274-1.942s-.266-1.942-1.274-1.942h-.86l.04 3.884zm6.019-1.155V24h-1.252v-6.12h3.741v1.105h-2.49v1.745h2.346v.984h-2.345z" fill="#F25123"></path>
                                    </g>
                                </svg>
                                ) : (
                                    <svg width="40" height="40" viewBox="0 0 40 40" focusable="false" role="img">
                                        <path d="M8 6.5A1.5 1.5 0 0 1 9.5 5h21A1.5 1.5 0 0 1 32 6.5v27a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 8 33.5v-27z" fill="#F7F9FA" filter="url(#mc-content-xls-small-a)"></path>
                                        <path d="M16.333 17H15l1.333 3L15 23h1.333L17 21l.667 2H19l-1.333-3L19 17h-1.333L17 19l-.667-2z" fill="#fff"></path>
                                        <defs>
                                            <filter id="mc-content-xls-small-a" x="8" y="5" width="24" height="31" filterUnits="userSpaceOnUse" >
                                                <feFlood result="BackgroundImageFix"></feFlood>
                                                <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                                                <feOffset dy="1"></feOffset>
                                                <feColorMatrix values="0 0 0 0 0.858859 0 0 0 0 0.871766 0 0 0 0 0.884673 0 0 0 1 0"></feColorMatrix>
                                                <feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend>
                                                <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend>
                                            </filter>
                                        </defs>
                                    </svg>
                                ) }
                                &nbsp;{ files[0] }
                                <br />
                                <small className="small_mobile">Subido el 13 de Junio</small>
                            </span>
                        )
                    }
                }
            },





            {
                title: this.props.t('Fecha de subida'),
                dataIndex: 'subida',
                className: "remp",
                render: data => (
                    <span>
                        { this.FormatTimestamp(data) }
                    </span>
                )
            },
            {
                title: this.props.t('Tipo'),
                dataIndex: 'tipo',
                className: "remp",
                rowClassName: 'latabla',
                render: d => {
                    return this.props.t(d)
                }
            },
            {
                title: this.props.t('Peso'),
                dataIndex: 'peso',
                className: "remp_pes",
                rowClassName: 'latabla'
            },
            {
                title: this.props.t('Acciones'),
                dataIndex: 'acciones',
                render: data => (
                    <span>
                        { this.props.is_admin ? 
                            <Dropdown overlay={this.GenerarMenu(data)} trigger={['click']}>
                                <span className="acciones">
                                    ...
                                </span>
                            </Dropdown>
                            :
                            ( data[1] === "folder" ) ?
                                <span>-</span>
                                :
                                <Dropdown overlay={this.GenerarMenu(data)} trigger={['click']}>
                                    <span className="acciones">
                                        ...
                                    </span>
                                </Dropdown>
                        }
                    </span>
                )
              },
          ];
        var data = []
        this.state.files.map((file) => {
        let arr = null
        if(typeof file.original === 'undefined'){
            arr = [{ 
                key: file._id,
                nombre: [file.name, 'folder', file.ruta, file.slug],
                subida: file.date,
                tipo: 'Folder',
                peso: '-',
                titulo: file.title,
                description: file.description,
                acciones: [file._id, 'folder']
            }]
        } else {
            arr = [{ 
                key: file._id,
                nombre: [file.original, 'file', file.name],
                subida: file.date,
                titulo: file.title,
                description: file.description,
                tipo: 'Archivo',
                peso: this.FormatSize(file.size),
                acciones: [file._id, 'file', file.name, file.original, file.ruta]
            }]
        }
        return data = [...data, ...arr]
        })

        return (
            <>
                { es_archivo ? <h1>Esto es un archivo</h1> :
                    <>
                    {this.state.copiar ? <Alert className="alertCopiado" variant="success">Enlace copiado</Alert> : ''}
                <SideBar
                cerrarSesion={ this.props.cerrarSesion }
                is_admin={this.props.is_admin}
                createDirectory={ this.props.createDirectory }
                _handleOpenAddModal={ this.props._handleOpenAddModal }
                archivo={ this.state.actual_element }
                creado={ this.FormatTimestamp }
                showLogin={this.props.showLogin}
                >
                    <FilesUploadComponent
                        id_tmp = { this.state.id_tmp }
                        title_tmp = { this.state.title_tmp }
                        desc_tmp = { this.state.desc_tmp}
                        dir_name = { this.state.dir_name }
                        editar = { this.state.editar }
                        cambiarestado = { this.ChangeStateEditar }
                        changeStateMostrarCarpeta = { this.props.changeStateMostrarCarpeta } //mostrar carpeta
                        ref={this.child}
                        update={ this.UpdateList }
                        mostrarCrearCarpeta={ this.props.mostrarCrearCarpeta }
                        nivel= { this.state.nivel }
                        ruta= { this.state.ruta_actual }
                        _handleOpenAddModal = { this.props._handleOpenAddModal }
                        ModalOpen={ this.props.ModalOpen }
                        createDirectory={ this.props.createDirectory }
                        _handleCloseModal={ this.props._handleCloseModal }
                    />
                    <BreadCrumbs
                        historial={ this.state.historial_rutas }
                        upd={ this.UpdateRuta }
                    />
                    <BrowserRouter>
                    <span>{ this.state.mensaje_principal }</span>
                    <div className='contenedor_desc_carpeta'>
                        <div className='descripcion'>
                            <span className='titulo_descripcion'>{ this.state.titulo }</span>
                        </div>
                        <hr className='descripcionhr' />
                        <span className='description_mini'>{ this.state.description }</span>
                    </div>
                    <Table 
                        loading={ this.state.load_files }
                        pagination={ false }
                        columns={columns} 
                        dataSource={data}
                        rowClassName={(record, rowIndex) => {
                            return record.nombre[1] === 'folder' ? 'latabla' : ''
                        }}
                        onRow={(record,rowIndex) => ({
                            onClick: () => {
                                this.InstanceElement(record)
                            }
                        })}
                        />
                    </BrowserRouter>
                </SideBar>
                </>
                }
            </>
        )
    }
}
export default withTranslation()(ListFiles);