// Home.js
import React, {useRef,useContext} from 'react'
import { Form, FormGroup, Card,FormLabel, FormText, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
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
          navigate("/verusuarios") //con navigate me dirigo a una pagina especifica

         }
       else{
        navigate("/canjearpremios") //con navigate me dirigo a una pagina especifica
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
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center justify-content-center">
      <Card>

      <Card.Header><h4>Login</h4></Card.Header>
 
 <Card.Body>

                        <Form>
                        
                        <div class="row align-center mb-2 p-2" >
                                <Form.Label >Correo</Form.Label>
                                <Form.Control type="email" placeholder="Ingrese su correo" ref={correoRef} />
                                <Form.Text className="text-muted">

                                </Form.Text>
                        </div>

                        <div class="row align-center mb-2 p-2" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Ingrese su password" ref={passwordRef} />
                                </div>

                            <Button variant="success"  onClick={handleSubmit}>
                                Iniciar sesión
                            </Button>
                        </Form>
                      
                        </Card.Body>
            </Card>
        </div>
    );
}

export default LoginCorreo