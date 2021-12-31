import React, { useRef, useContext, useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col, input, Table, tbody, td, th } from 'react-bootstrap';
import { ActualizarPuntosApi } from '../Apis/ApiUsuarios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
function ModalPuntos({ elemento }) {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const puntosRef = useRef();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
    async function handlepuntos(e) {
        e.preventDefault();
        try {
            let puntos = parseInt(elemento.Puntos) + parseInt(puntosRef.current.value);
            const rawResponse = await ActualizarPuntosApi(elemento.Cui, puntos)

            if (rawResponse.status == 200) {
                Toast.fire({
                    icon: "success",
                    title: `¡Puntos asignados correctamente!`,
                    timer: 1500,
                });
                setTimeout(() => window.location.reload(), 1500);

            } else if (rawResponse.status == 400) {
                Toast.fire({
                    icon: "warning",
                    title: `¡Algo fallo al asignar los puntos!`,
                    timer: 3000,
                });


            } else {
                Toast.fire({
                    icon: "warning",
                    title: `¡Algo fallo al asignar los puntos!`,
                    timer: 3000,
                });

            }
            //  setLoading(false);
        } catch (error) {
            console.log(error);
            Toast.fire({
                icon: "error",
                title: `¡Ocurrio un error en el servidor al asignar los puntos!`,
                timer: 4000,
            });

        }
    }

    return (
        <>
            <Button variant="success" onClick={handleShow} size="sm">
                Asignar puntos
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Puntos</Modal.Title>
                </Modal.Header>
                <Modal.Body>Agrega puntos al usuario!
                    <div class="row align-center mb-2 p-2" >

                        <Form.Label >Puntos</Form.Label>
                        <Form.Control ref={puntosRef} placeholder="Ingrese la cantidad de puntos a agregar " />


                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>

                    <Button variant="primary" onClick={handlepuntos}>
                        Asignar puntos
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalPuntos