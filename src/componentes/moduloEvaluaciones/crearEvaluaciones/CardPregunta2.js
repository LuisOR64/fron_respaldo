import React, { Component } from "react";

export default class CardPregunta2 extends Component {
  cambiarPregunta(index) {
    console.log("click " + index);
    this.props.cambiarActual(index);
  }

  eliminarPreguntaExterno = index => {
    console.log(index);
    this.props.eliminarPregunta(index);
  };

  render() {
    return (
      <div>
        <div>
          <div style={{ position: "relative" }}>
            <button
              type="button"
              className="btn-floating btn-danger btn-sm"
              style={{ borderRadius: "50px" }}
              onClick={() => {
                this.eliminarPreguntaExterno(this.props.index);
              }}
            >
              <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
          </div>
          <button
            className="btn blue-gradient"
            onClick={() => {
              this.cambiarPregunta(this.props.index);
            }}
          >
            Pregunta {this.props.index + 1}
          </button>
        </div>
      </div>
    );
  }
}
