import React from 'react';
import { Layout, Icon } from 'antd';
import Miniatura from './../Miniatura';
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next';
import { nombre_archivo_logo } from './../../credentials'

const { Header, Content, Sider } = Layout;

const SideBar = props => {
  const { t } = useTranslation();
  return (
    <Layout>
      {nombre_archivo_logo ? (
        <Header style={{ background: '#fff', padding: 0 }}><img alt='imagen' height='50px' src={nombre_archivo_logo} /></Header>
      ):(
        <Header style={{ background: '#fff', padding: 0 }}>
          <img alt='imagen' height='50px' src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/220/card-index-dividers_1f5c2.png" />
        </Header>
      )}
      <Layout className='contenedor'>
        <Content className="contentara" style={{ margin: '28px 16px 0' }}>{props.children} </Content>
        <Sider width="290px" className='sidebara' theme="light" id="sider-menu" breakpoint="lg" collapsedWidth="0">
          <Miniatura
            archivo={ props.archivo }
            creado={ props.creado }
          />
          <div className='nav_sd'>
          {props.is_admin ? (
            <>
            <div className='acceso'>
              {t('Solo tú tienes acceso')}
              <hr />
            </div>
            
            <div className='botones'>
              <p onClick={ props._handleOpenAddModal }>
                <svg width="32" height="32" >
                  <path d="M23 9.5A1.5 1.5 0 0 0 21.5 8h-11A1.5 1.5 0 0 0 9 9.5V13h2v-3h10v12h-8v2h8.5a1.5 1.5 0 0 0 1.5-1.5v-13z"></path>
                  <path d="M13 13h6v1h-6v-1zm0 2h6v1h-6v-1zm6 2h-3v1h3v-1z"></path>
                  <path d="M9.91 15.557a.5.5 0 0 0-.82 0l-2.815 4.021a.25.25 0 0 0 .205.393H8V25h3v-5.029h1.52a.25.25 0 0 0 .205-.393L9.91 15.557z"></path>
                </svg>
                {t('Subir archivo')}
              </p>
              <p onClick={ props.createDirectory }>
                <svg width="32" height="32" viewBox="0 0 32 32" focusable="false">
                  <path d="M22.5 10a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 8 21.5v-12A1.5 1.5 0 0 1 9.5 8H14l2 2h6.5zM10 12v9h12v-9H10z"></path>
                </svg>
                {t('Crear carpeta')}
              </p>
              <p onClick={ props.cerrarSesion }>
              <Icon type="logout" />
                &nbsp;
                {t('Salir')}
              </p>
            </div>    </>
) :
            (            <Button onClick={ props.showLogin} variant="primary"><Icon type="login" />&nbsp;{t('Login')}</Button>
            )
            }
          </div>
        </Sider>
      </Layout>
    </Layout>
  );
};

export default SideBar;