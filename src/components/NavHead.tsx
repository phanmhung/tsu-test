import { Container, Nav, Navbar } from 'react-bootstrap'

function NavHead() {
  return (
    <Navbar bg="dark" variant='dark' >
      <Container>
      <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="about" >About</Nav.Link>
            <Nav.Link href="contact">Contact</Nav.Link>
          </Nav>
        </Container>
    </Navbar>
  )
}

export default NavHead