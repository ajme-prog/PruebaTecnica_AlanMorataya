// Home.js
import React, { useRef, useContext, useEffect, useState, useLoad } from 'react'
import { Form, FormGroup, Card, FormLabel, ProgressBar, Spinner, ListGroup, ListGroupItem, FormText, FormControl, Button, Container, Row, Col, input, Table, tbody, td, th } from 'react-bootstrap';
import { AuthContext } from '../Context/AuthProvider'
import { GetPremiosApi } from '../Apis/ApiUsuarios';
import ModaAsingarPremio from './ModalAsignarPremio';
import Swal from "sweetalert2";
import NavbarAdmin from './NavbarAdmin';
const VerPremios = () => {
    const { usuario, cerrarSesion, iniciarSesion } = useContext(AuthContext);
    const [premios, setpremios] = useState([]);
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
                const rawResponse = await GetPremiosApi();
                const respuesta = await rawResponse.json();
                console.log(rawResponse)
                return respuesta;
            }

            fetchData().then((respuesta) => {
                // setIsLoading(false);
                if (respuesta.status === 200) {
                    //  alert("si es 200")
                    setpremios(respuesta.premios)
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
                <NavbarAdmin></NavbarAdmin>
                <div className="bg-light min-vh-100 d-flex flex-row align-items-center justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </>
            :
            <>

                <NavbarAdmin></NavbarAdmin>
                <div><br></br></div>

                <div className="bg-light min-vh-100  align-items-center justify-content-center">

                    <div className="d-flex flex-row align-items-center justify-content-center">


                        <h2>Premios disponibles para asignar</h2>

                    </div>
                    <div><br></br></div>
                    <Row md={4} mb={5}>

                        {
                            premios.map((premio, index) => {
                                if (premio.Estado == '1') {

                                    return (
                                        <Col xs={3}>
                                            <Card style={{ width: '18rem', mb: 5 }} key={index}>
                                                <Card.Img variant="top" src="regalo.png" width={50} height={200} />
                                                <Card.Body>
                                                    <Card.Title>{premio.Nombre}</Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">Valor: {premio.Valor}</Card.Subtitle>
                                                    <Card.Text>
                                                        {premio.Descripcion}
                                                    </Card.Text>

                                                    <ModaAsingarPremio elemento={premio} />

                                                </Card.Body>
                                            </Card>
                                            <div><br></br></div>
                                        </Col>

                                    );
                                }
                            })
                        }

                    </Row>

                </div>

            </>
    );
}

export default VerPremios