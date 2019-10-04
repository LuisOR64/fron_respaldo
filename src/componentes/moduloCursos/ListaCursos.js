import React, { Component } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { CardColumns, Card, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {servicio_curso} from './servicios/CursoServicio';

class ListaCursos extends Component {

    _sCurso;
    ref_titulo = React.createRef();
    ref_imagen = React.createRef();
    tipo_curso;
    ref_fecha = React.createRef();
    ref_precio = React.createRef();

    usuRol=false;

    constructor(props){
        super(props);

        this._sCurso = new servicio_curso();

        this.state={
            curso_temporal:{

            },
            cursos:[

            ],
            hover:{
                boton_añadir: false
            }
        }
    }

    componentDidMount =()=>{
        this.cargar_cursos();
        this.usuRol = this.props.propiedades_.usuRol();
        console.log(this.usuRol);
    }

    cargar_cursos =()=>{
        this._sCurso.obtener_cursos().then((datos)=>{
            this.setState({
                ...this.state,
                cursos: datos.data
            });
        });
    }

    hoverOn=(event)=>{
        this.setState({
            ...this.state, 
            hover:{
                ...this.state.hover,
                [event.target.name]: true
            } 
        });
    }
    
    hoverOff=(event)=>{ 
        this.setState({
            ...this.state, 
            hover:{
                ...this.state.hover,
                [event.target.name]: false
            } 
        });    
    }

    añadir_curso =()=>{
        let curso = {
            curso_titulo: this.ref_titulo.current.value,
            permisos_id:'',	
            curso_nota_final:'',	
            curso_tipo: this.curso_tipo,	
            imagen_url: this.ref_imagen.current.value,	
            fecha_inicio: this.ref_fecha.current.value,
            curso_precio: this.ref_precio.current.value
        }
        this._sCurso.guardar_curso(curso).then((respuesta)=>{
            if(respuesta.status === 201){
                this.cargar_cursos();
            }
            console.log(respuesta);
        });  
    }

    eliminar_curso =(codigo)=>{
        this._sCurso.eliminar_curso(codigo).then(respuesta=>{
            //console.log(respuesta);
            if(respuesta.status === 200){
                this.cargar_cursos();
            }
        });
    }

    retornar_curso =(curso_item, index)=>{
        // console.log(codigo);
        let item = curso_item;
        let titulo_ = item.curso_titulo;
        let imagen_ = item.imagen_url;
        let codigo_ = item.id; 
        let precio_ = parseInt(item.curso_precio);

        let texto = '';

        if(precio_ >= 1){
            texto = `S/. ${precio_}`;
        }

        return (
            <Link to="/Cursos" onClick={()=>{
                this.props.f_cargar_props('curso_id', codigo_);
            }} key={codigo_}>
                <Card key={index} className={'text-center'}>
                    <Card.Img variant="top" src={imagen_} />
                    <Card.Body>
                    <Card.Title>{titulo_}</Card.Title>
                    <Card.Text>
                        {
                            texto
                        }
                    </Card.Text>
                    </Card.Body>
                    <button type="button" onClick={
                        (event)=>{
                            event.preventDefault();
                            this.eliminar_curso(codigo_);
                        }
                    } className="curso_eliminar text-center btn btn-danger">
                        <i className="fa fa-trash fa-3x eliminar_icono" aria-hidden="true"></i>
                    </button>
                    <button type="button" onClick={
                            (event)=>{
                                event.preventDefault();
                                this.ref_titulo.current.value = titulo_;
                                this.ref_imagen.current.value = imagen_;
                                this.tipo_curso = item.curso_tipo;
                                this.ref_fecha.current.value = item.fecha_inicio;
                                this.ref_precio.current.value = precio_;
                                console.log(this.ref_precio.current.value);
                            }
                        } data-toggle="modal" data-target="#curso_modal" className="curso_editar text-center btn btn-warning">
                        <i className="fas fa-pen fa-3x editar_icono"></i>
                    </button>
                </Card>
            </Link>
        );
    }

    handleTemporales =(event)=>{

        if(event.target.name === 'url' && (parseInt(event.target.value.indexOf('drive.google.com')) > 0 )){
            event.target.value = `http://drive.google.com/uc?export=view&id=${event.target.value.substring(event.target.value.indexOf('id=') + 3)}`;
            this.ref_imagen.current.value = event.target.value;
        }

        // console.log(event.target.name);
        console.log(this.ref_precio.current.value);
        // this.setState({
        //     ...this.state,
        //     curso_temporal:{
        //         ...this.state.curso_temporal,
        //         [event.target.name]: event.target.current.value
        //     }
        // });
    }

    limpiar_valores =()=>{
        this.ref_titulo.current.value = '';
        this.ref_imagen.current.value = '';
        this.tipo_curso = '';
        this.ref_fecha.current.value = '';
        this.ref_precio.current.value = '';
    }

    render() {
        return (

            <main className='container-fluid'>
                
                {/* modal curso comienzo */}
                <div className="curso_modal modal fade" id="curso_modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-fluid curso_modal" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title titulo_modal w-100" id="titulo_modal"><strong><center>Crear Curso</center></strong></h4>
                                <button onClick={
                                    (event)=>{
                                        this.limpiar_valores();
                                    }
                                } type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="md-form mb-5">
                                    <input ref={this.ref_titulo} onChange={this.handleTemporales}
                                        type="text" id="materialSubscriptionFormTitulo" className="input_modal form-control" name="titulo"/>
                                    <label className="label_modal" htmlFor="materialSubscriptionFormTitulo"> <strong>Titulo:</strong></label> 
                                </div>
                                <div className="md-form mb-5">
                                    <input ref={this.ref_imagen} type="text" id="materialSubscriptionFormEmail" className="input_modal form-control"
                                        onChange={this.handleTemporales} name="url"/>
                                    <label className="label_modal" htmlFor="materialSubscriptionFormEmail"><strong>Url Imagen:</strong></label>
                                </div>
                                <div className="md-form mb-5">
                                    <input ref={this.ref_fecha} onChange={this.handleTemporales} className={'form-control'} id='fechaInicio' type="date" name="fecha_inicio" min="2000-01-02"></input>
                                    <label className="label_modal" htmlFor="fechaInicio"><strong>Fecha de Inicio:</strong></label>
                                </div>

                                <ul className="nav  justify-content-between" id="myTabEx" role="tablist">
                                    <li className="nav-item justify-content-between">
                                        <a name='libre-free' onClick={
                                            ()=>{
                                                //console.log('libre-free');
                                                this.tipo_curso = 'libre-free';
                                                this.ref_precio.current.value = '';
                                            }
                                        } className="nav-link btn btn-block btn-light-blue active show" id="home-tab-ex" data-toggle="tab" href="#free" role="tab" aria-controls="home-ex"
                                        aria-selected="true">Curso Free
                                        </a>
                                    </li>
                                    <li className="nav-item justify-content-between">
                                        <a name='pago-premium' onClick={
                                            ()=>{
                                                //console.log('pago-premium');
                                                this.tipo_curso = 'pago-premium';
                                            }
                                        } className="nav-link btn btn-block btn-light-blue" id="profile-tab-ex" data-toggle="tab" href="#ver" role="tab" aria-controls="profile-ex"
                                        aria-selected="false">Curso Premium</a>
                                    </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContentEx">
                                    <div className="tab-pane fade active show" id="free" role="tabpanel" aria-labelledby="home-tab-ex">
                                    </div>
                                    <div className="tab-pane fade" id="ver" role="tabpanel" aria-labelledby="profile-tab-ex">
                                        <div class="md-form mb-5">
                                            <i class="far fa-4x fa-money-bill-alt prefix"></i>
                                            <input onChange={this.handleTemporales} ref={this.ref_precio} type="number" name="precio" id="Precio" class="form-control validate"/>
                                            <label className="label_modal" htmlFor="Precio" data-error="Inválido" data-success="Correcto"><strong>Precio:</strong></label>
                                        </div>
                                    </div>
                                    </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button name="curso" onClick={
                                    (event) => {
                                        this.añadir_curso();
                                    }
                                } data-dismiss="modal" type="button" className="btn mr-5 ml-5 btn-success btn-rounded btn-sm modal_boton">Guardar</button>
                                <button onClick={
                                    (event)=>{
                                        this.limpiar_valores();
                                    }
                                } type="button" className="btn mr-5 ml-5 btn-danger btn-rounded btn-sm modal_boton" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* modal curso fin */}



                <div className='row justify-content-center align-items-center' >
                    <div className='col col-md-12'>
                        <nav className="navbar bg-primary navbar-expand-sm text-center justify-content-center navbar-dark">
                            <a className="navbar-brand text-white" href="#"><strong>Lista de Cursos</strong></a>
                        </nav>
                    </div>
                <div className='col  justify-content-center col-md-8 mt-3'>

                <CardColumns className='col justify-content-center'>
  
                    {
                        this.state.cursos.map((item, index)=>{
                            // console.log(item);
                            return this.retornar_curso(item, index)
                        })
                    }
  
                </CardColumns>
               
                </div>
                </div>

                
                <div id='opciones' className="col col-md-2 justify-content-center">
                    {/* <Link to="/Cursos"> */}
                        <button onClick={()=>{
                            this.limpiar_valores();
                        }} name="boton_añadir" data-toggle="modal" data-target="#curso_modal" onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff} data-toggle="modal"  type="button" className={ this.state.hover.boton_añadir===false ? "btn btn-primary botones" : "btn btn-primary botones animated bounce"} >
                            <i class="fas fa-5x fa-plus"></i>
                        </button>
                    {/* </Link> */}
                </div>


            </main>
        );
    }
}

export default withRouter(ListaCursos);