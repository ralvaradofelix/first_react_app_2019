import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class Miniatura extends Component {
  // constructor(props) {
  //   super(props);
  // }
  imagen_miniatura(tipo) {
    if (tipo === 'Archivo') {
      return (
        <svg width="80" height="80" viewBox="0 0 40 40" focusable="false" role="img">
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
      )
    } else if(tipo === 'Folder') {
      return (
        <svg width="80" height="80" viewBox="0 0 40 40" focusable="false"role="img">
            <g fill="none" fillRule="evenodd">
                <path d="M18.422 11h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 32 5 31.331 5 30.507V9.493C5 8.663 5.671 8 6.5 8h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z" fill="#71B9F4"></path>
                <path d="M18.422 10h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 31 5 30.331 5 29.507V8.493C5 7.663 5.671 7 6.5 7h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z" fill="#92CEFF"></path>
            </g>
        </svg>
      )
    } else {
      return ''
    }
  }
  render() {
    if(typeof this.props.archivo !== 'undefined' && this.props.archivo !== false) {
      // console.log(this.props.archivo.description)
      return (
        <div className='miniatura'>
          <div className='miniatura_image'>
            { this.imagen_miniatura(this.props.archivo.tipo) }
          </div>
          <div className='miniatura_nombre'><p>{ (this.props.archivo.nombre[0].length <= 20 ) ? this.props.archivo.nombre[0] : this.props.archivo.nombre[0].substr(0,20)+'...' }</p></div>
          <div className='miniatura_titulo'>
            { (this.props.archivo.titulo.length <= 18) ? this.props.archivo.titulo : this.props.archivo.titulo.substr(0,18)+'...' }
          </div>
          <div className='miniatura_descripcion'>
            { (this.props.archivo.description.length <= 30) ? this.props.archivo.description : this.props.archivo.description.substr(0,28)+'...' }
          </div>
          <div className="miniatura_fecha">
            {this.props.t('Creado')}: {this.props.creado(this.props.archivo.subida)}
          </div>
        </div>
      )
    } else {
      return (
        <div className='miniatura'>
          <div className='miniatura_vacia'>{this.props.t('Selecciona un archivo para ver más detalles')}</div>
        </div>
      )
    }
  }
}
export default withTranslation()(Miniatura);