import axios from 'axios';
import * as configuracion from './../variableEntorno/variables';
import qs from 'qs';
import $ from 'jquery';
import bcrypt from 'bcryptjs';
//import servicio_token from './../../../servicios/servicio_token';

export class servicio_usuario{

    url;
    token;
    respuesta;

    constructor(){
        this.url = configuracion.api_url;
    }

    encriptar_password = (password)=>{
        // return bcrypt.hash(`${password}`, 10, function(err, hash) {
        //     //console.log(`respuesta encriptar password ${hash}`);
        //     password_encriptado = hash;
        // });

        return bcrypt.hashSync(`${password}`, 10);
    }

    obtener_usuarios = async ()=>{
        // console.log(`${this.url}/usuarios/listar`);
        this.respuesta = await axios.get(`${this.url}/usuarios/listar`);
        return this.respuesta;
    }

    eliminar_usuario = async (usuario_id)=>{
        this.respuesta = await axios.delete(`${this.url}/usuarios/eliminar/${usuario_id}`);
        return this.respuesta;
    }

    registrar_usuario = async (usuario)=>{

        //usuario.password = this.encriptar_password(usuario.password);
        //console.log(usuario);
        let headers_temp = {
            'Content-Type': 'application/json'
        }

        this.respuesta = await axios.post(`${this.url}/usuarios/registrar`,usuario, {Headers: headers_temp});
        return this.respuesta;
    }

    actualizar_usuario = async (usuario)=>{

        let headers_temp = {
            'Content-Type': 'application/json'
        }

        this.respuesta = await axios.put(`${this.url}/usuarios/actualizar`,usuario, {Headers: headers_temp});
        return this.respuesta;
    }

    buscar_usuario = async (usuario_id)=>{
        this.respuesta = await axios.get(`${this.url}/usuarios/listar/${usuario_id}`);
        return this.respuesta;
    }

    logearUsuToken = async (nombreUsuario, contraseñaUsuario)=>{
   
        let login = `grant_type=password&username=${encodeURIComponent(`${nombreUsuario}`)}&password=${encodeURIComponent(`${contraseñaUsuario}`)}`;

        let headers_temp = {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization" : `Basic ${btoa('plateduvirtualapp:niel89codex')}`
        }

        this.respuesta = await axios.post(`${this.url}/oauth/token`, login, {headers: headers_temp});

        return this.respuesta;
    }

    logear_usuario = async (nombreUsuario, contraseñaUsuario)=>{

        let login = {
            user: nombreUsuario,
            pass: contraseñaUsuario
        }

        console.log(login);

        let headers_temp = {
            'Content-Type': 'application/json'
        }

        this.respuesta = await axios.post(`${this.url}/usuarios/login?user=${login.user}&pass=${login.pass}`, {Headers: headers_temp});
        return this.respuesta;
    }

    // logear_usuario = async (nombreUsuario, contraseñaUsuario)=>{
   
    //     let login = {
    //         pass: nombreUsuario,
    //         user: contraseñaUsuario
    //     }

    //     let headers_temp = {
    //         'Content-Type': 'application/json'
    //     }

    //     this.respuesta = await axios.post(`${this.url}/usuarios/login`,login, {Headers: headers_temp});
    //     return this.respuesta;
    // }

}
