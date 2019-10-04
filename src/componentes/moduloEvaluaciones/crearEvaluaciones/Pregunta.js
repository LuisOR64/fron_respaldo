import React, { Component, Fragment } from "react";
import "./../EvaluacionesCss/pregunta.css";
import $ from "jquery";

export default class Pregunta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opcRespuestas: "",
      pregunta: props.pregunta
    };
    // this.agregarOpciones = this.agregarOpciones.bind(this);
  }

  UNSAFE_componentWillReceiveProps(prevProps) {
    if (this.props !== prevProps) {
      this.setState(
        {
          pregunta: prevProps.pregunta,
          opcRespuestas: ""
        },
        () => {
          this.cambiarOpcionRespuestas(this.state.pregunta.opcionRespuesta);
        }
      );
    }
  }

  componentDidMount() {
    this.cambiarOpcionRespuestas(this.state.pregunta.opcionRespuesta);
  }

  cambiarOpcionRespuestas = opc => {
    if (this.state.opcRespuestas) {
      this.setState({
        opcRespuestas: opc
      });
    } else {
      this.setState({
        opcRespuestas: opc
      });
    }
    if (this.state.opcRespuestas !== "") {
      this.props.cambiarOpcionesRespuesta(opc);
    }
  };

  cambiarOpcionRespuestaCorrecta = opc => {
    console.log(opc);
    this.props.cambiarOpcionRespuestaCorrecta(opc);
  };

  actualizarEnunciadoStateInterno = e => {
    let evento = e.target.value;
    this.setState(
      {
        pregunta: {
          ...this.state.pregunta,
          enunciado: evento
        }
      },
      () => {
        this.props.cambiarEnunciadoPregunta(evento);
      }
    );
  };

  // actualizarEnunciadoState(e) {
  //   this.props.cambiarEnunciadoPregunta(e.target.value);
  // }

  agregarOpciones = e => {
    console.log(e.target.value);

    let opciones;
    opciones = [
      $("#opcion1").val(),
      $("#opcion2").val(),
      $("#opcion3").val(),
      $("#opcion4").val()
    ];
    this.setState(
      {
        pregunta: {
          ...this.state.pregunta,
          opciones: opciones
        }
      },
      () => {
        console.log(this.state.pregunta);
        this.props.agregarOpciones(opciones);
      }
    );
  };

  decrease = () => {
    let pre = this.state.pregunta;
    pre.puntajeVale = pre.puntajeVale - 1;
    this.setState({
      pregunta: pre
    });
  };

  increase = () => {
    let pre = this.state.pregunta;
    pre.puntajeVale = pre.puntajeVale + 1;
    this.setState({
      pregunta: pre
    });
  };

  render() {
    console.log("render");
    // console.log(this.state.pregunta);
    //asignamos
    if (this.state.opcRespuestas !== "") {
      if (this.state.pregunta.opcionRespuesta === 1) {
        $("#defaultInline10").prop("checked", true);
        switch (this.state.pregunta.opcionRespuestaCorrecta) {
          case 1:
            $("#respCorrectaOpc1").prop("checked", true);
            break;
          case 2:
            $("#respCorrectaOpc2").prop("checked", true);
            break;
          case 3:
            $("#respCorrectaOpc3").prop("checked", true);
            break;
          case 4:
            $("#respCorrectaOpc4").prop("checked", true);
            break;
          default:
            break;
        }
      } else {
        $("#defaultInline10").prop("checked", true);
      }
      if (this.state.pregunta.opcionRespuesta === 2) {
        $("#defaultInline2").prop("checked", true);
        switch (this.state.pregunta.opcionRespuestaCorrecta) {
          case 1:
            $("#respCorrectaOpcVerdadero").prop("checked", true);
            break;
          case 2:
            $("#respCorrectaOpcFalso").prop("checked", true);
            break;
          default:
            break;
        }
      }
      if (this.state.pregunta.opcionRespuesta === 3) {
        $("#defaultInline3").prop("checked", true);
      }
    }

    return (
      <Fragment>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div>
              <h4 className="text-primary font-weight-bold">
                Pregunta {this.state.pregunta.nroPregunta + 1}
              </h4>
              <div className="md-form md-outline">
                <textarea
                  id="inputEnunciado"
                  className="md-textarea form-control"
                  rows="3"
                  value={this.state.pregunta.enunciado}
                  onChange={this.actualizarEnunciadoStateInterno}
                ></textarea>
                <label htmlFor="form75">Enunciado aquí</label>
              </div>
              <div>
                <h4 className="text-primary font-weight-bold mb-3">
                  Opciones de Respuesta
                </h4>

                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="defaultInline10"
                    name="inlineDefaultRadiosExample"
                    onChange={() => {
                      this.cambiarOpcionRespuestas(1);
                    }}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="defaultInline10"
                  >
                    Selección Multiple
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="defaultInline2"
                    name="inlineDefaultRadiosExample"
                    onChange={() => {
                      this.cambiarOpcionRespuestas(2);
                    }}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="defaultInline2"
                  >
                    Verdadero/Falso
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="defaultInline3"
                    name="inlineDefaultRadiosExample"
                    onChange={() => {
                      this.cambiarOpcionRespuestas(3);
                    }}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="defaultInline3"
                  >
                    Respuesta Libre
                  </label>
                </div>
              </div>
              <br />
              <div className="border border-light">
                <h4 className="text-primary font-weight-bold">Opciones</h4>
                {console.log(this.state.pregunta.opciones)}
                {this.state.pregunta.opcionRespuesta === 1 ? (
                  <div>
                    <p className="font-weight-bold ml-3">Selección Multiple</p>
                    <span id="errorOpciones" className="text-danger"></span>

                    <div className="container">
                      <div className="md-form">
                        <input
                          type="text"
                          id="opcion1"
                          className="form-control"
                          value={this.state.pregunta.opciones[0]}
                          onChange={this.agregarOpciones}
                        />
                        <label
                          id="labelopc1"
                          htmlFor="opcion1"
                          className="active"
                        >
                          Opción 1
                        </label>
                      </div>
                      <div className="md-form">
                        <input
                          type="text"
                          id="opcion2"
                          className="form-control"
                          value={this.state.pregunta.opciones[1]}
                          onChange={this.agregarOpciones}
                        />
                        <label
                          id="labelopc2"
                          htmlFor="opcion2"
                          className="active"
                        >
                          Opción 2
                        </label>
                      </div>
                      <div className="md-form">
                        <input
                          type="text"
                          id="opcion3"
                          className="form-control"
                          value={this.state.pregunta.opciones[2]}
                          onChange={this.agregarOpciones}
                        />
                        <label
                          id="labelopc3"
                          htmlFor="opcion3"
                          className="active"
                        >
                          Opción 3
                        </label>
                      </div>

                      <div className="md-form">
                        <input
                          type="text"
                          id="opcion4"
                          className="form-control"
                          value={this.state.pregunta.opciones[3]}
                          onChange={this.agregarOpciones}
                        />
                        <label
                          id="labelopc4"
                          htmlFor="opcion4"
                          className="active"
                        >
                          Opción 4
                        </label>
                      </div>
                    </div>
                  </div>
                ) : this.state.pregunta.opcionRespuesta === 2 ? (
                  <p className="font-weight-bold ml-3">Verdadero/Falso</p>
                ) : (
                  <p className="font-weight-bold ml-3">Respuesta Libre</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div>
              <h4 className="text-primary font-weight-bold mt-1">
                Respuesta Correcta
              </h4>
              {this.state.pregunta.opcionRespuesta === 1 ? (
                <div className="pt-2">
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="respCorrectaOpc1"
                      name="inlineRadiosRespuestaCorrecta1"
                      onChange={() => {
                        this.cambiarOpcionRespuestaCorrecta(1);
                      }}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="respCorrectaOpc1"
                    >
                      1
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="respCorrectaOpc2"
                      name="inlineRadiosRespuestaCorrecta1"
                      onChange={() => {
                        this.cambiarOpcionRespuestaCorrecta(2);
                      }}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="respCorrectaOpc2"
                    >
                      2
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="respCorrectaOpc3"
                      name="inlineRadiosRespuestaCorrecta1"
                      onChange={() => {
                        this.cambiarOpcionRespuestaCorrecta(3);
                      }}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="respCorrectaOpc3"
                    >
                      3
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="respCorrectaOpc4"
                      name="inlineRadiosRespuestaCorrecta1"
                      onChange={() => {
                        this.cambiarOpcionRespuestaCorrecta(4);
                      }}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="respCorrectaOpc4"
                    >
                      4
                    </label>
                  </div>
                </div>
              ) : this.state.pregunta.opcionRespuesta === 2 ? (
                <div className="pt-2">
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="respCorrectaOpcVerdadero"
                      name="inlineRadiosRespuestaCorrecta2"
                      onChange={() => {
                        this.cambiarOpcionRespuestaCorrecta(1);
                      }}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="respCorrectaOpcVerdadero"
                    >
                      Verdadero
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="respCorrectaOpcFalso"
                      name="inlineRadiosRespuestaCorrecta2"
                      onChange={() => {
                        this.cambiarOpcionRespuestaCorrecta(2);
                      }}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="respCorrectaOpcFalso"
                    >
                      Falso
                    </label>
                  </div>
                </div>
              ) : (
                <h4 className="font-weight-bold pt-2">
                  Primero se debera aprobar la respuesta
                </h4>
              )}
              <h4 className="text-primary font-weight-bold mt-3">
                Puntaje de Pregunta
              </h4>
              <div className="def-number-input number-input">
                <button onClick={this.decrease} className="minus"></button>
                <input
                  className="quantity"
                  name="quantity"
                  value={this.state.pregunta.puntajeVale}
                  onChange={() => console.log("change")}
                  type="number"
                />
                <button onClick={this.increase} className="plus"></button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
