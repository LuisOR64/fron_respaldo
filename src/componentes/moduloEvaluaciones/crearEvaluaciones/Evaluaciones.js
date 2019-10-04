import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

//material-UI
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

//CLASES
// import CardPregunta from "./CardPregunta";
import Pregunta from "./Pregunta";
import CardPregunta2 from "./CardPregunta2";
// import $ from "jquery";
//css
import "./../EvaluacionesCss/evaluaciones.css";

//timepicker
import DateTimePicker from "react-datetime-picker";

class Evaluaciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursoId: 1,
      nombreDelCurso: "Curso de Hidrologia",
      moduloId: 1,
      fechainicio: new Date(),
      fechafin: new Date(),
      tiempoDuracion: 0,
      preguntas: [
        {
          nroPregunta: 0,
          enunciado: "",
          opcionRespuesta: 1,
          opcionRespuestaCorrecta: 1,
          puntajeVale: 0,
          opciones: []
        }
      ],
      actual: 0
    };
  }

  componentDidMount() {
    // $("#modalSubscriptionForm").modal("show");
  }

  /*recibe una pregunta tipo
    {
          nroPregunta: 0,
          enunciado: "",
          opcionRespuesta: 1,
          opciones: []
    }
  */
  cambiarEnunciadoPregunta = enunciado => {
    let arrayPreg = [];
    arrayPreg = [...this.state.preguntas];
    arrayPreg[this.state.actual].enunciado = enunciado;
    this.setState({
      preguntas: arrayPreg
    });
  };

  cambiarTiempoDuracion = e => {
    // console.log(e.target.value);
    this.setState({
      tiempoDuracion: e.target.value
    });
  }

  cambiarOpcionRespuestaCorrecta = opc => {
    let arrayPreg = [];
    arrayPreg = [...this.state.preguntas];
    arrayPreg[this.state.actual].opcionRespuestaCorrecta = opc;
    this.setState(
      {
        preguntas: arrayPreg
      },
      () => {
        console.log(this.state.preguntas);
      }
    );
  };
  verificarPuntaje() {
    let arrayPre = this.state.preguntas;
    let puntaje = 0;
    for (let i = 0; i < arrayPre.length; i++) {
      puntaje = puntaje + arrayPre[i].puntajeVale;
    }
    if (puntaje !== 20) {
      alert(`El puntaje acumulado debe ser 20 actualmente esta en ${puntaje}`);
      return false;
    } else {
      return true;
    }
  }

  guardarEvaluacion = e => {
    //LOGICA PARA GUARDAR LA EVALUACION EN LA BASE DE DATOS
    e.preventDefault();
    console.log(e);
    let duracion = this.state.tiempoDuracion;
    let min = duracion * 60000;

    let evaluacion = {
      cursoId: this.state.cursoId,
      nombreDelCurso: this.state.nombreDelCurso,
      moduloId: this.state.moduloId,
      fechainicio: this.state.fechainicio,
      fechafin: this.state.fechafin,
      tiempoDuracion: min,
      preguntas: this.state.preguntas
    };

    if (this.verificarPuntaje()) {
      localStorage.setItem(`evaluacion`, JSON.stringify(evaluacion));
      alert("Evaluación guardada correctamente");
    } else {
      alert("No se pudo guardar correctamente la evaluación");
    }
  };

  eliminarPregunta = index => {
    if (this.state.preguntas.length > 1) {
      let arrayPreg = [];
      arrayPreg = [...this.state.preguntas];
      arrayPreg.splice(index, 1);
      // console.log(arrayPreg);

      this.cambiarActual(index - 1);
      this.setState(
        {
          preguntas: arrayPreg
        },
        () => {
          // console.log(this.state.preguntas);
          arrayPreg = [...this.state.preguntas];
          for (let i = index; i < this.state.preguntas.length; i++) {
            arrayPreg[i].nroPregunta = arrayPreg[i].nroPregunta - 1;
          }
          this.setState({
            preguntas: arrayPreg
          });
        }
      );
    } else {
      alert("Debe exister al menos una pregunta!");
    }
  };

  cambiarOpcionesRespuesta = e => {
    if (typeof e === "number") {
      let arrayPreg = [];
      arrayPreg = [...this.state.preguntas];
      arrayPreg[this.state.actual].opcionRespuesta = e;
      arrayPreg[this.state.actual].opciones = ["", "", "", ""];
      this.setState({
        preguntas: arrayPreg
      });
    }
  };

  agregarOpciones = opc => {
    let arrayPreg = [];
    arrayPreg = [...this.state.preguntas];
    arrayPreg[this.state.actual].opcionRespuesta = 1;
    arrayPreg[this.state.actual].opciones = opc;
    this.setState({
      preguntas: arrayPreg
    });
  };

  cambiarActual = newActual => {
    this.setState(
      {
        actual: newActual
      },
      () => {
        // $("#listaPreguntas")(0)
        //   .children(this.state.actual)
        //   .css("border", "1px solid green");
      }
    );
  };

  addPregunta() {
    let pregunta = {
      nroPregunta: this.state.preguntas.length - 1 + 1,
      enunciado: "",
      opcionRespuesta: 1,
      opcionRespuestaCorrecta: 1,
      puntajeVale: 0,
      opciones: ["", "", "", ""]
    };
    this.setState({
      preguntas: [...this.state.preguntas, pregunta],
      actual: pregunta.nroPregunta
    });
  }
  abrirModal = e => {
    e.preventDefault();
    // console.log("click");
  };

  onChangeFechaInicio = fechainicio => {
    // console.log(fechainicio.toString("YYYY/mm/dd hh:mm:ss"));
    this.setState({ fechainicio });
  };
  onChangeFechaFin = fechafin => this.setState({ fechafin });

  render() {
    console.log(this.state);
    let preguntasTemp = this.state.preguntas;
    let listadoPreguntas = preguntasTemp.map((p, index) => {
      return (
        <ListItem key={index}>
          <ListItemAvatar>
            <CardPregunta2
              index={index}
              cambiarActual={this.cambiarActual}
              eliminarPregunta={this.eliminarPregunta}
            />
          </ListItemAvatar>
        </ListItem>
      );
    });

    return (
      <Fragment>
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-sm-4 col-md-3 col-lg-2">
              <div
                className="jumbotron jumbotron-fluid"
                style={{
                  height: "87vh",
                  padding: 0,
                  overflowY: "scroll"
                  // overflow: "scroll"
                }}
              >
                <div className="container pl-0">
                  <h3 className="pl-2 text-primary font-weight-bold">
                    Preguntas
                  </h3>

                  <List id="listaPreguntas">
                    {listadoPreguntas}
                    <ListItem className="ml-5">
                      <ListItemAvatar>
                        {/* <BtnAgregarPregunta addPregunta={this.addPregunta} /> */}
                        <Button
                          variant="contained"
                          size="medium"
                          color="primary"
                          className="btn-floating btn-md"
                          style={{ borderRadius: "50px" }}
                          onClick={() => {
                            this.addPregunta();
                          }}
                        >
                          <AddIcon className={estilos.leftIcon} />
                        </Button>
                      </ListItemAvatar>
                    </ListItem>
                  </List>
                </div>
              </div>
            </div>
            <div className="col-sm-8 col-md-9 col-lg-10 pl-3">
              <div
                className="jumbotron"
                style={{
                  height: "87vh",
                  padding: 0,
                  overflowY: "scroll"
                }}
              >
                <div className="container">
                  <Container fixed>
                    <h3 className="text-primary font-weight-bold">
                      Contenido Pregunta
                    </h3>
                    {console.log(preguntasTemp[this.state.actual])}
                    <Pregunta
                      pregunta={preguntasTemp[this.state.actual]}
                      cambiarEnunciadoPregunta={this.cambiarEnunciadoPregunta}
                      cambiarOpcionesRespuesta={this.cambiarOpcionesRespuesta}
                      agregarOpciones={this.agregarOpciones}
                      cambiarOpcionRespuestaCorrecta={
                        this.cambiarOpcionRespuestaCorrecta
                      }
                    />
                  </Container>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="modalGuardarEvaluacion"
          // tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <form className="text-left p-3">
                  <p className="h4 text-center mb-3">Solo unos pasos más!</p>

                  {/* <!-- Name --> */}
                  <label className="h5">Curso</label>
                  <input
                    type="text"
                    id="defaultContactFormName"
                    className="form-control mb-2"
                    placeholder={this.state.nombreDelCurso}
                    disabled
                  />
                  <label className="h5">Modulo</label>

                  <select className="browser-default custom-select mb-2">
                    <option defaultValue="" disabled>
                      Elegir una opción
                    </option>
                    <option defaultValue="1" selected>
                      Feedback
                    </option>
                    <option defaultValue="2">Report a bug</option>
                    <option defaultValue="3">Feature request</option>
                    <option defaultValue="4">Feature request</option>
                  </select>

                  <div className="row mb-3">
                    <div className="col-md-6 text-left">
                      <label className="h6">Fecha Inicio</label>
                      <DateTimePicker
                        onChange={this.onChangeFechaInicio}
                        value={this.state.fechainicio}
                        className="border border-light"
                      />
                    </div>
                    <div className="col-md-6 text-left">
                      <label className="h6">Fecha Fin</label>
                      <DateTimePicker
                        onChange={this.onChangeFechaFin}
                        value={this.state.fechafin}
                        className="border border-light"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="h6">Tiempo de duración(minutos)</label>
                    <input
                      type="text"
                      id="duracionEvaluacion"
                      className="form-control mb-2"
                      placeholder="00"
                      onChange={this.cambiarTiempoDuracion}
                    />
                  </div>

                  {/* <!-- Send button --> */}
                  <button
                    className="btn btn-info btn-block"
                    type="submit"
                    onClick={this.guardarEvaluacion}
                  >
                    Guardar Evaluación
                  </button>
                </form>
                {/* <!-- Default form contact --> */}
              </div>
            </div>
          </div>
        </div>

        <div className="btn-group cuadro_opciones_eva dropup">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle px-3"
            data-toggle="dropdown"
            style={{
              borderRadius: "50%",
              position: "fixed",
              bottom: "20px",
              right: "40px"
            }}
          >
            <i className="fa fa-list fa-2x" aria-hidden="true"></i>
          </button>
          <div className="dropdown-menu text-center">
            <div className="dropdown-item">
              <div className="row">
                <div className="col-md-6">
                  <button
                    className="btn btn-primary"
                    style={{
                      borderRadius: "50%",
                      width: "15px",
                      height: "40px",
                      paddingLeft: 15,
                      paddingTop: 8
                    }}
                    data-toggle="modal"
                    data-target="#modalGuardarEvaluacion"
                    onClick={this.abrirModal}
                  >
                    <i className="fas fa-save fa-2x"></i>
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    className="btn btn-primary"
                    style={{
                      borderRadius: "50%",
                      width: "15px",
                      height: "40px",
                      paddingLeft: 15,
                      paddingTop: 8
                    }}
                  >
                    {/* <i class="fa fa-window-close fa-2x" aria-hidden="true"></i>
                     */}
                    <i className="fa fa-times fa-2x" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <button
                    className="btn btn-primary"
                    style={{
                      borderRadius: "50%",
                      width: "15px",
                      height: "40px",
                      paddingLeft: 11,
                      paddingTop: 8
                    }}
                  >
                    <Link to="/VerEvaluacion" className="text-white">
                      {" "}
                      <i class="fas fa-image fa-2x"></i>
                    </Link>
                  </button>
                </div>
                <div className="col-md-6"></div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const estilos = makeStyles(theme => ({
  containerPrincipal: {
    flexGrow: 1
  },
  listaElementos: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    padding: 0
  },
  margin: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default withRouter(Evaluaciones);
