import {
  Form,
  InputGroup,
  Modal,
  Button,
  Col,
  FormControl,
} from "react-bootstrap";
import React, { useState } from "react";
import swal from "sweetalert";

const initialState = {
  cedula: "",
  nombre: "",
  correo: "",
  celular: "",
};

const RegisterAccount = (props) => {
  const [form, setForm] = useState(initialState);

  const handleInputChange = ({ target }) => {
    setForm((form) => ({
      ...form,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async () => {
    let res = await fetch(
      "https://appnew.redlinks.com.ec/api/guardar_ganador",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    let data = await res.json();
    if (data["status"] == "success") {
      swal("Listo!", "Se te ha enviado un correo con información", "success");
      props.onHide();
      setForm(initialState);
    }
  };

  const handleModalClose = () => {
    props.onHide();
    setForm(initialState);
  };

  return (
    <Modal
      animation={false}
      centered
      {...props}
      onHide={handleModalClose}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Obten tu tarjeta virtual</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInputGroup">Cedula</Form.Label>
            <InputGroup className="mb-2">
              <FormControl
                size="lg"
                id="inlineFormInputGroup"
                placeholder="Cédula"
                value={form.cedula}
                name="cedula"
                onChange={handleInputChange}
              />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInputGroup">
              Nombre completo
            </Form.Label>
            <InputGroup className="mb-2">
              <FormControl
                size="lg"
                id="inlineFormInputGroup"
                placeholder="Nombres y apellidos"
                value={form.nombre}
                name="nombre"
                onChange={handleInputChange}
              />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInputGroup">
              Correo electrónico
            </Form.Label>
            <InputGroup className="mb-2">
              <FormControl
                size="lg"
                id="inlineFormInputGroup"
                placeholder="Correo electrónico"
                value={form.correo}
                name="correo"
                onChange={handleInputChange}
              />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInputGroup">Celular</Form.Label>
            <InputGroup className="mb-2">
              <FormControl
                size="lg"
                id="inlineFormInputGroup"
                placeholder="Celular"
                value={form.celular}
                name="celular"
                onChange={handleInputChange}
              />
            </InputGroup>
          </Col>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterAccount;
