import "./CompletarRegistroLoginSocial.css"
import React, {Component} from 'react';
import { google_id, facebook_id } from './../../variableEntorno/variables';
import { servicio_usuario } from './../../servicios/UsuarioServicio';
import {withRouter, Redirect, Link} from 'react-router-dom';
import servicio_token from './../../../../servicios/servicio_token';

class CompletarRegistroLoginSocial extends Component {

    //cuando el usuario no existe en la bd se le redirecciona directamente a esta pagina , peor si si ya existe
    // se le redirecciona al cuadro de comando

    _sUsuarioServicio = new servicio_usuario();
    token_ = new servicio_token();
    profile_temp;
    ref_direccion = React.createRef();
    ref_dni = React.createRef();
    ref_telefono = React.createRef();
    ref_fechanac = React.createRef();

    constructor(props){
        super(props);

        this.state = {

        };

        this.manejarCambios = this.manejarCambios.bind(this);

    }

    manejarCambios =(event)=>{

    };

    componentDidMount() {
        console.log(this.props);
        this.profile_temp = this.props.propiedades_.datos_social;
        this.props.propiedades_.f_comprobar_estado();
    }

    completarRegistroUsuario = ()=>{
        let usuario = {
            "usuario_dni": this.ref_dni.current.value,
            "usuario_telefono": this.ref_telefono.current.value,

            //ver la manera de enviar correctamente direccion ,
            "usuario_direccion":this.ref_direccion.current.value,
            "usuario_distrito":this.ref_distrito.current.value,
            "usuario_ciudad":this.ref_ciudad.current.value//-> agregar este campo a la bd
        };
        // cambie registrar usuario por actualizar usuario
        this._sUsuarioServicio.actualizar_usuario(usuario).then((respuesta)=>{
            console.log(respuesta);
        }).catch((error)=>{
            console.log(error);
        })
    }

    logearse = (email, password)=>{

        //this.props.f_cargar_props('datos_social', obj);
        this._sUsuarioServicio.logearUsuToken(email, password)
            .then((respuesta)=>{
                console.log(respuesta);
                if(respuesta.data.estado !== 'NOT FOUND'){
                    this.props.propiedades_.f_guardar_token(respuesta.data.access_token);
                    this.props.propiedades_.f_comprobar_estado();
                    this.props.history.push("/CuadroDeComandoUsuarios");
                }

            }).catch((error)=>{
            console.log(`error logearse: ${error}`);

        });
    }

    completarRegistro = ()=>{

        let usuario={
            usuario_nombres: this.profile_temp.firstName,
            usuario_apellidos: this.profile_temp.lastName,
            usuario_dni: this.ref_dni.current.value,
            username: this.profile_temp.email,
            usuario_fechanac: this.ref_fechanac.current.value,
            usuario_telefono: this.ref_telefono.current.value,
            password: this._sUsuarioServicio.encriptar_password(this.profile_temp.id),
            enabled: true
        }

        console.log(usuario);

        this._sUsuarioServicio.registrar_usuario(usuario).then((respuesta)=>{
            if(respuesta.status === 201){
                this.logearse(this.profile_temp.email, this.profile_temp.id);
            }
        }).catch((error)=>{
            console.log('error registrar' + error);
        });

        //console.log(usuario);

        /*
        this._sUsuarioServicio.registrar_usuario(usuario).then((respuesta)=>{
            if(respuesta.status === 201){
                this.logearse(this.profile_temp.email, this.profile_temp.id)
            }
        }).catch((error)=>{
            console.log('error registro: ' + error);
        });
        */

    }

    render() {
        return (
            <div>
                <div className="col-sm-10 col-md-10">
                    <div className="custom-column  ">
                        <div className="custom-column-header ">Bienvenido</div>
                        <div className="custom-column-content ">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <img className='img_CR'
                                       //cuidado donde poner el valor de la imagen  ref = {this.ref_foto}
                                        //ref guardas la url de la imagen
                                        //src vale ref
                                        //solo funciona cuando recibes la imagen de fb y google
                                        src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd1d28ef%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd1d28ef%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22129.359375%22%20y%3D%2297.35%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Card image"/>
                                    <div className="form-group">
                                        <label htmlFor="subirFoto">Subir foto</label>
                                        <input type="file" className="form-control-file" id="subirFoto"
                                               aria-describedby="fileHelp" onChange={this.manejarCambios}
                                              />

                                    </div>
                                </li>
                                <form action="">
                                    <fieldset>
                                        <div className="form-group">
                                            <div className="form-group">

                                                <div className="form-group">
                                                    <label htmlFor="fecha_nac"><h5>Fecha de nacimiento</h5></label>
                                                    <input ref={this.ref_fechanac}
                                                           onChange={this.manejarCambios}
                                                           className={'form-control'}
                                                           id='fecha_nac' type="date"
                                                           name="fecha_nac" min="1930-01-01"/>

                                                </div>

                                                <label htmlFor="direccion">Direccion</label>
                                                <input type="text" className="form-control" id="direccion"
                                                       aria-describedby="emailHelp" placeholder="ej. calle los geranios 111, surco , Lima, Peru"
                                                       onChange={this.manejarCambios}
                                                       ref = {this.ref_direccion}/>
                                                <label htmlFor="direccion">Distrito</label>
                                                <input type="text" className="form-control" id="direccion"
                                                       aria-describedby="emailHelp" placeholder="ej. calle los geranios 111, surco , Lima, Peru"
                                                       onChange={this.manejarCambios}
                                                       ref = {this.ref_distrito}/>

                                                <label htmlFor="direccion">Ciudad</label>
                                                <input type="text" className="form-control" id="direccion"
                                                       aria-describedby="emailHelp" placeholder="ej. calle los geranios 111, surco , Lima, Peru"
                                                       onChange={this.manejarCambios}
                                                       ref = {this.ref_ciudad}/>
                                                <label htmlFor="dni">DNI</label>
                                                <input type="text" className="form-control" id="dni"
                                                       aria-describedby="emailHelp" placeholder="ej. 12345678"
                                                       onChange={this.manejarCambios}
                                                       ref = {this.ref_dni}/>

                                                <label htmlFor="telefono">Telefono</label>
                                                <input type="text" className="form-control" id="dni"
                                                       aria-describedby="emailHelp" placeholder="ej. 999999999"
                                                       onChange={this.manejarCambios}
                                                       ref = {this.ref_telefono}/>

                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </ul>
                        </div>
                        <div className="custom-column-footer">
                            <button onClick={
                                (event)=>{
                                    this.completarRegistro()
                                }
                            } className="btn botonTableroAdmi btn-lg">
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default  withRouter(CompletarRegistroLoginSocial);
