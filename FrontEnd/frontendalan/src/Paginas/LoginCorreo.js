// Home.js
import React, {useRef,useContext} from 'react'
import { Form, FormGroup, FormLabel, FormText, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider'
import Swal from "sweetalert2";
const LoginCorreo = () => {
    const {usuario,  cerrarSesion, iniciarSesion}=useContext(AuthContext);
    const navigate = useNavigate();
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
   
      const rawResponse = await iniciarSesion(correoRef.current.value,passwordRef.current.value)
      
      if (rawResponse.status==200) {
        Toast.fire({
          icon: "success",
          title: `¡Bienvenido!`,
          timer: 4000,
        });
         
         if(rawResponse.Rol=="0"){
          navigate("/admin") //con navigate me dirigo a una pagina especifica

         }
       else{
        navigate("/usuario") //con navigate me dirigo a una pagina especifica
       }
      }else if(rawResponse.status==400) 
       {
        Toast.fire({
          icon: "warning",
          title: `¡Credenciales incorrectas!`,
          timer: 3000,
        });
  
        correoRef.current.value = "";
        passwordRef.current.value = "";
      }else {
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
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <Container className="justify-content-right" >

                <Row >
                    <Col md={{ span: 4, offset: 4 }}>


                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="justify-content-right">Correo</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" ref={correoRef} />
                                <Form.Text className="text-muted">

                                </Form.Text>
                            </Form.Group>

                            <FormGroup className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" ref={passwordRef} />
                            </FormGroup>

                            <Button variant="success"  onClick={handleSubmit}>
                                Iniciar sesión
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default LoginCorreo