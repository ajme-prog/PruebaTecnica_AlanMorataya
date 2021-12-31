
import React, { useRef, useContext } from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider'
const NavbarAdmin = () => {
  const { usuario, cerrarSesion, iniciarSesion } = useContext(AuthContext);
  const navigate = useNavigate();
  function handlecerrarsesion(e) {
    e.preventDefault();
    cerrarSesion();
    navigate("/")
  }

  function handleiracrearpremio(e) {
    e.preventDefault();

    navigate("/registropremio")
  }

  function handleircrearpromocion(e) {
    e.preventDefault();

    navigate("/registropromocion")
  }

  function handleiraverusuarios(e) {
    e.preventDefault();

    navigate("/verusuarios")
  }

  
  function handleirverpremios(e) {
    e.preventDefault();

    navigate("/verpremios")
  }

  
  function handleirverpromociones(e) {
    e.preventDefault();

    navigate("/verpromociones")
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >Perfil Administrador</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={handleiracrearpremio}>Crear Premio</Nav.Link>
              <Nav.Link onClick={handleircrearpromocion}>Crear Promoción</Nav.Link>
              <Nav.Link onClick={handleirverpremios}>Ver Premios</Nav.Link>
              <Nav.Link onClick={handleirverpromociones}>Ver Promociones</Nav.Link>
              <Nav.Link onClick={handleiraverusuarios}>Ver Usuarios</Nav.Link>
          
            </Nav>
            <Nav>

              <Nav.Link onClick={handlecerrarsesion}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarAdmin