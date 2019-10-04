import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const CardPregunta = props => {
  const classes = estilos();

  return (
    <div>
      <div>
        <IconButton aria-label="delete" size="small">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="delete" size="small">
          <EditIcon />
        </IconButton>
      </div>
      <Button
        variant="contained"
        size="medium"
        color="primary"
        className={(classes.margin, classes.cardPregunta)}
      >
        Pregunta {props.index + 1}
      </Button>
    </div>
  );
};

const estilos = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  cardPregunta: {
    backgroundColor: "#1C6EA4",
    height: "40px",
    width: "155px"
  }
}));

export default CardPregunta;
