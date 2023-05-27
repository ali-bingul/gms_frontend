import { Navbar, Nav, Container, Stack } from 'react-bootstrap';
import MuhendislikLogo from '../../assets/muhendislik.svg';
import { getToken } from '../../utils/AccessToken';
import { parseJwt } from '../../utils/ParseJWT';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { logout } from '../../features/reducers/authSlice';

const NavbarComponent = () => {
    const token = getToken();
    const userPayload = parseJwt(token);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

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
                            />{'Elektrik Elektronik Mühendisliği'}
                        </Navbar.Brand>
                    </div>
                    <div>
                        <Nav className='me-auto'>
                            <Nav.Link href='/#/kullanicilar'>Kullanıcılar</Nav.Link>
                        </Nav>
                    </div>
                </Stack>
                {userPayload && (
                    <Stack direction='horizontal' gap={3}>
                        <>
                            <div className=''>
                                <Nav.Link style={{ color: "white" }}>{userPayload.username}</Nav.Link>
                            </div>
                            <div className='vr' style={{ color: "white" }}></div>
                            <div>
                                <Nav.Link href="/" style={{ color: "white" }} onClick={() => dispatch(logout())}>Çıkış Yap</Nav.Link>
                            </div>
                        </>
                    </Stack>
                )}
            </Container>
        </Navbar >
    )
}

export default NavbarComponent;