// Home.js
import React, { useRef, useContext, useEffect, useState, useLoad } from 'react'
import { Form, FormGroup, Card, FormLabel, ProgressBar, Spinner, Badge, ListGroupItem, FormText, FormControl, Button, Container, Row, Col, input, Table, tbody, td, th } from 'react-bootstrap';
import { AuthContext } from '../Context/AuthProvider'
import { GetPremiosUsuarioApi, CanjearPremioApi } from '../Apis/ApiUsuarios';
import ModaAsingarPremio from './ModalAsignarPremio';
import Swal from "sweetalert2";
import NavbarUsuario from './NavbarUsuario';
const CanjearPremios = () => {
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
    async function handlecambiar(e, id, valor) {
        e.preventDefault();
        try {
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
            const rawResponse = await CanjearPremioApi(id);
            const respuesta = await rawResponse.json();

            if (respuesta.status == 200) {
                Toast.fire({
                    icon: "success",
                    title: `Premio Canjeado de manera exitosa!`,
                    timer: 4000,
                });

            } else if (respuesta.status == 400) {
                Toast.fire({
                    icon: "warning",
                    title: `¡Algo fallo al canjear el premio!`,
                    timer: 3000,
                });


            } else {
                Toast.fire({
                    icon: "warning",
                    title: `¡Ocurrio un error en el servidor!`,
                    timer: 3000,
                });

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
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center justify-content-center">

                <h1 >No tienes premios para canjear en este momento...</h1>

            </div>
            </>
                :
                <>

                    <NavbarUsuario></NavbarUsuario>
                    <div className="bg-light ">
                        <Button variant="primary">
                            Puntos disponibles <Badge bg="secondary">{usuario.Puntos}</Badge>
                            <span className="visually-hidden">{usuario.Puntos}</span>
                        </Button>
                    </div>

                    <div className="bg-light min-vh-100 d-flex flex-row align-items-center justify-content-center">


                        {
                            premios.map((premio, index) => {
                                return (
                                    <div md={{ span: 4, offset: 4 }}>
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
                                    </div>
                                );
                            })
                        }


                    </div>

                </>
    );
}

export default CanjearPremios