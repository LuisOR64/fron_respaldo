import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import renderHTML from 'react-render-html';
import $ from 'jquery';
import './cursos.css';
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink, Link } from "react-router-dom";

import { OldSocialLogin as SocialLogin } from 'react-social-login';

class MostrarCurso extends Component {

    constructor(props){
        super(props);
        this.state = {
            tituloCurso:'',
            temas: [
                {
                    tipo: "texto",
                    titulo: "Gestion Pública y Modernización del Estado",
                    descripcion: "<p>Gestion publica</p><p>&nbsp;</p><p>La Modernización de la Gestión Pública comprende un proceso continuo de mejora con el fin de que las acciones del Estado respondan a las necesidades y expectativas de la ciudadanía. Implica mejorar la forma en la que el Estado hace las cosas, introducir mecanismos más transparentes y eficientes, enfocarse en mejorar los procesos de provisión de bienes y servicios, entre otros aspectos. Asimismo, llevar a cabo acciones de monitoreo y evaluación para introducir los cambios y ajustes necesarios y con ello mejorar las intervenciones públicas</p>",
                    url: ""
                },

                {
                    tipo: "video",
                    titulo: "Gestion Pública y Modernización del Estado",
                    descripcion: "Introduccion de la gestion publica",
                    url: "https://www.youtube.com/embed/YavoHpmwySQ",
                },
                {
                    tipo: "archivo",
                    titulo: "Lectura complementaria: Redes",
                    descripcion: "Mas informacion en: http://drive.google.com/uc?export=view&id=1WyTJK4A5j8EMcr2rjpNkD0NZ5dnYLFmp",
                    url: "http://drive.google.com/uc?export=view&id=1WyTJK4A5j8EMcr2rjpNkD0NZ5dnYLFmp"
                },
                {
                    tipo: "carpeta",
                    titulo: "Documentacion extra",
                    descripcion: "",
                    url: "https://drive.google.com/embeddedfolderview?id=1oxUSHnHWuO6G9XKbBUFrIrKTAvcFy4L2#grid"
                }
                
            ]
        }
    }

    componentDidMount=()=>{
        console.log(this.props);
    }

    retornar_video = (titulo, url, descripcion, index) => {
        let titulo_temp = titulo;
        let url_temp = url;
        let description_temp = descripcion;
        let tema_posicion = index;

        return (<div key={tema_posicion} className="card carta justify-content-center">
            <div className="card-body">
                <h4 className="card-title modal_titulo"><a>{titulo_temp}</a></h4>
                <div id={titulo_temp} className="video embed-responsive embed-responsive-16by9 z-depth-0-half">
                    <iframe title={titulo_temp} width="560" height="315" src={url_temp} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <p className="pGeneral card-text">
                    {description_temp}
                </p>
            </div>
        </div>)
    }

    retornar_archivo= (titulo, url, descripcion, index) => {
        let titulo_temp = titulo;
        let url_temp = url;
        let description_temp = descripcion;
        let tema_posicion = index;

        return (<div key={tema_posicion} className="card carta justify-content-center">
            <div className="card-body">
                <h4 className="card-title modal_titulo"><a>{titulo_temp}</a></h4>
                <div id={titulo_temp} className="video embed-responsive embed-responsive-16by9 z-depth-0-half">
                    {/* <iframe title={titulo} width="560" height="315" src={url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                    <iframe title={titulo_temp} allowFullScreen src={url_temp} className="w-100"></iframe>
                </div>
                <p className="pGeneral card-text">
                    {description_temp}
                </p>
            </div>
        </div>)
    }

    retornar_carpeta= (titulo, url, descripcion, index) => {
        let titulo_temp = titulo;
        let url_temp = url;
        let description_temp = descripcion;
        let tema_posicion = index;

        return (<div key={tema_posicion} className="card carta justify-content-center">
            <div className="card-body">
                <h4 className="card-title modal_titulo"><a>{titulo_temp}</a></h4>
                <div id={titulo_temp} className="video embed-responsive embed-responsive-16by9 z-depth-0-half">
                    {/* <iframe title={titulo} width="560" height="315" src={url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                    {/* <iframe  allowFullScreen src={url} className="w-100"></iframe> */}
                    <iframe title={titulo_temp} src={url_temp} className="w-100" frameborder="0"></iframe>
                </div>
                <p className="pGeneral card-text">
                    {description_temp}
                </p>
            </div>
        </div>)
    }

    retornar_texto= (titulo, descripcion, index) => {
        let titulo_temp = titulo;
        let description_temp = descripcion;
        let tema_posicion = index;

        return (<div key={tema_posicion} className="card carta justify-content-center">
            <div className="card-body">
                <h4 className="card-title modal_titulo"><a>{titulo_temp}</a></h4>
                <p className="pGeneral card-text">
                    {renderHTML(description_temp)}
                </p>
            </div>
        </div>)
    }

    render() {
        return (
            <main className='container-fluid'>
                <div className="row justify-content-center">
                    <div className="col col-md-12 justify-content-center contenedor">
                        <div className="col col-md-9 justify-content-center contenedor_cartas">

                        {/* <SocialLogin
                            provider='facebook'
                            appId='464265754424762'
                            callback={(user, err) => {
                                console.log(user)
                                console.log(err)
                            }}
                            >
                                <button className={'btn btn-info'}>Login with Facebook</button>
                        </SocialLogin>
                        <SocialLogin
                            provider='google'
                            appId='181317353315-v5bnsuigcjfnbrq6ar9ihk9gkl4cagsd.apps.googleusercontent.com'
                            callback={(user, err) => {
                                console.log(user)
                                console.log(err)
                            }}
                            >
                                <button className={'btn btn-danger'}>Login with Google</button>
                        </SocialLogin> */}

                            {

                                this.state.temas.map((item, index)=>{
                                    
                                    if(item.tipo === "video"){
                                        return this.retornar_video(item.titulo, item.url, item.descripcion, index);
                                    }
                                    
                                    if(item.tipo === "archivo"){
                                        return this.retornar_archivo(item.titulo, item.url, item.descripcion, index);
                                    }
                                    
                                    if(item.tipo === "carpeta"){
                                        return this.retornar_carpeta(item.titulo, item.url, item.descripcion, index);
                                    }

                                    if(item.tipo === "texto"){
                                        return this.retornar_texto(item.titulo, item.descripcion, index);
                                    }

                                    return null;
                                })

                            }

<div className={'row justify-content-center'}>
                <div className="col col-md-8 justify-content-center opciones">
                        <Link to="/Evaluaciones">
                        <button name="boton_eva" data-toggle="modal" data-target="#texto_modal" type="button" className={ "btn btn-primary botones"} >
                            <i class="fas fa-6x fa-clipboard-list"></i>
                        </button>
                        </Link>
                </div>
                </div>

                        </div>

                    </div>
                </div>
            </main>
        );
    }
}

export default withRouter(MostrarCurso);