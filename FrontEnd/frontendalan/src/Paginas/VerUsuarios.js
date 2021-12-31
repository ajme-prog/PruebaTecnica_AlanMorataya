// Home.js
import React, { useRef, useContext, useEffect, useState } from 'react'
import { Form, FormGroup, Card, FormLabel, FormText, Spinner, Button, Container, Row, Col, input, Table, tbody, td, th } from 'react-bootstrap';
import { AuthContext } from '../Context/AuthProvider'
import { GetUsuariosApi } from '../Apis/ApiUsuarios';
import ModalPuntos from '../Paginas/Modalpuntos';
import Swal from "sweetalert2";
import NavbarAdmin from './NavbarAdmin';
const VerUsuarios = () => {
    const { usuario, cerrarSesion, iniciarSesion } = useContext(AuthContext);
    const [usuarios, setUsuarios] = useState([]);
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
                const rawResponse = await GetUsuariosApi();
                const respuesta = await rawResponse.json();
                console.log(rawResponse)
                return respuesta;
            }

            fetchData().then((respuesta) => {
                // 
                if (respuesta.status === 200) {

                    setUsuarios(respuesta.usuarios)
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
            <Card>

                <Card.Header><h4>Usuarios</h4></Card.Header>

                <Card.Body>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>CUI</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Telefono</th>
                                <th>Puntos</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usuarios.map((usuario, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{usuario.Cui}</td>
                                            <td>{usuario.Nombre}</td>

                                            <td>{usuario.Correo}</td>
                                            <td>{usuario.Telefono}</td>
                                            <td>{usuario.Puntos}</td>
                                            <td ><ModalPuntos elemento={usuario}/></td>
                                        </tr>
                                    );
                                })
                            }

                        </tbody>
                    </Table>

                </Card.Body>
            </Card>

        </>
    );
}

export default VerUsuarios