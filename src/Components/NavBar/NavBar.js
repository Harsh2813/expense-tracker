import React, {useContext} from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom';
import AuthContext from '../../Store/AuthContext';

const NavBar = () => {

    const authCxt = useContext(AuthContext);

  return (
    <>
       <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className='nav-link'>Home</Link>
            <Link to="/about" className='nav-link'>About</Link>
            <Link to="/contactUs" className='nav-link'>ContactUs</Link>
            <Link to="/auth" className='nav-link'>Login</Link>
            <Button variant="outline-secondary" style={{marginLeft: '900px'}} onClick={() => authCxt.logout()}>Logout</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
