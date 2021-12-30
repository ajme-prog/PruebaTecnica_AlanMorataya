// Home.js
import React, { useRef, useContext } from 'react'
import { Form, FormGroup, Card, FormLabel, FormText, FormControl, Button, Container, Row, Col, input } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider'
import Swal from "sweetalert2";
import { NuevoUsuarioApi } from '../Apis/ApiUsuarios';
const NuevoUsuario = () => {
  const { usuario, cerrarSesion, iniciarSesion } = useContext(AuthContext);
  const navigate = useNavigate();
  const cuiRef= useRef();
  const nombreRef = useRef();
  const telefonoRef = useRef();
  const correoRef = useRef();
  const passwordRef = useRef();
  //---componente para el toast
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  //---Funcion para login
  async function handleSubmit(e) {
    e.preventDefault();
    try {

      //console.log(" EL TELEFONO ES "+telefonoRef.current.value)
      const rawResponse = await NuevoUsuarioApi(cuiRef.current.value,nombreRef.current.value,correoRef.current.value,telefonoRef.current.value,passwordRef.current.value)

      if (rawResponse.status == 200) {
        Toast.fire({
          icon: "success",
          title: `¡Usuario creado correctamente!`,
          timer: 4000,
        });

        
          navigate("/") //con navigate me dirigo a una pagina especifica

      
        
      } else if (rawResponse.status == 400) {
        Toast.fire({
          icon: "warning",
          title: `¡Credenciales incorrectas!`,
          timer: 3000,
        });

        correoRef.current.value = "";
        passwordRef.current.value = "";
      } else {
        Toast.fire({
          icon: "warning",
          title: `¡Ocurrio un error en el servidor!`,
          timer: 3000,
        });
        correoRef.current.value = "";
        passwordRef.current.value = "";
      }
      //  setLoading(false);
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: "error",
        title: `¡Ocurrio un error en el servidor!`,
        timer: 4000,
      });

    }
  }


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center justify-content-center">
      <Card>

        <Card.Header><h4>Registro</h4></Card.Header>

        <Card.Body>

          <Form>

            <div className="row align-center mb-2 p-2" >

              <Form.Label >Cui</Form.Label>
              <Form.Control type="text" placeholder="Ingrese su No. de CUI" ref={cuiRef} />
              <Form.Text className="text-muted">

              </Form.Text>


            </div>

            <div className="row align-center mb-2 p-2" >

              <Form.Label >Nombre</Form.Label>
              <Form.Control type="text" placeholder="Ingrese su nombre" ref={nombreRef} />
              <Form.Text className="text-muted">

              </Form.Text>


            </div>

            <div className="row align-center mb-2 p-2" >

              <Form.Label >Correo</Form.Label>
              <Form.Control type="email" placeholder="Ingrese su correo" ref={correoRef} />
              <Form.Text className="text-muted">

              </Form.Text>


            </div>

            <div className="row align-center mb-2 p-2" >

              <Form.Label >Telefono</Form.Label>
              <Form.Control type="text" placeholder="Ingrese su teléfono" ref={telefonoRef} />
              <Form.Text className="text-muted">

              </Form.Text>


            </div>

            <div className="row align-center mb-2 p-2" >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Ingrese su password" ref={passwordRef} />
            </div>

            <Button variant="success" onClick={handleSubmit}>
              Registrar Usuario
            </Button>
          </Form>

        </Card.Body>
      </Card>
    </div>
  );
}

export default NuevoUsuario