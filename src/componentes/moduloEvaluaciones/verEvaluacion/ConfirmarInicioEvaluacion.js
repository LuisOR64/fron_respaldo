import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ConfirmarInicioEvaluacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluacion: {},
      tiempo: 0
    };
  }
  componentDidMount() {
    let evaluacion = JSON.parse(localStorage.getItem("evaluacion"));
    let tiempo = evaluacion.tiempoDuracion;
    this.setState(
      {
        tiempo,
        evaluacion
      },
      () => {
        console.log(evaluacion);
      }
    );
  }
  render() {
    let tiempo = 1;
    let curso = "";
    if (this.state.tiempo !== 0) {
      tiempo = this.state.evaluacion.tiempoDuracion;
      curso = this.state.evaluacion.nombreDelCurso.toUpperCase();
      console.log(tiempo);
    }
    return (
      <div className="container mt-4">
        <div className="jumbotron text-center hoverable p-4">
          <div className="row">
            <div className="col-md-4 offset-md-1 mx-3 my-3">
              <div className="view overlay">
                <img
                  src="https://mdbootstrap.com/img/Photos/Others/laptop-sm.jpg"
                  className="img-fluid"
                  alt="Sample image for first version of blog listing"
                />
                <a>
                  <div className="mask rgba-white-slight"></div>
                </a>
              </div>
            </div>

            <div className="col-md-7 text-md-left ml-3 mt-3">
              <a href="#!" className="green-text">
                <h6 className="h6 pb-1">
                  <i className="fas fa-desktop pr-1"></i> Evaluación
                </h6>
              </a>

              <h4 className="h4 mb-4">Bienvenido!</h4>

              <p className="font-weight-normal">
                A continuacion vas a llevar a cabo la evaluación del curso{" "}
                <span style={{ fontWeight: 500 }}>{curso}</span>
              </p>
              <p className="font-weight-small">
                *Antes de iniciar debera tener en cuenta lo siguiente. Al
                iniciar la evaluación contara con un tiempo limitado de{" "}
                {tiempo / 60000} minutos para realizar la prueba. Una vez
                culminado el tiempo la evaluación sera guardada con el avanza
                obtenido, tomar las precauciones del caso.Al culminar el tiempo
                obtendra los resultados de manera automática.
              </p>
              <p className="font-weight-normal">
                Por{" "}
                <a>
                  <strong>INAGEP</strong>
                </a>
                , 04/10/2019
              </p>

              <button className="btn btn-success">
                <Link to="/VerEvaluacion" className="text-white">
                  {" "}
                  <i className="fas fa-clipboard-list fa-2x"></i>{" "}
                  <span className="font-weight">INICIAR</span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
