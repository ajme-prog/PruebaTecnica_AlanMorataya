// Home.js
import React, {useRef,useContext} from 'react'
import { Form, FormGroup, Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider'
import Swal from "sweetalert2";
const Paginainicio = () => {
    const navigate = useNavigate();
function handleircorreo(e){
    e.preventDefault();
    navigate('/logincorreo');
}

function handleirtelefono(e){
    e.preventDefault();
    navigate('/logintelefono');
}

function handleirregistro(e){
    e.preventDefault();
    navigate('/registro');
}



    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center justify-content-center">
           <Card>
  <Card.Header>BIENVENIDO</Card.Header>
 
  <Card.Body>
    <Card.Title>Sistema de Premios y promociones</Card.Title>
    <Card.Text>
Ingresa tus datos para acceder al sistema de premios
    </Card.Text>

    <div class="row align-center mb-2 p-2" >
    <Button variant="primary" onClick={handleirtelefono} >Ingresar con No Telefonico</Button>
    </div>
    <div class="row align-center mb-2 p-2" >
    <Button variant="primary" onClick={handleircorreo}>Ingresar con email</Button>
    </div>
    <div class="row align-center mb-2 p-2" >
    <Card.Text>
Si no tienes una cuenta, registrate!
    </Card.Text>
    <Button variant="success" size="sm" onClick={handleirregistro}>Registrate</Button>
    </div>
    
  </Card.Body>
</Card>
        </div>
    );
}

export default Paginainicio