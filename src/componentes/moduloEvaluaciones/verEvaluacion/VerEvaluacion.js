import React, { Component, Fragment } from "react";
import Timer from "./Timer";
import Countdown from "react-countdown-now";
import { Link } from "react-router-dom";

import $ from "jquery";

export default class VerEvaluacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluacion: {},
      puntajeAcumulado: 0,
      minutos: 90,
      segundos: 0
    };
  }
  //   hola

  componentDidMount() {
    $("li").click(function() {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
    });

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
        }
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  acumularPuntaje = e => {
    // console.log(e.target.id);
    let preguntas = this.state.evaluacion.preguntas;
    let pregunta = e.target.id.split("-")[0];
    let respuestaDada = e.target.id.split("-")[1];
    let respCorrecta = preguntas[pregunta].opcionRespuestaCorrecta;
    let respuesta = {
      nroPregunta: pregunta,
      respuestaAlumno: respuestaDada,
      respuestaCorrecta: respCorrecta
    };
    localStorage.setItem(pregunta, JSON.stringify(respuesta));
  };

  render() {
    // let indexes;
    let cardsPreguntas;
    let tiempoDuracion = 0;
    if (this.state.evaluacion.preguntas) {
      tiempoDuracion = +this.state.evaluacion.tiempoDuracion;
      let preguntas = this.state.evaluacion.preguntas;
      //   indexes = preguntas.map((p, index) => {
      //     return (
      //       <li className="page-item" key={index}>
      //         <a
      //           className="page-link"
      //           id={`tab-${index}`}
      //           data-toggle="tab"
      //           href="#home"
      //           role="tab"
      //           aria-controls="home"
      //           aria-selected="true"
      //         >
      //           {index}
      //         </a>
      //       </li>
      //     );
      //   });

      cardsPreguntas = preguntas.map((p, index) => {
        console.log(p.opciones[0]);
        if (p.opcionRespuesta === 1) {
          return (
            <div className="card" key={`card-${p.nroPregunta}`}>
              <div className="card-body">
                <h2 className="font-weight-bold deep-orange-lighter-hover mb-3">
                  Pregunta {p.nroPregunta + 1}
                </h2>
                <p className="brown-lighter-hover">{p.enunciado}</p>
                <div className="pt-2">
                  <div className="row">
                    {p.opciones[0] !== "" ? (
                      <div className="col">
                        <div className="custom-control custom-radio btn btn-success">
                          <input
                            type="radio"
                            className="custom-control-input"
                            id={`${p.nroPregunta}-1`}
                            name={`defaultUncheckedPre${p.nroPregunta}`}
                            onChange={e => {
                              this.acumularPuntaje(e);
                            }}
                          />
                          <label
                            className="custom-control-label text-left"
                            htmlFor={`${p.nroPregunta}-1`}
                            style={{ width: "100%" }}
                          >
                            {p.opciones[0]}
                          </label>
                        </div>
                      </div>
                    ) : null}
                    {p.opciones[1] !== "" ? (
                      <div className="col">
                        <div className="custom-control custom-radio btn btn-success">
                          <input
                            type="radio"
                            className="custom-control-input"
                            id={`${p.nroPregunta}-2`}
                            name={`defaultUncheckedPre${p.nroPregunta}`}
                            onChange={e => {
                              this.acumularPuntaje(e);
                            }}
                          />
                          <label
                            className="custom-control-label text-left"
                            htmlFor={`${p.nroPregunta}-2`}
                            style={{ width: "100%" }}
                          >
                            {p.opciones[1]}
                          </label>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="row">
                    {p.opciones[2] !== "" ? (
                      <div className="col">
                        <div className="custom-control custom-radio btn btn-success">
                          <input
                            type="radio"
                            className="custom-control-input"
                            id={`${p.nroPregunta}-3`}
                            name={`defaultUncheckedPre${p.nroPregunta}`}
                            onChange={e => {
                              this.acumularPuntaje(e);
                            }}
                          />
                          <label
                            className="custom-control-label text-left"
                            htmlFor={`${p.nroPregunta}-3`}
                            style={{ width: "100%" }}
                          >
                            {p.opciones[2]}
                          </label>
                        </div>
                      </div>
                    ) : null}
                    {p.opciones[3] !== "" ? (
                      <div className="col">
                        <div className="custom-control custom-radio btn btn-success">
                          <input
                            type="radio"
                            className="custom-control-input"
                            id={`${p.nroPregunta}-4`}
                            name={`defaultUncheckedPre${p.nroPregunta}`}
                            onChange={e => {
                              this.acumularPuntaje(e);
                            }}
                          />
                          <label
                            className="custom-control-label text-left"
                            htmlFor={`${p.nroPregunta}-4`}
                            style={{ width: "100%" }}
                          >
                            {p.opciones[3]}
                          </label>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        } else if (p.opcionRespuesta === 2) {
          return (
            <div className="card" key={`card-${p.nroPregunta}`}>
              <div className="card-body">
                <h2 className="font-weight-bold deep-orange-lighter-hover mb-3">
                  Pregunta {p.nroPregunta + 1}
                </h2>
                <p className="brown-lighter-hover">{p.enunciado}</p>
                <div className="pt-2">
                  <div className="row">
                    <div className="col">
                      <div className="custom-control custom-radio btn btn-success">
                        <input
                          type="radio"
                          className="custom-control-input"
                          id={`${p.nroPregunta}-1`}
                          name={`defaultExampleRadios${p.nroPregunta}`}
                          onChange={e => {
                            this.acumularPuntaje(e);
                          }}
                        />
                        <label
                          className="custom-control-label text-left"
                          htmlFor={`${p.nroPregunta}-1`}
                          style={{ width: "100%" }}
                        >
                          Verdadero
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="custom-control custom-radio btn btn-success">
                        <input
                          type="radio"
                          className="custom-control-input"
                          id={`${p.nroPregunta}-2`}
                          name={`defaultExampleRadios${p.nroPregunta}`}
                          onChange={e => {
                            this.acumularPuntaje(e);
                          }}
                        />
                        <label
                          className="custom-control-label text-left"
                          htmlFor={`${p.nroPregunta}-2`}
                          style={{ width: "100%" }}
                        >
                          Falso
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        } else if (p.opcionRespuesta === 3) {
          return (
            <div className="card" key={`card-${p.nroPregunta}`}>
              <div className="card-body">
                <h2 className="font-weight-bold deep-orange-lighter-hover mb-3">
                  Pregunta {p.nroPregunta + 1}
                </h2>
                <p className="brown-lighter-hover">{p.enunciado}</p>
                <div className="pt-2">
                  <div className="row">
                    <div className="col-md-12">
                      <form className="md-form">
                        <textarea
                          id="form10"
                          className="md-textarea form-control"
                          rows="3"
                        ></textarea>
                        <label htmlFor="form10">
                          {" "}
                          <i className="fas fa-pencil-alt"></i> Respuesta aquí
                        </label>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        } else {
          return null;
        }
      });
    }

    return (
      <Fragment>
        <div
          className="text-primary font-weight-bold text-center"
          style={{
            height: "50px",
            width: "150px",
            // backgroundColor: "green",
            position: "fixed",
            bottom: "80px",
            right: "15px"
          }}
        >
          <i className="fa fa-history fa-2x" aria-hidden="true"></i>
          <p>
            <Countdown date={Date.now() + tiempoDuracion}>
              <Timer />
            </Countdown>
          </p>
        </div>
        <div className="jumbotron text-center mt-2 pt-1">
          <div>
            <h2 className="card-title h2">
              GESTIÓN DE RECURSOS HUMANOS EN EL SECTOR PÚBLICO
            </h2>
            <p className="blue-text my-4 font-weight-bold">
              Mercado Laboral y Recursos Humanos
            </p>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-xl-7 pb-2">
              {/* <nav aria-label="Page navigation example">
              <ul className="pagination pg-blue justify-content-center">
                <li className="page-item active">
                  <a
                    className="page-link"
                    tabIndex="-1"
                    href=""
                    onClick={e => {
                      e.preventDefault();
                    }}
                  >
                    Previous
                  </a>
                </li>
                {/* repetir segun cantidad de preguntas */}
              {/* {indexes}
                <li className="page-item">
                  <a
                    className="page-link"
                    href=""
                    onClick={e => {
                      e.preventDefault();
                    }}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav> */}
              {/* preguntas */}
              <div>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    {/* Contenido Preguntas */}
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      {/* repetir segunt las preguntas */}

                      {cardsPreguntas}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button type="button" className="btn btn-blue waves-effect">
              <Link to="/ResultadoEvaluacion" className="text-white">
                Culminar Evalución{" "}
                <i className="fa fa-arrow-right ml-1" aria-hidden="true"></i>
              </Link>
            </button>
          </div>
          <hr className="my-4" />
        </div>
      </Fragment>
    );
  }
}
