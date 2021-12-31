// Home.js
import React, { useRef, useContext, useEffect, useState, useLoad } from 'react'
import { Form, FormGroup, Card, FormLabel, ProgressBar, Spinner, ListGroup, ListGroupItem, FormText, FormControl, Button, Container, Row, Col, input, Table, tbody, td, th } from 'react-bootstrap';
import { AuthContext } from '../Context/AuthProvider'
import { GetPromocionesApi } from '../Apis/ApiUsuarios';
import ModaAsingarPremio from './ModalAsignarPremio';
import Swal from "sweetalert2";
import NavbarUsuario from './NavbarUsuario';
const VerPromocionesUsuario = () => {
    const { usuario, cerrarSesion, iniciarSesion } = useContext(AuthContext);
    const [promociones, setpromociones] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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

    useEffect(() => {
        try {
            async function fetchData() {
                setIsLoading(true);
                const rawResponse = await GetPromocionesApi();
                const respuesta = await rawResponse.json();
                console.log(rawResponse)
                return respuesta;
            }

            fetchData().then((respuesta) => {
                // setIsLoading(false);
                if (respuesta.status === 200) {
                    //  alert("si es 200")
                    setpromociones(respuesta.promociones)
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                }
            });

        } catch (e) {

        }

    }, []);

    //---Funcion para login
    async function handleSubmit(e) {
        e.preventDefault();
        try {

        } catch (error) {


        }
    }


    return (
        isLoading ?
            <>
                <NavbarUsuario></NavbarUsuario>
                <div className="bg-light min-vh-100 d-flex flex-row align-items-center justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </>
            :
            <>

                <NavbarUsuario></NavbarUsuario>
                <div><br></br></div>

                <div className="bg-light min-vh-100  align-items-center justify-content-center">

                    <div className="d-flex flex-row align-items-center justify-content-center">


                        <h2>Promociones disponibles</h2>

                    </div>
                    <div><br></br></div>
                    <Row md={4} mb={5}>

                        {
                            promociones.map((premio, index) => {
                             

                                    return (
                                        <Col xs={3}>
                                            <Card style={{ width: '18rem', mb: 5 }} key={index}>
                                                <Card.Img variant="top" src="promociones.png" width={50} height={200} />
                                                <Card.Body>
                                                    <Card.Title>{premio.Nombrepromocion}</Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">Fecha inicio: {premio.Fechainicio.split('T')[0]}</Card.Subtitle>
                                                    <Card.Subtitle className="mb-2 text-muted">Fecha fin: {premio.Fechafin.split('T')[0]}</Card.Subtitle>
                                                   
                                                    <Card.Text>
                                                        {premio.Descripcionpromocion}
                                                    </Card.Text>

                                       

                                                </Card.Body>
                                            </Card>
                                            <div><br></br></div>
                                        </Col>

                                    );
                              
                            })
                        }

                    </Row>

                </div>

            </>
    );
}

export default VerPromocionesUsuario