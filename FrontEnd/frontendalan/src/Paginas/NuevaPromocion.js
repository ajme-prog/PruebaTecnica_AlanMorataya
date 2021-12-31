// Home.js
import React, { useRef, useContext } from 'react'
import { Form, FormGroup, Card, FormLabel, FormText, FormControl, Button, Container, Row, Col, input } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider'
import Swal from "sweetalert2";
import NavbarAdmin from './NavbarAdmin';
import { NuevaPromocionApi, NuevoPremioApi } from '../Apis/ApiUsuarios';
const NuevaPromocion = () => {
    const { usuario, cerrarSesion, iniciarSesion } = useContext(AuthContext);
    const navigate = useNavigate();

    const nombreRef = useRef();
    const descripcionRef = useRef();
    const fechainicioRef = useRef();
    const fechafinRef = useRef();
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

    //---Funcion para login
    async function handleSubmit(e) {
        e.preventDefault();
        try {

            //console.log(" EL TELEFONO ES "+telefonoRef.current.value)
            const rawResponse = await NuevaPromocionApi(nombreRef.current.value, descripcionRef.current.value, fechainicioRef.current.value,fechafinRef.current.value)

            if (rawResponse.status == 200) {
                Toast.fire({
                    icon: "success",
                    title: `Promoción creada correctamente!`,
                    timer: 4000,
                });


                navigate("/verpromociones") //con navigate me dirigo a una pagina especifica



            } else if (rawResponse.status == 400) {
                Toast.fire({
                    icon: "warning",
                    title: `¡Ocurrio un error al crear la promoción!`,
                    timer: 3000,
                });


            } else {
                Toast.fire({
                    icon: "warning",
                    title: `¡Ocurrio un error en el servidor al crear la promoción!`,
                    timer: 3000,
                });

            }
            //  setLoading(false);
        } catch (error) {
            console.log(error);
            Toast.fire({
                icon: "error",
                title: `¡Ocurrio un error en el servidor!`,
                timer: 4000,
            });

        }
    }


    return (
        <>
            <NavbarAdmin></NavbarAdmin>
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center justify-content-center">
                <Card>

                    <Card.Header><h4>Registro de promociones</h4></Card.Header>

                    <Card.Body>

                        <Form>

                            <div className="row align-center mb-2 p-2" >

                                <Form.Label >Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el nombre de la promoción" ref={nombreRef} />
                                <Form.Text className="text-muted">

                                </Form.Text>


                            </div>

                            <div className="row align-center mb-2 p-2" >

                                <Form.Label >Descripcion</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese la descripción de la promoción" ref={descripcionRef} />
                                <Form.Text className="text-muted">

                                </Form.Text>


                            </div>
                            <div className="row align-center mb-2 p-2" >

                                <Form.Label >Fecha Inicio de la promoción</Form.Label>
                                <Form.Control type="Date" placeholder="Ingrese la descripción de la promoción" ref={fechainicioRef} />
                                <Form.Text className="text-muted">

                                </Form.Text>


                            </div>


                            <div className="row align-center mb-2 p-2" >

                                <Form.Label >Fecha Fin de la promoción</Form.Label>
                                <Form.Control type="Date" placeholder="Ingrese la descripción de la promoción" ref={fechafinRef} />
                                <Form.Text className="text-muted">

                                </Form.Text>


                            </div>


                            <Button variant="success" onClick={handleSubmit}>
                                Registrar Promoción
                            </Button>
                        </Form>

                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default NuevaPromocion