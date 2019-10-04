import axios from 'axios';
import * as configuracion from './../variableEntorno/variables';
import { async } from 'q';

export class servicio_curso{

    url;
    token;
    respuesta;

    constructor(){
        this.url = configuracion.api_url;
    }

    obtener_cursos = async ()=>{
        this.respuesta = await axios.get(`${this.url}/curso`);
        return this.respuesta;
    }

    eliminar_curso = async (curso_id)=>{
        this.respuesta = await axios.delete(`${this.url}/curso/${curso_id}`);
        return this.respuesta;
    }

    guardar_curso = async (curso)=>{

        let headers_temp = {
            'Content-Type': 'application/json'
        }

        this.respuesta = await axios.post(`${this.url}/curso`,curso, {Headers: headers_temp});
        return this.respuesta;
    }

}
