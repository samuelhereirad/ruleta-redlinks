import React from "react";
import ruleta from "../img/ruleta.png";
import "./index.css";
import base from "./../img/base-ruleta.png";
import spin from "./../img/seleccion.png";

const Ruleta = (props) => (
  <div
    className="row"
    style={{ flexDirection: "column", alignItems: "center" }}
  >
    <div className="col-md-10 col-lg-5 text-center mt-5" align="center">
      <img src={spin} className="spin" alt="" />
      <img
        id="img-ruleta"
        src={ruleta}
        style={{
          transform: "rotate(" + props.data_ruleta + "deg)",
          WebkitTransform: "rotate(" + props.data_ruleta + "deg)",
        }}
        alt="Ruleta"
        onTransitionEnd={props.showRuletaResult}
        className="img-responsive img-ruleta"
        ref={props.ruleta}
      />
    </div>
    <div className="col-md-7 col-lg-5">
      <img src={base} alt="" width="100%" />
    </div>
    <div className="col-md-6 col-lg-5" align="center">
      <button
        id="btnAnimar"
        disabled={props.animatedRuleta}
        onClick={props.animarEvent}
        className="btn btn-block btn-warning btn-orange btn-lg"
      >
        Girar la ruleta
      </button>
      <p>Toca el botón para firar la ruleta</p>
    </div>
  </div>
);

export default Ruleta;
