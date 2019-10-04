class servicioToken {

    token;

    constructor(){
        this.cargar_token(); 
    }

    cargar_token=()=>{
        if(localStorage.getItem('token')){
            this.token = localStorage.getItem('token');
        }
    }

    obtener_rol = ()=>{
        let respuesta = false;

        try {
            
        
        if(this.token){
            (JSON.parse(atob(this.token))).authorities.map((rol)=>{
                if(rol === 'ADMIN'){
                    respuesta = true;
                }
            });
        }else{
            respuesta = false;
        }


    } catch (error) {
            
    }
        
        return respuesta;
    }

    verificar_sesion_abierta =()=>{
        console.log('sesion');
        try{

        
        if(this.token){
          //let token_data_center = this.token.split(".")[1];
          let token_data_center_desc = JSON.parse(atob(this.token));
    
          if(token_data_center_desc.exp > (new Date().getTime())/1000){
            return true;
          }else{
            localStorage.removeItem("token");
            this.token = null;
            return false;
          }
    
        }else{
            localStorage.removeItem("token");
            return false;
        }

    }catch(ex){
        localStorage.removeItem("token");
        return false;
    }
    }

    cerrar_session=()=>{
        this.token = null;
        localStorage.removeItem("token");
    }

    guardar_token(token){
        console.log('guardar token');
        this.token = token.split(".")[1];
        console.log(this.token);
        localStorage.setItem("token", this.token);
        console.log('guardar token');
    }

}

export default servicioToken;