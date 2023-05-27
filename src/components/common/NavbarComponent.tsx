import { Navbar, Nav, Container, Stack } from 'react-bootstrap';
import MuhendislikLogo from '../../assets/muhendislik.svg';

const NavbarComponent = () => {
    return (
        <Navbar bg="dark" variant="dark" color='bg-primary' className='p-1'>
            <Container>
                <Stack direction='horizontal' gap={3}>
                    <div>
                        <Navbar.Brand href="/">
                            <img
                                alt="#"
                                src={MuhendislikLogo}
                                width="70"
                                className='p-2'
                            />{'EEM'}
                        </Navbar.Brand>
                    </div>
                    <div>
                        <Nav className='me-auto'>
                            <Nav.Link href='/'>Projeler</Nav.Link>
                            <Nav.Link href='/#/kullanicilar'>Kullanıcılar</Nav.Link>
                        </Nav>
                    </div>
                </Stack>
                <Stack direction='horizontal' gap={3}>
                    <>
                        <div className=''>
                            <Nav.Link style={{ color: "white" }}>Ali Bingül</Nav.Link>
                        </div>
                        <div className='vr' style={{ color: "white" }}></div>
                        <div>
                            <Nav.Link href="/admin/login" style={{ color: "white" }} onClick={() => console.log("logout")}>Çıkış Yap</Nav.Link>
                        </div>
                    </>
                </Stack>
            </Container>
        </Navbar >
    )
}

export default NavbarComponent;