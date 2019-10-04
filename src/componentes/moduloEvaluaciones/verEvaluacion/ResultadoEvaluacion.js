import React, { Component } from "react";
import "./../EvaluacionesCss/evaluaciones.css";

export default class ResultadoEvaluacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluacion: {},
      respuestas: {},
      puntajeTotal: 0
    };
  }

  componentDidMount() {
    if (localStorage.getItem("evaluacion") !== null) {
      let e = {};
      e = JSON.parse(localStorage.getItem("evaluacion"));
      //   console.log(e);
      this.setState(
        {
          evaluacion: e
        },
        () => {
          console.log(this.state.evaluacion);
          this.buscarRespuestas();
        }
      );
    }
  }

  buscarRespuestas() {
    let preguntas = this.state.evaluacion.preguntas;
    console.log(preguntas);
    let respuestas = preguntas.map((p, index) => {
      return JSON.parse(localStorage.getItem(index));
    });
    this.setState(
      {
        respuestas
      },
      () => {
        console.log(this.state.respuestas);
        this.acumularPuntaje();
      }
    );
  }

  acumularPuntaje() {
    let arrayResp = this.state.respuestas;
    let arrayEvaluacionPreguntas = this.state.evaluacion.preguntas;
    let acumulado = 0;
    for (let i = 0; i < arrayResp.length; i++) {
      if (+arrayResp[i].respuestaAlumno === arrayResp[i].respuestaCorrecta) {
        acumulado = acumulado + arrayEvaluacionPreguntas[i].puntajeVale;
      }
    }
    this.setState({
      puntajeTotal: acumulado
    });
  }

  render() {
    // let listaRespuestas;
    if (this.state.evaluacion) {
      var evaluacion = this.state.evaluacion;
    }
    if (this.state.puntajeTotal > 0) {
      let arrayResp = this.state.respuestas;
      var listaRespuestas = arrayResp.map((p, index) => {
        return (
          <tr key={p.nroPregunta}>
            <td></td>
            <td>Pregunta {p.nroPregunta}</td>
            {+arrayResp[index].respuestaAlumno ===
            arrayResp[index].respuestaCorrecta ? (
              <td>
                <i className="fa fa-check text-success" aria-hidden="true"></i>
              </td>
            ) : (
              <td>
                <i class="fa fa-times text-danger" aria-hidden="true"></i>
              </td>
            )}
          </tr>
        );
      });
    }
    return (
      <div className="container mt-4">
        <div className="jumbotron text-center p-4">
          <div className="row">
            <div className="col">
              <table className="table table-responsive table-hover">
                <thead>
                  <tr>
                    <th>Ver Detalle</th>
                    <th>Curso</th>
                    <th>Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    className="clickable"
                    data-toggle="collapse"
                    data-target="#group-of-rows-1"
                    aria-expanded="false"
                    aria-controls="group-of-rows-1"
                  >
                    <td>
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </td>
                    <td>{evaluacion.nombreDelCurso}</td>
                    <td>{this.state.puntajeTotal}</td>
                  </tr>
                </tbody>
                <tbody id="group-of-rows-1" className="collapse">
                  {/* <tr>
                    <td>- child row</td>
                    <td>data 1</td>
                    <td>data 1</td>
                  </tr>
                  <tr>
                    <td>- child row</td>
                    <td>data 1</td>
                    <td>data 1</td>
                  </tr> */}
                  {listaRespuestas}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
