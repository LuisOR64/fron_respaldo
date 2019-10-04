import React, { Component } from 'react';
import { servicio_usuario } from './../servicios/UsuarioServicio';
import { MDBDataTable } from 'mdbreact';
import { withRouter } from 'react-router-dom';
import MaterialTable from 'material-table';
import $ from 'jquery';
import servicio_token from './../../../servicios/servicio_token';

class TablaUsuarios extends Component {

    _sUsuarioServicio;
    //token_ = new servicio_token();
    constructor(props){
        super(props);
        this._sUsuarioServicio = new servicio_usuario();
        

        this.state = {
            columns: [
                { title: 'Nombres', field: 'usuario_nombres' },
                { title: 'Apellidos', field: 'usuario_apellidos' },
                { title: 'DNI', field: 'usuario_dni' },
                { title: 'Email', field: 'username' },
                { title: 'Fecha de nacimiento', field: 'usuario_fechanac', type: 'date' },
                { title: 'Celular', field: 'usuario_telefono', type: 'numeric' },
                // { title: 'Rol', field: 'roles',
                //     lookup: { 1: 'Administrador', 2: 'DB Administrador', 3: 'Usuario' },
                // },
                { title: 'Estado de la cuenta', field: 'enabled',
                    lookup: { true: 'Habilitada', false: 'Deshabilitada' },
                },
            ],
            data: [
                // { name: 'Mehmet', 
                //     surname: 'Baran', 
                //     birthYear: 1987, 
                //     birthCity: 63 },
                // {
                //   name: 'Zerya Betül',
                //   surname: 'Baran',
                //   birthYear: 2017,
                //   birthCity: 34,
                // },
            ],
        }
        
    }

    componentDidMount=()=>{
        this.cargar_usuarios();
        this.props.propiedades_.f_comprobar_estado();
    }

    cargar_usuarios =()=>{
        let row_ = [];
        this._sUsuarioServicio.obtener_usuarios().then((respuesta)=>{
            //console.log(respuesta.data.respuesta[1].roles[0].rol_id);
            if(respuesta.status === 200){
                respuesta.data.respuesta.map((item)=>{
                    row_.push(this.crear_fila(item));
                });
            }

            this.setState({
                ...this.state,
                data: row_
            });
            //console.log(this.state);
        }).catch((data)=>{
            console.log(data);
        });
        
    }

    crear_fila =(usuario)=>{
        //console.log(usuario.roles);
        // let usuario_fila = {};
        // if(usuario.roles[0]){
        //     usuario_fila = {
        //         usuario_id: usuario.usuario_id,
        //         usuario_nombres: usuario.usuario_nombres,
        //         usuario_apellidos: usuario.usuario_apellidos,
        //         usuario_dni: usuario.usuario_dni,
        //         username: usuario.username,
        //         usuario_fechanac: usuario.usuario_fechanac,
        //         usuario_telefono: usuario.usuario_telefono,
        //         enabled: usuario.enabled,
        //         roles: usuario.roles[0].rol_id
        //     }
        // }else{
        //     usuario_fila = {
        //         usuario_id: usuario.usuario_id,
        //         usuario_nombres: usuario.usuario_nombres,
        //         usuario_apellidos: usuario.usuario_apellidos,
        //         usuario_dni: usuario.usuario_dni,
        //         username: usuario.username,
        //         usuario_fechanac: usuario.usuario_fechanac,
        //         usuario_telefono: usuario.usuario_telefono,
        //         enabled: usuario.enabled,
        //         roles: ''
        //     }
        // }
        

        return ({
                usuario_id: usuario.usuario_id,
                usuario_nombres: usuario.usuario_nombres,
                usuario_apellidos: usuario.usuario_apellidos,
                usuario_dni: usuario.usuario_dni,
                username: usuario.username,
                usuario_fechanac: usuario.usuario_fechanac,
                usuario_telefono: usuario.usuario_telefono,
                enabled: usuario.enabled,
                password: usuario.password
        })

    }

    añadir_usuario =(newData)=>{
        newData = {
            ...newData,
            password: this._sUsuarioServicio.encriptar_password('123')
        }
        console.log(newData);
        return this._sUsuarioServicio.registrar_usuario(newData).then((respuesta)=>{
            //console.log(respuesta);
            if(respuesta.status === 201){
                //console.log(respuesta);
                const data = [...this.state.data];
                data.push(newData);
                this.setState({ ...this.state, data });
            }
        }).catch((error)=>{
            console.log(error);
        })
    }

    eliminar_usuario =(oldData)=>{
        console.log(oldData);
        return this._sUsuarioServicio.eliminar_usuario(oldData.usuario_id).then((respuesta)=>{
            //console.log(respuesta);
            if(respuesta.status === 200){
                const data = [...this.state.data];
                data.splice(data.indexOf(oldData), 1);
                this.setState({ ...this.state, data });
            }
        }).catch((error)=>{
            console.log(error);
        });
    }

    editar_usuario =(newData, oldData)=>{
        //console.log(newData);
        return this._sUsuarioServicio.actualizar_usuario(newData).then((respuesta)=>{
            //console.log(respuesta);
            if(respuesta.status === 200){
                const data = [...this.state.data];
                data[data.indexOf(oldData)] = newData;
                this.setState({ ...this.state, data });
            }
        }).catch((error)=>{
            console.log(error);
        });
    }

    render() {

        return (
            <main className='container-fluid'>

                <button onClick={
                    ()=>{
                        // this._sUsuarioServicio.logearUsuToken('niel@gmail.com', '123')
                        // .then((data)=>{
                        //      console.log(data);
                        //  }).catch((error)=>{
                        //      console.log(error);
                        //  });
                        this._sUsuarioServicio.encriptar_password();
                    }
                } type="submit"></button>

                <div className='row justify-content-center align-items-center' >
                    <div className='col col-md-12'>
                        <nav className="navbar bg-primary navbar-expand-sm text-center justify-content-center navbar-dark">
                            <a className="navbar-brand text-white" href="#"><strong>Administrar usuario</strong></a>
                        </nav>
                    </div>
                    <div className='col  justify-content-center col-md-8 mt-3'>
                    
                    { 
                        
                        <MaterialTable
                        title="Usuarios"
                        columns={this.state.columns}
                        data={this.state.data}
                        editable={{
                            onRowAdd: newData => this.añadir_usuario(newData)  
                            ,
                          onRowUpdate: (newData, oldData) => this.editar_usuario(newData, oldData)
                            ,
                          onRowDelete: oldData => this.eliminar_usuario(oldData)
                            ,
                        }}
                      />
                    
                    }
               
                    </div>
                </div>

            </main>
        );
    }
}

export default withRouter(TablaUsuarios);
