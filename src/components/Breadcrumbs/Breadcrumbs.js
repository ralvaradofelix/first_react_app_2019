import React, { Component } from 'react';
import { Link, BrowserRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next';
import { directorio_base } from './../../credentials'

class BreadCrumbs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ruta : '',
        }
    }
    newRuta(i,bread) {
        let me = ''
        bread.map((val, index) => {
            if (index<=i) {
                if (index===1) {
                    if(i===1) {
                        me+=val+'/'
                    } else {
                        me+=val
                    }
                }
                else if(index===0) {
                    me+=val
                }
                else if(index === i) {
                    me+='/'+val+'/'
                }
                else {
                    me+='/'+val
                }
            }
            //?this return
            return me
        })
        return me
    }
    render() {
        var bread = []
        if (typeof this.props.historial !== 'undefined' ) {
            bread = this.props.historial.split('/').filter(e => e !== '')
            bread.splice(0,0,'/')
        }
        return (
            <div className='Breadcrumbs'>
                <BrowserRouter>
                { bread.map( (miga,index) => {
                    if (index===bread.length-1) {
                        return <Link key={ index } to={ () => 
                            this.newRuta(index,bread)
                            //GUARRADA (replace, en caso que el nombre de la carpeta tenga'_' los sustituira igualmente, revisar(lo suyo seria usar la ruta de mongo))
                         } className="link"><span className='lastBread'>{ (miga === '/') ? directorio_base: miga.replace('_', ' ') }</span></Link>
                    }
                    else {
                        return <span key={ index }><Link  to={ () => 
                            this.newRuta(index,bread)
                         } className="link"><span onClick={ () =>
                            this.props.upd(this.newRuta(index,bread), miga, this.newRuta(index,bread))
                        } key={ index }>{ (miga === '/') ? directorio_base: miga.replace('_', ' ') }  </span></Link>&nbsp;>&nbsp;</span>
                    }
                 }
                    ) }
                </BrowserRouter>
            </div>
        )
    }
}
export default withTranslation()(BreadCrumbs);