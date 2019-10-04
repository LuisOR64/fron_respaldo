import React, { Component } from 'react'
import { OldSocialLogin as SocialLogin } from 'react-social-login';

import './Registrarse.css'
import {servicio_usuario} from "../servicios/UsuarioServicio";
import {withRouter, Redirect, Link} from 'react-router-dom';
import servicio_token from './../../../servicios/servicio_token';

class IniciarSesion extends Component {
    token_ = new servicio_token();
    _sUsuarioServicio = new servicio_usuario();
    ref_contrasena = React.createRef();
    ref_usuario = React.createRef();
    ref_correo = React.createRef();
    ref_recontrasena = React.createRef();
    ref_nombres = React.createRef();
    ref_apellidos = React.createRef();
    ref_dni = React.createRef();
    ref_direccion = React.createRef();
    ref_ciudad = React.createRef();
    ref_distrito = React.createRef();
    ref_telefono = React.createRef();
    ref_fechanac = React.createRef();
    constructor(props){
        super(props);
        //corregir campos que sean diferentes en la db
        this.state = {

        };

        this.manejarCambios = this.manejarCambios.bind(this);

    }

    componentDidMount() {
        console.log(this.props);
    }

    manejarCambios =(event)=>{
        /*
        this.setState({
            [event.target.name]: event.target.value
        });

        console.log(this.state);

         */

    }

    logearse = (usuario, pass)=>{

        //let obj = {
         //   "user":this.ref_usuario.current.value,
          //  "pass":this.ref_contrasena.current.value
        //}

        //this.props.f_cargar_props('datos_social', obj);

        // this._sUsuarioServicio.
        // logear_usuario( usuario.username , usuario.password)
        //     .then((respuesta)=>{
        //         console.log(respuesta);
        //         if(respuesta.data.estado !== 'NOT FOUND'){
        //             this.props.propiedades_.f_guardar_token(respuesta.data.access_token);
        //             this.props.propiedades_.f_comprobar_estado();
        //             this.props.history.push("/CuadroDeComandoUsuarios");
        //         }
        //     }).catch((error)=>{
        //     //console.log(`error: ${error}`);

        // });

        console.log(usuario);

        this._sUsuarioServicio.logearUsuToken(usuario.username, pass).then((respuesta)=>{
            console.log(respuesta);
            if(respuesta.data.error !== null){
                this.props.propiedades_.f_guardar_token(respuesta.data.access_token);
                this.props.propiedades_.f_comprobar_estado();
                this.props.history.push("/CuadroDeComandoUsuarios");
                
                console.log('redirect');
            }

    }).catch((error)=>{
            console.log(`error: ${error}`);

    });
    }

    registrarse=()=>{

        let usuario={
            usuario_nombres: this.ref_nombres.current.value,
            usuario_apellidos: this.ref_apellidos.current.value,
            usuario_dni: this.ref_dni.current.value,
            username: this.ref_correo.current.value,
            usuario_fechanac: this.ref_fechanac.current.value,
            usuario_telefono: this.ref_telefono.current.value,
            password: this._sUsuarioServicio.encriptar_password(this.ref_contrasena.current.value),
            enabled: true
        }

        console.log(usuario);

        this._sUsuarioServicio.registrar_usuario(usuario).then((respuesta)=>{
            if(respuesta.status === 201){
                this.logearse();
            }
        }).catch((error)=>{
            console.log(`error: registro: ` + error);
        });
    }

    registrarUsuario = ()=>{
        let pass = this.ref_contrasena.current.value;
        let usuario = {
            "enabled": true,
            "password": this._sUsuarioServicio.encriptar_password(this.ref_contrasena.current.value),
            "roles": [
                {
                    "rol_descripcion": 'Usuario',
                    "rol_id": 2,
                    "rol_nombre": 'USER'
                }
            ],
            "username": this.ref_correo.current.value,
            "usuario_apellidos": this.ref_apellidos.current.value,
            "usuario_dni": this.ref_dni.current.value,
            "usuario_fechanac": this.ref_fechanac.current.value,
            "usuario_nombres": this.ref_nombres.current.value,
            "usuario_telefono": this.ref_telefono.current.value,

        }

        console.log(usuario);

        this._sUsuarioServicio.registrar_usuario(usuario).then((respuesta)=>{
            console.log(respuesta);
            if(respuesta.status === 201){
                this.logearse(usuario, pass);

            }
        }).catch((error)=>{
            console.log(error);
        })
    }

    render() {

        return (

            <div className="container">
                <div className="row">

                    <div className="col-md-8">

                        <img className={"imagen_registrarse"} src="https://source.unsplash.com/random" alt="imagen_de_prueba"/>
                        <img className={"imagen_registrarse"} src="https://source.unsplash.com/random" alt="imagen_de_prueba"/>


                    </div>
                    <div className="col-md-4 borde_registrarse">

                        <form>
                            <fieldset>
                                <legend><h1>Registrate</h1></legend>

                                <div className="form-group">
                                    <label htmlFor="nombres"><h5>Nombres</h5></label>
                                    <input type="text" className="form-control inputs_registrarse" id="nombres"
                                           aria-describedby="emailHelp" placeholder="Jose Patricio"
                                           onChange={this.manejarCambios}
                                           ref = {this.ref_nombres}
                                           required/>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="apellidos"><h5>Apellidos</h5></label>
                                    <input type="text" className="form-control inputs_registrarse" id="apellidos"
                                           aria-describedby="emailHelp" placeholder="Ramos Rua"
                                           onChange={this.manejarCambios}
                                           ref = {this.ref_apellidos}
                                           required/>

                                </div>

                                <div className="form-group">
                                    <label htmlFor="fecha_nac"><h5>Fecha de nacimiento</h5></label>
                                    <input ref={this.ref_fechanac} onChange={this.handleTemporales} className={'form-control'} id='fecha_nac' type="date" name="fecha_nac" min="1930-01-01"></input>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="dni"><h5>DNI</h5></label>
                                    <input type="text" className="form-control inputs_registrarse" id="dni"
                                           aria-describedby="emailHelp" placeholder="12345678"
                                           onChange={this.manejarCambios}
                                           ref = {this.ref_dni}
                                           required/>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="ciudad"><h5>Ciudad</h5></label>
                                    <input type="text" className="form-control inputs_registrarse" id="ciudad"
                                           aria-describedby="emailHelp" placeholder="Lima"
                                           onChange={this.manejarCambios}
                                           ref = {this.ref_ciudad}
                                           required/>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="distrito"><h5>Distrito</h5></label>
                                    <input type="texto" className="form-control inputs_registrarse" id="distrito"
                                           aria-describedby="emailHelp" placeholder="Santiago de Surco"
                                           onChange={this.manejarCambios}
                                           ref = {this.ref_distrito}
                                           required/>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="direccion"><h5>Direccion</h5></label>
                                    <input type="email" className="form-control inputs_registrarse" id="direccion"
                                           aria-describedby="emailHelp" placeholder="ej.calle las magnolias 1234 Lince, Lima , Peru"
                                           onChange={this.manejarCambios}
                                           ref = {this.ref_direccion}
                                           required/>

                                </div>

                                <div className="form-group">
                                    <label htmlFor="direccion"><h5>Celular</h5></label>
                                    <input type="text" className="form-control inputs_registrarse" id="celular"
                                           aria-describedby="emailHelp" placeholder="ej.999111222"
                                           onChange={this.manejarCambios}
                                           ref = {this.ref_telefono}
                                           required/>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="emailRegistro"><h5>Correo</h5></label>
                                    <input type="email" className="form-control inputs_registrarse" id="emailRegistro"
                                           aria-describedby="emailHelp" placeholder="tuCorreo@mail.com"
                                           onChange={this.manejarCambios}
                                           ref = {this.ref_correo}
                                           required/>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="contrasenaRegistro"><h5>Contraseña</h5></label>
                                    <input type="password" className="form-control inputs_registrarse" id="contrasenaRegistro"
                                           placeholder="escriba su contraseña1234"
                                           onChange={this.manejarCambios}
                                           ref = {this.ref_contrasena}
                                           required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reContrasenaRegistro"><h5> Repite la Contraseña</h5></label>
                                    <input type="password" className="form-control inputs_registrarse" id="reContrasenaRegistro"
                                           placeholder="Confirma tu contraseña"
                                           onChange={this.manejarCambios}
                                           ref = {this.ref_recontrasena}
                                           required/>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div className="row">
                                    <div className="col-md-12 col-lg-12">
                                        <button onClick={(event)=>{
                                            event.preventDefault();
                                            this.registrarUsuario();
                                        }
                                        } className="btn btn-info btn-block botones_registrarse">
                                            Registrar
                                        </button>

                                    </div>
                                </div>



                            </fieldset>


                        </form>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(IniciarSesion);
