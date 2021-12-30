// Home.js
import React, {useRef,useContext} from 'react'
import { Form, FormGroup, FormLabel, FormText, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider'
import NavbarAdmin from './NavbarAdmin';
import Swal from "sweetalert2";
const Dashboardadmin = () => {

    const {usuario,  cerrarSesion, iniciarSesion}=useContext(AuthContext);
    

    return (
        <>
        <NavbarAdmin></NavbarAdmin>
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <Container className="justify-content-right" >

            </Container>
        </div>
        </>
    );
}

export default Dashboardadmin