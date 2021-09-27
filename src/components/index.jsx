import React, { Component } from "react";
import swal from "@sweetalert/with-react";
import Ruleta from "./Ruleta";
import "./index.css";
import logo from "./../img/logo-redlinks.png";
// import { Modal } from "bootstrap";
import { Modal, Button } from "react-bootstrap";
import RegisterAccount from "./RegisterAccount";

class App extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      total_points: 0,
      data_ruleta: 0,
      animated_ruleta: false,
      openAccountModal: false,
    };

    this.premios = [
      { id: 1, premio: "un jarro" },
      { id: 2, premio: "unos resaltadores" },
      { id: -1, premio: "Tarjeta virtual gratis" },
    ];

    this.premios_list = [-1, 1, 2, 0, -1, 1, 2, 0];

    this.points_data = 0;
    this.rulets_data = 0;

    this.ruleta = React.createRef();
    this.form = React.createRef();

    this.animarEvent = this.animarEvent.bind(this);
    this.showRuletaResult = this.showRuletaResult.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  animarEvent() {
    var ruleta_temp = this.rulets_data;

    let grados_circulo = 360;
    let premio = grados_circulo / 8;

    var valor_aleatorio = Math.floor(Math.random() * 8);
    var ruleta_result = premio * valor_aleatorio;
    var valor_premio = grados_circulo * 4 + ruleta_result;

    this.rulets_data = valor_aleatorio;

    // puntos ganados
    this.points_data = this.premios_list[valor_aleatorio];

    this.setState({
      data_ruleta: ruleta_temp * premio,
      animated_ruleta: true,
    });

    setTimeout(() => {
      this.ruleta.current.classList.add("img-ruleta");
      this.setState({
        data_ruleta: valor_premio,
      });
    }, 200);
  }

  showRuletaResult() {
    this.ruleta.current.classList.remove("img-ruleta");

    if (this.points_data >= 0) {
      this.setState({
        total_points: this.state.total_points + this.points_data,
        animated_ruleta: false,
      });
    } else {
      this.setState({
        animated_ruleta: false,
      });
    }

    if (this.points_data === -1) {
      swal(
        "Felicidades",
        "Ha ganado una tarjeta virtual Gratis",
        "success"
      ).then((result) => {
        this.handleShow();
      });
    } else if (this.points_data > 0) {
      swal(
        "Ganaste!",
        "Has ganado " + this.premios[this.points_data - 1].premio,
        "success"
      );
    } else {
      swal("Perdiste", "Inténtelo nuevamente... :( ", "warning");
    }
  }

  handleClose() {
    this.setState({
      openAccountModal: false,
    });
  }

  handleShow() {
    this.setState({
      openAccountModal: true,
    });
  }

  render() {
    return (
      <div id="main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center logo">
              <img src={logo} alt="" />
            </div>
            <div className="col-md-12">
              <Ruleta
                total_points={this.state.total_points}
                animatedRuleta={this.state.animated_ruleta}
                data_ruleta={this.state.data_ruleta}
                showRuletaResult={this.showRuletaResult}
                animarEvent={this.animarEvent}
                ruleta={this.ruleta}
              />
            </div>
          </div>
        </div>
        <RegisterAccount
          show={this.state.openAccountModal}
          onHide={this.handleClose}
        />
      </div>
    );
  }
}

export default App;
