// Home.js
import React, {useRef,useContext} from 'react'
import { Form, FormGroup, FormLabel, FormText, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider'
import NavbarUsuario from './NavbarUsuario';
import Swal from "sweetalert2";
const Dashboardusuario = () => {

  

    return (
        <>
        <NavbarUsuario></NavbarUsuario>
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <Container className="justify-content-right" >

            </Container>
        </div>
        </>
    );
}

export default Dashboardusuario