import React, { Component } from 'react'
import { OldSocialLogin as SocialLogin } from 'react-social-login';
import './IniciarSesion.css'
import { google_id, facebook_id } from './../variableEntorno/variables';
import { servicio_usuario } from './../servicios/UsuarioServicio';
import {withRouter, Redirect, Link} from 'react-router-dom';
import servicio_token from './../../../servicios/servicio_token';

class IniciarSesion extends Component {

        _sUsuarioServicio = new servicio_usuario();
        ref_contrasena = React.createRef();
        ref_usuario = React.createRef();
        token_;

    constructor(props){
        super(props);

        this.token_ = new servicio_token();

        this.state = {
                //redirect:false
        };

        this.manejarCambios = this.manejarCambios.bind(this);

    }

    componentDidMount() {
        console.log(this.props);
    }

    manejarCambios =(event)=>{

    };

    logearse = ()=>{

        let obj = {
            user:this.ref_usuario.current.value,
            pass:this.ref_contrasena.current.value
        }
        //this.props.f_cargar_props('datos_social', obj);
        this._sUsuarioServicio.logearUsuToken(this.ref_usuario.current.value, this.ref_contrasena.current.value).then((respuesta)=>{
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

        // this._sUsuarioServicio.logear_usuario(this.ref_usuario.current.value, this.ref_contrasena.current.value).then((respuesta)=>{
        //     console.log(respuesta);
        //     if(respuesta.data.estado !== 'NOT FOUND'){
        //         this.props.history.push("/CuadroDeComandoUsuarios");
        //     }

        // }).catch((error)=>{
        //     console.log(`error: ${error}`);

        // });
        
        //console.log('servicio_logear');
    }

    logeateSocialmente = (user)=>{
        //console.log(user._profile);
        let user_profile = user._profile;

        this._sUsuarioServicio.logearUsuToken(user._profile.email, user._profile.id).then((respuesta)=>{
            console.log(respuesta);
            // if(respuesta.data.estado !== 'NOT FOUND'){
            //     this.props.history.push("/CuadroDeComandoUsuarios");
            // }

            // if(respuesta.data.error !== null){
            //     this.props.history.push("/CuadroDeComandoUsuarios");
            // }else{
            //     this.props.f_cargar_props('datos_social', user_profile);
            //     this.props.history.push("/CompletarRegistroLoginSocial");
            // }

            if(respuesta.data.error !== null){
                this.props.propiedades_.f_guardar_token(respuesta.data.access_token);
                this.props.propiedades_.f_comprobar_estado();
                this.props.history.push("/CuadroDeComandoUsuarios");
                
                console.log('redirect');
            }

        }).catch((error)=>{
            console.log('nuevo error');
            this.props.f_cargar_props('datos_social', user_profile);
            this.props.history.push("/CompletarRegistroLoginSocial");
            
        });

    }

    registrarUsuario = (perfil)=>{
        //falta email en data base
        //username es EMAIL en la db
        let usuario = {
            "enabled": true,
            "password": perfil.id,
            "roles": [
                {
                    "rol_descripcion": 'usuario',
                    "rol_id": 2,
                    "rol_nombre": 'usuario'
                }
            ],
            "username": perfil.email,
            "usuario_apellidos": perfil.lastName,
            "usuario_dni": '',
            "usuario_fechanac": '',
            "usuario_nombres": perfil.firtsName,
            "usuario_telefono": ''
        }

        this._sUsuarioServicio.registrar_usuario(usuario).then((respuesta)=>{
            console.log(respuesta);
        }).catch((error)=>{
            console.log(error);
        })
    }

    mostrarError =(error)=>{
        console.log(error);
    }
    //_sUsuarioServicio;

    render() {

        return (

            <div className="container">
                <div className="row">

                    <div className="col-md-8">

                        <img className={"imagen_IS"} src="https://source.unsplash.com/random" alt="imagen_de_prueba"/>


                    </div>
                    <div className="col-md-4 borde_IS">

                        <form>
                            <fieldset>
                                <legend><h1>Bienvenidos</h1></legend>

                                <div className="form-group">
                                    <label htmlFor="emailIniciarSesion"><h5>Correo</h5></label>
                                    <input
                                           type="email"
                                           className="form-control inputs_IS"
                                           id="emailIniciarSesion"
                                           aria-describedby="emailHelp"
                                           placeholder="ej. tuCorreo@mail.com"
                                           //value={usuario_correo}
                                           onChange={this.manejarCambios}
                                           ref = {this.ref_usuario}
                                           required
                                    />


                                </div>
                                <div className="form-group">
                                    <label htmlFor="contraIniciarSesion"><h5>Contraseña</h5></label>
                                    <input type="password"
                                           className="form-control inputs_IS"
                                           id="contraIniciarSesion"
                                           placeholder=""
                                           //value={usuario_contrasena}
                                           onChange={this.manejarCambios}
                                           ref = {this.ref_contrasena}
                                    />
                                </div>
                                </fieldset>
                                <fieldset>
                                    <div className="row">
                                        <div className="col-md-12 col-lg-12">


                                            <button
                                                type={"submit"}
                                                onClick={(event)=> {
                                                    event.preventDefault();
                                                    this.logearse();
                                                    //this.logear_usuario();
                                                    // eslint-disable-next-line no-undef
                                                    //this.logearUsuToken();

                                                }}
                                                className="btn btn-info btn-block botones_login"

                                            >Entrar</button>




                                            <legend><h5 align={"center"}>¿ Aún sin cuenta?
                                                <a onClick={(event)=>{
                                                    event.preventDefault();
                                                    this.props.history.push("/Registrarse");
                                                }} href="">Registrate aqui</a>
                                            </h5></legend>
                                        </div>
                                    </div>



                                </fieldset>


                        </form>
                        <SocialLogin
                            provider='facebook'
                            appId={facebook_id}
                            callback={(user, error) => {
                                //console.log(user);
                                if(error){
                                    this.mostrarError(error);
                                }else{
                                    this.logeateSocialmente(user);
                                }
                            }}
                        >
                            <button className={'btn btn-primary btn-block botones_login'}>Entrar con Facebook</button>


                        </SocialLogin>

                        <SocialLogin
                            provider='google'
                            appId={google_id}
                            callback={(user, error) => {
                                //console.log(user)
                                if(error){
                                    this.mostrarError(error);
                                }else{
                                    this.logeateSocialmente(user);
                                }
                            }}
                        >
                            <button className={'btn btn-danger btn-block botones_login'}>Entrar con  Google</button>

                        </SocialLogin>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(IniciarSesion);
