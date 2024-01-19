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
          <Navbar.Brand>Expense Tracker</Navbar.Brand>
          <Nav className="me-auto">
            {authCxt.isLoggedIn && <Link to="/" className='nav-link'>Home</Link>}
            {authCxt.isLoggedIn && <Link to="/about" className='nav-link'>About</Link>}
            {authCxt.isLoggedIn && <Link to="/contactUs" className='nav-link'>ContactUs</Link>}
            {authCxt.isLoggedIn && <Link to="/trackExpense" className='nav-link'>Track</Link>}
            {!authCxt.isLoggedIn && <Link to="/auth" className='nav-link'>Login</Link>}
            {authCxt.isLoggedIn && <Button variant="outline-secondary" style={{marginLeft: '800px'}} onClick={() => authCxt.logout()}>Logout</Button>}
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
