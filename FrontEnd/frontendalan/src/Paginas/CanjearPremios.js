// Home.js
import React, { useRef, useContext, useEffect, useState, useLoad } from 'react'
import { Form, FormGroup, Card, FormLabel, ProgressBar, Spinner, Badge, ListGroupItem, FormText, FormControl, Button, Container, Row, Col, input, Table, tbody, td, th } from 'react-bootstrap';
import { AuthContext } from '../Context/AuthProvider'
import { GetPremiosUsuarioApi, CanjearPremioApi, ActualizarPuntosApi, GetUsuarioUnicoApi } from '../Apis/ApiUsuarios';
import ModaAsingarPremio from './ModalAsignarPremio';
import Swal from "sweetalert2";
import NavbarUsuario from './NavbarUsuario';
import { useNavigate } from 'react-router-dom';
const CanjearPremios = () => {
    const { usuario, cerrarSesion, iniciarSesion, setUsuario } = useContext(AuthContext);
    const [premios, setpremios] = useState([]);
    const [mispuntos, setMiSPuntos] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
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
                console.log("el usuario es " + usuario)
                setIsLoading(true);

                const rawResponse = await GetPremiosUsuarioApi(usuario.Cui);
                const respuesta = await rawResponse.json();
                console.log(rawResponse)
                return respuesta;
            }

            fetchData().then((respuesta) => {
                // setIsLoading(false);
                if (respuesta.status === 200) {
                    console.log(" la lenght es " + respuesta.premios.length)
                    setMiSPuntos(usuario.Puntos)
                    setpremios(respuesta.premios)
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                }
            });

            async function fetchData2() {
               
                setIsLoading(true);
                const rawResponse2 = await GetUsuarioUnicoApi(usuario.Cui)
                const respuesta2 = await rawResponse2.json();
                return respuesta2;
            }
             
            fetchData2().then((respuesta2) => {
                // setIsLoading(false);
                if (respuesta2.status === 200) {
                    console.log(" los puntos son " + respuesta2.usuario.Puntos)
                    setMiSPuntos(respuesta2.usuario.Puntos)
                    
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                } });
            
        

        } catch (e) {

        }

        

   
    }, []);

    //---Funcion para cambiar premio
    async function handlecambiar(e, id, valor) {
        e.preventDefault();
        try {
            setIsLoading(true);
            let valorint = parseInt(valor);
            let puntosusuario = parseInt(usuario.Puntos);
            if (valorint > puntosusuario) {
                Toast.fire({
                    icon: "warning",
                    title: `¡No cuentas con los suficientes puntos para canjear este premio!`,
                    timer: 3000,
                });
                return;
            }
            //---canjeo el premio
            const rawResponse = await CanjearPremioApi(id);
            const respuesta = await rawResponse.json();
            //--cambio los puntos del usuario
            let puntos = parseInt(usuario.Puntos) - parseInt(valorint);
            const rawResponse2 = await ActualizarPuntosApi(usuario.Cui, puntos)
            const respuesta2 = await rawResponse2.json();
            const rawResponse3 = await GetUsuarioUnicoApi(usuario.Cui)
            const respuesta3 = await rawResponse3.json();
           
            if (respuesta.status == 200 && respuesta2.status == 200  && respuesta3.status == 200) {
                setMiSPuntos(respuesta3.usuario.Puntos)
                Toast.fire({
                    icon: "success",
                    title: `Premio Canjeado de manera exitosa!`,
                    timer: 1500,
                });
                setIsLoading(false);
                navigate('/mispremios')
                
            } else if (respuesta.status == 400) {
                Toast.fire({
                    icon: "warning",
                    title: `¡Algo fallo al canjear el premio!`,
                    timer: 3000,
                });
                setIsLoading(false);

            } else {
                Toast.fire({
                    icon: "warning",
                    title: `¡Ocurrio un error en el servidor!`,
                    timer: 3000,
                });
                setIsLoading(false);
            }
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
            premios.length == 0 ?
                <>
                    <NavbarUsuario></NavbarUsuario>
                    <div><br></br></div>
                    <div className="bg-light p-3">
                        <Button variant="primary">
                            Puntos disponibles <Badge bg="secondary">{mispuntos}</Badge>
                            <span className="visually-hidden">{mispuntos}</span>
                        </Button>
                    </div>
                    <div className="bg-light min-vh-100 d-flex flex-row align-items-center justify-content-center">

                        <h1 >No tienes premios para canjear en este momento...</h1>

                    </div>
                </>
                :
                <>

                    <NavbarUsuario></NavbarUsuario>
                    <div className="bg-light ">
                        <Button variant="primary">
                            Puntos disponibles <Badge bg="secondary">{mispuntos}</Badge>
                            <span className="visually-hidden">{mispuntos}</span>
                        </Button>
                    </div>


                    <div className="bg-light min-vh-100  align-items-center justify-content-center">
                    <div><br></br></div>
                        <div className="d-flex flex-row align-items-center justify-content-center">


                            <h2>Premios disponibles para canjear</h2>

                        </div>
                        <div><br></br></div>
                        <div><br></br></div>
                        <Row md={4} mb={5}>

                            {
                                premios.map((premio, index) => {
                                    return (
                                        <Col xs={3}>
                                            <Card md={{ span: 4, offset: 4 }} style={{ width: '18rem' }} key={index}>
                                                <Card.Img variant="top" src="regalo.png" width={50} height={200} />
                                                <Card.Body>
                                                    <Card.Title>{premio.Nombre}</Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">Valor: {premio.Valor}</Card.Subtitle>
                                                    <Card.Text>
                                                        {premio.Descripcion}
                                                    </Card.Text>

                                                    <Button variant='success' onClick={(e) => handlecambiar(e, premio.Id, premio.Valor)}> Canjear Premio</Button>

                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    );
                                })
                            }
                        </Row>

                    </div>

                </>
    );
}

export default CanjearPremios