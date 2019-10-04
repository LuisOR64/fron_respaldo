import './CuadroDeComandoAdministradores.css'

import React, {Component} from 'react';
import servicio_token from './../../../../servicios/servicio_token';
import {withRouter, Redirect, Link} from 'react-router-dom';

class CuadroDeComandoAdministradores extends Component {

    //_sUsuarioServicio = new servicio_usuario();
    //token_ = new servicio_token();
    constructor(props){
        super(props);
        
        this.state = {

        }

    }

    componentDidMount=()=>{
        this.props.propiedades_.f_comprobar_estado();
    }

    render() {
        return (
            <div>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark navBarColor">
                        <a className="navbar-brand" href="#">Bienvenido</a>
                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">

                                </li>
                                <li className="nav-item">

                                </li>
                                <li className="nav-item">

                                </li>
                                <li className="nav-item">

                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0">

                                <button onClick={
                                    (event)=>{
                                        event.preventDefault();
                                        this.props.propiedades_.f_cerrar_sesion();
                                        this.props.propiedades_.f_comprobar_estado();
                                    }
                                }  className="btn btn-primary my-2 my-sm-0 white-text botonAcceder" type="submit">Salir</button>
                            </form>
                        </div>
                    </nav>
                </div>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-4">

                            <Link to="/ListaCursos" onClick={()=>{
                
                                    }}>

                                <div className="custom-column">
                                    <div className="custom-column-header">Cursos</div>
                                    <div className="custom-column-content">
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                <i className="fas fa-8x colorIcono fa-book "></i>
                                            </li>

                                        </ul>
                                    </div>

                                </div>
                                </Link>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="custom-column">
                                    <div className="custom-column-header">Notas</div>
                                    <div className="custom-column-content">
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                <i className="fas colorIcono fa-8x  fa-clipboard-list"></i>
                                            </li>

                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="custom-column">
                                    <div className="custom-column-header">Certificados</div>
                                    <div className="custom-column-content">
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                <i className="fas colorIcono fa-8x fa-user-graduate"></i>
                                            </li>

                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4">

                            <Link to="/CrudUsuarios" onClick={()=>{
                
                                }}>

                                <div className="custom-column">
                                    <div className="custom-column-header">Usuarios</div>
                                    <div className="custom-column-content">
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                <i className="fas colorIcono fa-8x fa-user"></i>
                                            </li>

                                        </ul>
                                    </div>

                                </div>
                                </Link>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="custom-column">
                                    <div className="custom-column-header">Reportes</div>
                                    <div className="custom-column-content">
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                <i className="fas fa-8x colorIcono fa-tasks"></i>
                                            </li>

                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="custom-column">
                                    <div className="custom-column-header">Estudiantes</div>
                                    <div className="custom-column-content">
                                        <ul className="list-group">
                                            <li className="list-group-item colorIcono">
                                                <i className="fas fa-8x colorIcono fa-users"></i>
                                            </li>

                                        </ul>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default withRouter(CuadroDeComandoAdministradores);
