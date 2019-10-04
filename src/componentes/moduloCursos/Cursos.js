import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import './cursos.css';
import $ from 'jquery';
import { MDBInput } from 'mdbreact';
import { DropzoneArea } from 'material-ui-dropzone';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import renderHTML from 'react-render-html';
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink, Link } from "react-router-dom";

class Cursos extends Component {

    ref_titulo = React.createRef();
    ref_titulo_archivo = React.createRef();
    ref_titulo_carpeta = React.createRef();
    ref_titulo_texto = React.createRef();
    ref_texto_editor = React.createRef();
    ref_url = React.createRef();
    ref_url_preview = React.createRef();
    ref_url_preview_archivo = React.createRef();
    ref_url_preview_carpeta = React.createRef();
    ref_url_archivo = React.createRef();
    ref_url_carpeta = React.createRef();
    ref_descripcion = React.createRef();
    ref_descripcion_archivo = React.createRef();
    ref_descripcion_carpeta = React.createRef();
    ref_files = React.createRef();

    tema_Sposs=-1;

    constructor(props) {
        super(props);
        this.state = {
            parametros_temporales: {
                moduloId:'0',
                titulo: "",
                url: "",
                descripcion: ""
            },
            tituloCurso:'',
            modulo:{
                moduloId:'',
                cursoId:''
            },
            temas: [

            ],
            files: [

            ],
            hover:{
                boton_video:false,
                boton_archivo:false,
                boton_carpeta:false,
                boton_doc:false,
                boton_cancelar:false,
                boton_guardar:false,
                boton_eva:false
            }
        }

        this.handleModelChange = this.handleModelChange.bind(this);

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

    handleModelChange(model) {
        this.setState({
            ...this.state,
            content: model
        });
    }

    handleChange(files) {
        this.setState({
            ...this.state,
            files: files
        });
    }

    handleTemporales = event => {
        let elemento = event.target.name;
        //console.log(this.ref_texto_editor.current.editor.getData());
        //console.log(event.target);
        //console.log(this.ref_url_preview);
        if(event.target.name === 'url' && (parseInt(event.target.value.indexOf('youtube')) > 0 ) ){
            event.target.value = `https://www.youtube.com/embed/${event.target.value.substring(event.target.value.indexOf('v=') + 2)}`;
            this.ref_url_preview.current.src = event.target.value;
        }

        if(event.target.name === 'url' && (parseInt(event.target.value.indexOf('drive')) > 0 ) ){
            event.target.value = `http://drive.google.com/uc?export=view&id=${event.target.value.substring(event.target.value.indexOf('id=') + 3)}`;
            this.ref_url_preview_archivo.current.src = event.target.value;
        }

        if(event.target.name === 'url_carpeta'){
            elemento = 'url';
            event.target.value = `https://drive.google.com/embeddedfolderview?id=${event.target.value.substring(event.target.value.indexOf('id=') + 3)}#grid`;
            this.ref_url_preview_carpeta.current.src = event.target.value;
        }

        this.setState({
            ...this.state,
            parametros_temporales:{
                ...this.state.parametros_temporales,
                [elemento]: event.target.value
                //[event.target.name]: event.target.value
            }
        })

        //console.log(this.state.parametros_temporales);
    }

    styles = {

    };

    print_state = () => {
        console.log(this.state);
    }


    añadir_tema = (event, index, modulo) => {
        //console.log(event.target.name);
        let tema;
        if(event.target.name === "video"){
            tema = {
                tipo: event.target.name,
                titulo: this.ref_titulo.current.value,
                descripcion: this.ref_descripcion.current.state.innerValue,
                url: this.ref_url.current.value
                // titulo: this.state.parametros_temporales.titulo,
                // descripcion: this.state.parametros_temporales.descripcion,
                // url: this.state.parametros_temporales.url
            }
        }

        if(event.target.name === "archivo"){
            tema = {
                tipo: event.target.name,
                titulo: this.ref_titulo_archivo.current.value,
                descripcion: this.ref_descripcion_archivo.current.state.innerValue,
                url: this.ref_url_archivo.current.value
            }
        }
        
        if(event.target.name === "carpeta"){
            tema = {
                tipo: event.target.name,
                titulo: this.ref_titulo_carpeta.current.value,
                descripcion: this.ref_descripcion_carpeta.current.state.innerValue,
                url: this.ref_url_carpeta.current.value
            }
        }

        if(event.target.name === 'texto'){
            tema = {
                tipo: event.target.name,
                titulo: this.ref_titulo_texto.current.value,
                descripcion: this.ref_texto_editor.current.editor.getData(),
                url: ''
            }
        }

        if(modulo === true){
            tema = {
                ...tema,
                modulo: true
            }
        }else{
            tema = {
                ...tema,
                modulo: false
            }
        }

        if(this.tema_Sposs > -1){
            
            let temas = this.state.temas;
            temas.splice(index, 1, tema);
            this.setState({
                ...this.state,
                temas:temas
            });
            this.tema_Sposs = -1;
            return;
        }

        this.setState({
            ...this.state,
            temas:[
                ...this.state.temas,
                tema
            ]
        });
        //this.rtemp_parametros();
    }

    eliminar_tema =(tema_posicion)=>{
        let temas_temp = this.state.temas;
        temas_temp.splice(tema_posicion, 1)
        this.setState({
            ...this.state,
            temas: temas_temp
        });
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
                {/* <a href="#" class="btn btn-primary">Button</a> */}
            </div>
            <button name="editar" type="button" onClick={
                ()=>{
                    //this.rtemp_parametros();
                    this.ref_url_preview.current.src = url_temp;
                    this.ref_titulo.current.value = titulo_temp;
                    this.ref_descripcion.current.state.innerValue = description_temp;
                    this.ref_url.current.value = url_temp;
                    this.tema_Sposs = tema_posicion;
                    //console.log(this.tema_posicion);
                }
            } data-toggle="modal" data-target="#video_modal" className="modal_opciones modal_editar btn btn-warning">
                <i className="fas fa-pen fa-2x"></i>
            </button>
            <button type="button" onClick={
                ()=>{
                    this.eliminar_tema(tema_posicion);
                }
            } className="modal_opciones modal_eliminar btn btn-danger">
                <i className="fa fa-trash fa-2x" aria-hidden="true"></i>
            </button>
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
            <button name="editar" type="button" onClick={
                ()=>{
                    this.ref_url_preview_archivo.current.src = url_temp;
                    this.ref_titulo_archivo.current.value = titulo_temp;
                    this.ref_descripcion_archivo.current.state.innerValue = description_temp;
                    this.ref_url_archivo.current.value = url_temp;
                    this.tema_Sposs = tema_posicion;
                }
            } data-toggle="modal" data-target="#archivo_modal" className="modal_opciones modal_editar btn btn-warning">
                <i className="fas fa-pen fa-3x"></i>
            </button>
            <button type="button" onClick={
                ()=>{
                    this.eliminar_tema(tema_posicion);
                }
            } className="modal_opciones modal_eliminar btn btn-danger">
                <i className="fa fa-trash fa-3x" aria-hidden="true"></i>
            </button>
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
            <button name="editar" type="button" onClick={
                ()=>{
                    this.ref_url_preview_carpeta.current.src = url_temp;
                    this.ref_titulo_carpeta.current.value = titulo_temp;
                    this.ref_descripcion_carpeta.current.state.innerValue = description_temp;
                    this.ref_url_carpeta.current.value = url_temp;
                    this.tema_Sposs = tema_posicion;
                }
            } data-toggle="modal" data-target="#carpeta_modal" className="modal_opciones modal_editar btn btn-warning">
                <i className="fas fa-pen fa-3x"></i>
            </button>
            <button type="button" onClick={
                ()=>{
                    this.eliminar_tema(tema_posicion);
                }
            } className="modal_opciones modal_eliminar btn btn-danger">
                <i className="fa fa-trash fa-3x" aria-hidden="true"></i>
            </button>
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
            <button name="editar" type="button" onClick={
                ()=>{
                    this.ref_titulo_texto.current.value = titulo_temp;
                    this.ref_texto_editor.current.editor.setData(description_temp);
                    this.tema_Sposs = tema_posicion;
                }
            } data-toggle="modal" data-target="#texto_modal" className="modal_opciones modal_editar btn btn-warning">
                <i className="fas fa-pen fa-3x"></i>
            </button>
            <button type="button" onClick={
                ()=>{
                    this.eliminar_tema(tema_posicion);
                }
            } className="modal_opciones modal_eliminar btn btn-danger">
                <i className="fa fa-trash fa-3x" aria-hidden="true"></i>
            </button>
        </div>)
    }

    componentDidMount = () => {
        console.log(this.props);
    }

    rtemp_parametros=()=>{
        //console.log(this.ref_titulo.current);
        //console.log(this.ref_url.current.value);
        this.ref_titulo.current.value='';
        this.ref_titulo_texto.current.value='';
        this.ref_url.current.value='';
        this.ref_descripcion.current.state.innerValue='';
        this.ref_url_preview.current.src='';
        this.ref_url_preview_archivo.current.src='';
        this.ref_titulo_archivo.current.value='';
        this.ref_url_archivo.current.value='';
        this.ref_descripcion_archivo.current.state.innerValue='';
        this.ref_descripcion_carpeta.current.state.innerValue='';
        this.ref_titulo_carpeta.current.value='';
        this.ref_url_carpeta.current.value='';
        this.ref_url_preview_carpeta.current.src='';
        this.ref_texto_editor.current.editor.setData('');
        this.tema_Sposs = -1;
        this.setState({
            ...this.state,
            parametros_temporales:{
                titulo: "",
                url: "",
                descripcion: ""
            }
        });
    }

    añadir_navegacion =(modulo, texto)=>{
        
        if(modulo === true){
            return(<a class="nav-link mb-0 btn btn-primary active white-text" href="#">{texto}</a>)
        }else{
            return(<a class="nav-link mt-1 mb-0 ml-3 btn btn-light-blue white-text" href="#">{texto}</a>)
        }
    }

    render() {

        // let editor = new FroalaEditor('#editor');

        //console.log(window);

        return (


            <main className='container-fluid justify-content-center'>
                
                {/* modal video comienzo */}
                <div className="modal fade" id="video_modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-fluid" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title titulo_modal w-100" id="titulo_modal"><strong><center>Agregar Video</center></strong></h4>
                                <div className="custom-control custom-checkbox">
                                        <input onChange={
                                            (event) => {console.log(event.target.checked)} 
                                        
                                        } type="checkbox" value='' className="custom-control-input" id="ModuloChecked"/>
                                        <label className="custom-control-label" htmlFor="ModuloChecked">Modulo</label>
                                        <div className="md-form">
                                            <input className={'form-control'} id='fechaInicio' type="date" name="bday" min="2000-01-02"></input>
                                            <label className="label_modal" htmlFor="fechaInicio">Inicia:</label>
                                        </div>
                                </div>
                                
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
                                    <input ref={this.ref_url} type="text" id="materialSubscriptionFormEmail" className="input_modal form-control"
                                        onChange={this.handleTemporales} name="url"/>
                                    <label className="label_modal" htmlFor="materialSubscriptionFormEmail"><strong>URL:</strong></label>
                                </div>
                                <div className="justify-content-center text-center align-items-center">
                                    <iframe className="w-25 h-auto" name='preview' ref={this.ref_url_preview} src={''} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                </div>
                                <div className="md-form mb-5">
                                    <MDBInput ref={this.ref_descripcion} onChange={this.handleTemporales} name="descripcion" className="input_modal" type="textarea" label="Descripción" rows="3" />
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button name="video" onClick={
                                    (event) => {
                                        if(this.tema_Sposs > -1){
                                            this.añadir_tema(event, this.tema_Sposs);      
                                        }else{
                                            this.añadir_tema(event, null, false);
                                        }
                                    }
                                } data-dismiss="modal" type="button" className="btn mr-5 ml-5 btn-success btn-rounded btn-sm modal_boton">Aceptar</button>
                                <button onClick={
                                    (event)=>{
                                        //this.rtemp_parametros();
                                    }
                                } type="button" className="btn mr-5 ml-5 btn-danger btn-rounded btn-sm modal_boton" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* modal video fin */}

                {/* modal archivo comienzo */}
                <div className="modal fade" id="archivo_modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-fluid" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title titulo_modal w-100" id="titulo_modal"><strong><center>Agregar Archivo de Google drive</center></strong></h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="md-form mb-5">
                                    <input ref={this.ref_titulo_archivo} onChange={this.handleTemporales}
                                        type="text" id="materialSubscriptionFormTitulo" className="input_modal form-control" name="titulo"/>
                                    <label className="label_modal" htmlFor="materialSubscriptionFormTitulo"> <strong>Titulo:</strong></label>
                                </div>
                                <div className="md-form mb-5">
                                    <input ref={this.ref_url_archivo} type="text" id="materialSubscriptionFormEmail" className="input_modal form-control"
                                        onChange={this.handleTemporales} name="url"/>
                                    <label className="label_modal" htmlFor="materialSubscriptionFormEmail"><strong>URL:</strong></label>
                                </div>
                                <div className="justify-content-center text-center align-items-center">
                                    <iframe allowFullScreen ref={this.ref_url_preview_archivo} src={''} className="w-25"></iframe>
                                </div>
                                <div className="md-form mb-5">
                                    <MDBInput ref={this.ref_descripcion_archivo} onChange={this.handleTemporales} name="descripcion" className="input_modal" type="textarea" label="Descripción" rows="3" />
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button name="archivo" onClick={
                                    
                                    (event) => {
                                        if(this.tema_Sposs > -1){
                                            this.añadir_tema(event, this.tema_Sposs);      
                                        }else{
                                            this.añadir_tema(event, null, false);
                                        }
                                    }
                                    
                                } data-dismiss="modal" type="button" className="btn mr-5 ml-5 btn-success btn-rounded btn-sm modal_boton">Aceptar</button>
                                <button onClick={
                                    (event)=>{
                                        
                                    }
                                } type="button" className="btn mr-5 ml-5 btn-danger btn-rounded btn-sm modal_boton" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* modal archivo fin */}

                {/* modal carpeta comienzo */}
                <div className="modal fade" id="carpeta_modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-fluid" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title titulo_modal w-100" id="titulo_modal"><strong><center>Agregar Carpeta de Google drive</center></strong></h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="md-form mb-5">
                                    <input ref={this.ref_titulo_carpeta} onChange={this.handleTemporales}
                                        type="text" id="materialSubscriptionFormTitulo" className="input_modal form-control" name="titulo"/>
                                    <label className="label_modal" htmlFor="materialSubscriptionFormTitulo"> <strong>Titulo:</strong></label>
                                </div>
                                <div className="md-form mb-5">
                                    <input ref={this.ref_url_carpeta} type="text" id="materialSubscriptionFormEmail" className="input_modal form-control"
                                        onChange={this.handleTemporales} name="url_carpeta"/>
                                    <label className="label_modal" htmlFor="materialSubscriptionFormEmail"><strong>URL:</strong></label>
                                </div>
                                <div className="justify-content-center text-center align-items-center">
                                    <iframe allowFullScreen ref={this.ref_url_preview_carpeta} src={''} className="w-25"></iframe>
                                </div>
                                <div className="md-form mb-5">
                                    <MDBInput ref={this.ref_descripcion_carpeta} onChange={this.handleTemporales} name="descripcion" className="input_modal" type="textarea" label="Descripción" rows="3" />
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button name="carpeta" onClick={

                                    (event) => {
                                        if(this.tema_Sposs > -1){
                                            this.añadir_tema(event, this.tema_Sposs);      
                                        }else{
                                            this.añadir_tema(event, null, false);
                                        }
                                    }

                                } data-dismiss="modal" type="button" className="btn mr-5 ml-5 btn-success btn-rounded btn-sm modal_boton">Aceptar</button>
                                <button onClick={
                                    (event)=>{
                                        //this.rtemp_parametros();
                                        //console.log(this.ref_url_preview_carpeta);
                                    }
                                } type="button" className="btn mr-5 ml-5 btn-danger btn-rounded btn-sm modal_boton" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* modal carpeta fin */}

                {/* modal texto comienzo */}
                <div className="modal fade" id="texto_modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-fluid" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title titulo_modal w-100" id="titulo_modal"><strong><center>Agregar Texto</center></strong></h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="md-form mb-5">
                                    <input ref={this.ref_titulo_texto} onChange={this.handleTemporales}
                                        type="text" id="materialSubscriptionFormTitulo" className="input_modal form-control" name="titulo"/>
                                    <label className="label_modal" htmlFor="materialSubscriptionFormTitulo"> <strong>Titulo:</strong></label>
                                </div>
                                <div className="md-form mb-5">
                                    {/* <MDBInput ref={this.ref_descripcion_carpeta} onChange={this.handleTemporales} name="descripcion" className="input_modal" type="textarea" label="Descripción" rows="3" /> */}
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        data=""
                                        onInit={ editor => {
                                            //console.log( 'Editor is ready to use!', editor );
                                        } }
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            //editor.setData('neko');
                                            //this.handleTemporales();
                                            //console.log(event);
                                            //console.log( { event, editor, data } );
                                            //console.log(editor);
                                            let falso_event = {
                                                target:{
                                                    name:"descripcion",
                                                    value:data
                                                }
                                            };
                                            this.handleTemporales(falso_event);
                                        } }
                                        onBlur={ ( event, editor ) => {
                                            //console.log( 'Blur.', editor );
                                        } }
                                        onFocus={ ( event, editor ) => {
                                            //console.log( 'Focus.', editor );
                                        } }
                                        ref={this.ref_texto_editor}
                                        name="descripcion"
                                    />
                                
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button name="texto" onClick={

                                    (event) => {
                                        if(this.tema_Sposs > -1){
                                            this.añadir_tema(event, this.tema_Sposs);      
                                        }else{
                                            this.añadir_tema(event, null, false);
                                        }
                                    }

                                } data-dismiss="modal" type="button" className="btn mr-5 ml-5 btn-success btn-rounded btn-sm modal_boton">Aceptar</button>
                                <button onClick={
                                    (event)=>{
                                        //this.rtemp_parametros();
                                        //console.log(this.ref_url_preview_carpeta);
                                    }
                                } type="button" className="btn mr-5 ml-5 btn-danger btn-rounded btn-sm modal_boton" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* modal texto fin */}

                {/* modal subir archivo comienzo */}
                {/* <div className="modal fade" id="archivo_modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                    aria-hidden="true">

                    <div className="modal-dialog modal-fluid" role="document">

                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title titulo_modal w-100" id="titulo_modal"><strong><center>Subir Archivo</center></strong></h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="md-form mb-5">
                                    <input ref={this.ref_titulo} type="text" id="materialSubscriptionFormTitulo" className="input_modal form-control" />
                                    <label className="label_modal" htmlFor="materialSubscriptionFormTitulo"> <strong>Titulo:</strong></label>
                                </div>
                                <div className="md-form mb-5">
                                    <DropzoneArea dropzoneText="Arrastre y suelte el archivo o haga click aqui" filesLimit={4} ref={this.ref_files} showPreviews={false} maxFileSize={500000000}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </div>
                                <div className="md-form mb-5">
                                    <MDBInput ref={this.ref_descripcion} className="input_modal" type="textarea" label="Descripción" rows="1" />
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" onClick={
                                    ()=>{
                                        console.log(this.ref_files)
                                    }
                                } className="btn mr-5 ml-5 btn-success btn-sm modal_boton">Aceptar</button>
                                <button type="button" className="btn mr-5 ml-5 btn-danger btn-sm modal_boton" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* modal subir archivo fin */}

                <div className="row">

                <div class="col col-md-2">
                        <nav class="nav flex-column lighten-3 py-4 mb-r font-weight-bold z-depth-1">

                            {

                                this.state.temas.map((item, index)=>{
                                    return item.titulo !== ''? this.añadir_navegacion(item.modulo, item.titulo): null;
                                })  

                            }

                        </nav>
                </div>


                    <div className="col col-md-10 justify-content-center contenedor">

                    <div className="col col-md-12 justify-content-center contenedor_cartas">

                {/* <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onInit={ editor => {
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                    ref={this.ref_texto_editor}
                /> */}

                                {/* visualizar imagenes */}
                            {/* <img  src="http://drive.google.com/uc?export=view&id=1XL-Av84RmUhnDxbzMWsbrJz_3uwvf3Ap" class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt=""/> */}
                            
                            {/* https://drive.google.com/open?id=1dwtiOda3BxwUuxcj_aB5czoq9JiUur0C */}
                            {/*-- <iframe allowFullScreen src="https://drive.google.com/file/d/1kmj1ejnPAan2HPwgspOOF0N4ARQH5QhB/view" width="640" height="480"></iframe> */}

                            {/* previsualizar video de drive */}
                            {/* <iframe allowFullScreen src="http://drive.google.com/uc?export=view&id=1QNhGA4zL3eMYjP8pbqNaAPq0BhzsWHBr" width="640" height="480"></iframe> */}

                                {/* visualizar carpetas */}
                            {/* <iframe src="https://drive.google.com/embeddedfolderview?id=15YqXwj7kUU_3Uh4VoWu_HtHyMiC83bJF#grid" width="700" height="500" frameborder="0"></iframe> */}

                            {/* <div>
                                <button onClick={this.exportHtml}>Export HTML</button>
                            </div>

                            <EmailEditor minHeight={'100vh'}
                                ref={editor => this.editor = editor}
                            /> */}


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

{/* <ul className="nav  justify-content-between" id="myTabEx" role="tablist">
  <li className="nav-item justify-content-between">
    <a onClick={
        ()=>{
            window.open("https://drive.google.com/embeddedfolderview?id=15YqXwj7kUU_3Uh4VoWu_HtHyMiC83bJF#grid", '_blank');
        }
    } className="nav-link btn btn-block btn-light-blue active show" id="home-tab-ex" data-toggle="tab" href="#descargar" role="tab" aria-controls="home-ex"
      aria-selected="true">Descargar
      </a>
  </li>
  <li className="nav-item justify-content-between">
    <a className="nav-link btn btn-block btn-light-blue" id="profile-tab-ex" data-toggle="tab" href="#ver" role="tab" aria-controls="profile-ex"
      aria-selected="false">PreVisualizar</a>
  </li>
</ul>
<div className="tab-content" id="myTabContentEx">
  <div className="tab-pane fade active show" id="descargar" role="tabpanel" aria-labelledby="home-tab-ex">
  </div>
  <div className="tab-pane fade" id="ver" role="tabpanel" aria-labelledby="profile-tab-ex">
        data here
  </div>
</div> */}


                        </div>

                    </div>
                    
                </div>

                <div className={'row justify-content-center'}>
                <div className="col col-md-8 justify-content-center opciones">
                        <button onClick={this.rtemp_parametros} name="boton_video" onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff} data-toggle="modal" data-target="#video_modal" type="button" className={ this.state.hover.boton_video===false ? "btn btn-unique botones" : "btn btn-unique botones animated bounce"} >
                            <i className="fab fa-5x fa-youtube"></i>
                        </button>
                        <button onClick={this.rtemp_parametros} name="boton_archivo" onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff} data-toggle="modal" data-target="#archivo_modal" type="button" className={ this.state.hover.boton_archivo===false ? "btn btn-danger botones" : "btn btn-danger botones animated bounce"} >
                            <i className="far fa-6x fa-file-alt"></i>
                        </button>
                        <button onClick={this.rtemp_parametros} name="boton_carpeta" onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff} data-toggle="modal" data-target="#carpeta_modal" type="button" className={ this.state.hover.boton_carpeta===false ? "btn btn-success botones" : "btn btn-success botones animated bounce"} >
                            <i className="fab fa-6x fa-google-drive"></i>
                        </button>
                        <button onClick={this.rtemp_parametros} name="boton_doc" onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff} data-toggle="modal" data-target="#texto_modal" type="button" className={ this.state.hover.boton_doc===false ? "btn btn-primary botones" : "btn btn-primary botones animated bounce"} >
                            <i className="fas fa-6x fa-file-word"></i>
                        </button>
                        <Link to="/Evaluaciones">
                        <button name="boton_eva" onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff} data-toggle="modal" data-target="#texto_modal" type="button" className={ this.state.hover.boton_eva===false ? "btn btn-primary botones" : "btn btn-primary botones animated bounce"} >
                            <i class="fas fa-6x fa-clipboard-list"></i>
                        </button>
                        </Link>
                </div>
                </div>
                
                <div id='opciones' className="col col-md-2 justify-content-center">
                        <button onClick={()=>{}} name="boton_guardar" onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff} data-toggle="modal"  type="button" className={ this.state.hover.boton_guardar===false ? "btn btn-primary botones" : "btn btn-primary botones animated bounce"} >
                            <i className="far fa-5x fa-save"></i>
                        </button>

                        <Link to="/ListaCursos">
                        <button onClick={()=>{}} name="boton_cancelar" onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff} data-toggle="modal"  type="button" className={ this.state.hover.boton_cancelar===false ? "btn btn-danger botones" : "btn btn-danger botones animated bounce"} >
                            <i class="fas fa-5x fa-backspace"></i>
                        </button>
                        </Link>

                </div>

            </main>
        );
    }
}

export default withRouter(Cursos);