import React, { useRef, useContext, useEffect, useState } from 'react'
import { Modal, Button, Spinner, Row, Col, input, Table, tbody, td, th } from 'react-bootstrap';
import { ActualizarPropietarioApi, GetUsuariosApi } from '../Apis/ApiUsuarios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
function ModaAsingarPremio({ elemento }) {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const puntosRef = useRef();
    const [usuarios, setUsuarios] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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

    async function handlecambiarpropietario(e, cui, nombre) {
        e.preventDefault();
        try {

            const rawResponse = await ActualizarPropietarioApi(cui, elemento.Id)

            if (rawResponse.status == 200) {
                Toast.fire({
                    icon: "success",
                    title: `Premio asignado correctamente a ${nombre}!`,
                    timer: 1500,
                });
                setTimeout(() => window.location.reload(), 1500);

            } else if (rawResponse.status == 400) {
                Toast.fire({
                    icon: "warning",
                    title: `¡Algo fallo al asignar el premio!`,
                    timer: 3000,
                });


            } else {
                Toast.fire({
                    icon: "warning",
                    title: `¡Algo fallo al asignar el premio!`,
                    timer: 3000,
                });

            }
            //  setLoading(false);
        } catch (error) {
            console.log(error);
            Toast.fire({
                icon: "error",
                title: `¡Ocurrio un error en el servidor al asignar el premio!`,
                timer: 4000,
            });

        }
    }

    return (
        <>
            <Button variant="success" onClick={handleShow} size="sm">
                Asignar premio a usuario
            </Button>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{elemento.Nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Asigna el premio a un usuario!
                    <div className="row align-center mb-2 p-2" >
                        {isLoading ?   <div className="bg-light min-vh-100 d-flex flex-row align-items-center justify-content-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div> :
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>CUI</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
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
                                                <td> {usuario.Correo}</td>
                                                <td>    <Button variant="success" onClick={(e) => handlecambiarpropietario(e, usuario.Cui, usuario.Nombre)} size="sm">
                                                    Asignar premio a usuario
                                                </Button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }

                            </tbody>
                        </Table>
}
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>


                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModaAsingarPremio