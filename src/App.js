import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, NavLink } from "react-router-dom";
import RouterLink from './router/RouterLink'
//import Usuarios from './componentes/modulaUsuarios/Usuarios';
import Cursos from './componentes/moduloCursos/Cursos';
//import Evaluaciones from './componentes/moduloEvaluaciones/Evaluaciones';
import MostrarCurso from './componentes/moduloCursos/MostrarCurso';
import './App.css';
import ListaCursos from './componentes/moduloCursos/ListaCursos';
import ListaCursosUser from './componentes/moduloCursos/ListaCursosUser';
//import TablaUsuarios from './componentes/modulaUsuarios/TablaUsuarios';
import TablaUsuarios from './componentes/moduloUsuarios/CrudUsuarios/TablaUsuarios';
import CompletarRegistroLoginSocial from "./componentes/moduloUsuarios/CompletarDatos/CompletarDatosRegistroLoginSocial/CompletarRegistroLoginSocial";
import IniciarSesion from "./componentes/moduloUsuarios/IniciarSesion/IniciarSesion";
import CuadroDeComandoUsuarios from './componentes/moduloUsuarios/CuadroDeComando/CuadroDeComandoUsuarios/CuadroDeComandoUsuarios';
import CuadroDeComandoAdministradores from './componentes/moduloUsuarios/CuadroDeComando/CuadroDeComandoAdministradores/CuadroDeComandoAdministradores';
import Registrarse from "./componentes/moduloUsuarios/Registrarse/Registrarse";
import servicio_token from './servicios/servicio_token';
import Evaluaciones from './componentes/moduloEvaluaciones/crearEvaluaciones/Evaluaciones';
import VerEvaluacion from './componentes/moduloEvaluaciones/verEvaluacion/VerEvaluacion';
import ResultadoEvaluacion from './componentes/moduloEvaluaciones/verEvaluacion/ResultadoEvaluacion';

class App extends Component {

  token_ = new servicio_token();

  constructor(props){
    super(props);

    this.state = {
      usu_rol:false
    }

    //this.comprobar_sesion();

  }

  componentDidMount=()=>{
    this.comprobar_sesion();
  }

  cerrar_sesion =()=>{
    this.token_.cerrar_session();
  }

  comprobar_sesion =()=>{
    let usu_rol = false;
    if(this.token_.verificar_sesion_abierta()){
      usu_rol = this.token_.obtener_rol();
      this.setState({
        logeado:true,
        usuRol:usu_rol
      })
    }else{
      this.setState({
        logeado:false,
        usuRol:usu_rol
      })
    }
  }

  guardar_token =(token)=>{
    this.token_.guardar_token(token)
  }

  get_usurol =()=>{
    return this.state.usu_rol;
  }

  propiedades = {
      f_guardar_token: this.guardar_token,
      f_comprobar_estado: this.comprobar_sesion,
      f_cerrar_sesion: this.cerrar_sesion,
      usuRol: this.get_usurol
  }
  
  useStyles = makeStyles({
    root: {
      width: 500,
    },
  });
  
  cargar_props=(nombre, propiedad)=>{
      this.propiedades = {
        ...this.propiedades,
          [nombre]:propiedad
      }
  }  

  render() {
    
    return(
    <Router className={'fluid-container'}>
          <RouterLink/>
          <Switch>
          
              <Route exact path='/Login' render={()=>{
                  if(this.state.logeado === false){
                    return <IniciarSesion f_cargar_props={this.cargar_props} propiedades_={this.propiedades}></IniciarSesion>
                  }else{
                    return <Redirect f_cargar_props={this.cargar_props} propiedades_={this.propiedades} to={{pathname: '/CuadroDeComandoUsuarios'}}></Redirect>
                  }
              }}></Route>

              <Route exact path='/CuadroDeComandoUsuarios' render={()=>{

                  if((this.state.logeado) && (this.state.usuRol===false)){
                    return <CuadroDeComandoUsuarios f_cargar_props={this.cargar_props} propiedades_={this.propiedades}></CuadroDeComandoUsuarios>
                  }else{
                    if((this.state.logeado) && (this.state.usuRol===true)){
                      return <CuadroDeComandoAdministradores f_cargar_props={this.cargar_props} propiedades_={this.propiedades}></CuadroDeComandoAdministradores>
                    }else{
                      return <Redirect f_cargar_props={this.cargar_props} propiedades_={this.propiedades} to={{pathname: '/Login'}}></Redirect>
                    }
                  }

              }}></Route>

              {/* <Route exact path='/CuadroDeComandoAdministradores' render={()=>{

                  if(this.state.logeado){
                    return <CuadroDeComandoAdministradores f_cargar_props={this.cargar_props} propiedades_={this.propiedades}></CuadroDeComandoAdministradores>
                  }else{
                    return <Redirect f_cargar_props={this.cargar_props} propiedades_={this.propiedades} to={{pathname: '/Login'}}></Redirect>
                  } 

                  
              }}></Route> */}

              <Route exact path='/Registrarse' render={()=>{
                    if(this.state.logeado === false){
                      return <Registrarse f_cargar_props={this.cargar_props} propiedades_={this.propiedades}></Registrarse>
                    }else{
                      return <Redirect f_cargar_props={this.cargar_props} propiedades_={this.propiedades} to={{pathname: '/CuadroDeComandoUsuarios'}}></Redirect>
                    }           
              }}></Route>

              <Route exact path='/CompletarRegistroLoginSocial' render={()=>{
                    if(this.state.logeado === false){
                      return <CompletarRegistroLoginSocial f_cargar_props={this.cargar_props} propiedades_={this.propiedades}></CompletarRegistroLoginSocial>
                    }else{
                      return <Redirect f_cargar_props={this.cargar_props} propiedades_={this.propiedades} to={{pathname: '/CuadroDeComandoUsuarios'}}></Redirect>
                    }          
              }}></Route>
          
            {/* <Route exact path='/Usuarios' render={()=>{
                  if(this.state.logeado){
                    return <Usuarios f_cargar_props={this.cargar_props} propiedades_={this.propiedades}></Usuarios>
                  }                 else{
                    return <Redirect f_cargar_props={this.cargar_props} propiedades_={this.propiedades} to={{pathname: '/Login'}}></Redirect>
                  } 
            }}></Route> */}

            <Route exact path='/CrudUsuarios' render={()=>{
                  if(this.state.logeado){
                    return <TablaUsuarios f_cargar_props={this.cargar_props} propiedades_={this.propiedades}></TablaUsuarios>
                  }else{
                    return <Redirect f_cargar_props={this.cargar_props} propiedades_={this.propiedades} to={{pathname: '/Login'}}></Redirect>
                  } 
            }}></Route>

            <Route exact path='/Cursos' render={()=>{
                  if(this.state.logeado){
                    return <Cursos f_cargar_props={this.cargar_props} propiedades_={this.propiedades}></Cursos>
                  }else{
                    return <Redirect f_cargar_props={this.cargar_props} propiedades_={this.propiedades} to={{pathname: '/Login'}}></Redirect>
                  } 
            }}></Route>

            <Route exact path='/MostrarCursos' render={()=>{
                  if(this.state.logeado){
                    return <MostrarCurso f_cargar_props={this.cargar_props} propiedades_={this.propiedades}></MostrarCurso>
                  }else{
                    return <Redirect f_cargar_props={this.cargar_props} propiedades_={this.propiedades} to={{pathname: '/Login'}}></Redirect>
                  }        
            }}></Route>

            <Route exact path='/ListaCursos' render={()=>{


                    if((this.state.logeado) && (this.state.usuRol===false)){
                      return <ListaCursosUser f_cargar_props={this.cargar_props} propiedades_={this.propiedades}></ListaCursosUser>
                    }else{
                      if((this.state.logeado) && (this.state.usuRol===true)){
                        return <ListaCursos f_cargar_props={this.cargar_props} propiedades_={this.propiedades}></ListaCursos>
                      }else{
                        return <Redirect f_cargar_props={this.cargar_props} propiedades_={this.propiedades} to={{pathname: '/Login'}}></Redirect>
                      }
                    }
         
            }}></Route>

            <Route exact path='/Evaluaciones' render={()=>{
                  //if(this.state.logeado){
                    return <Evaluaciones f_cargar_props={this.cargar_props} propiedades_={this.propiedades}></Evaluaciones>
                  //}else{
                    //return <Redirect f_cargar_props={this.cargar_props} propiedades_={this.propiedades} to={{pathname: '/Login'}}></Redirect>
                  //} 
            }}></Route>

            <Route exact path='/VerEvaluacion' render={()=>{
                  if(this.state.logeado){
                    return <VerEvaluacion f_cargar_props={this.cargar_props} propiedades_={this.propiedades}></VerEvaluacion>
                  }else{
                    return <Redirect f_cargar_props={this.cargar_props} propiedades_={this.propiedades} to={{pathname: '/Login'}}></Redirect>
                  } 
            }}></Route>

            <Route exact path='/ResultadoEvaluacion' render={()=>{
                  if(this.state.logeado){
                    return <ResultadoEvaluacion f_cargar_props={this.cargar_props} propiedades_={this.propiedades}></ResultadoEvaluacion>
                  }else{
                    return <Redirect f_cargar_props={this.cargar_props} propiedades_={this.propiedades} to={{pathname: '/Login'}}></Redirect>
                  } 
            }}></Route>

          </Switch>
        </Router>
    )  
  }
  
}

export default App;
