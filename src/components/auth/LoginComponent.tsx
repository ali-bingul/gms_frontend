import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import MuhendislikLogo from '../../assets/muhendislik.svg';
import { loginUserAsync } from "../../features/reducers/authSlice";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigate = useNavigate();

    const submitForm = (data: any) => {
        console.log(data.username);
        dispatch(loginUserAsync({
            data: data
        })).then((response) => {
            console.log(response.meta.requestStatus);
            if(response.meta.requestStatus === "fulfilled" && response.payload.success) {
                alert("Giriş başarılı!");
                navigate(`/`);
            } else {
                alert("Bir hata oluştu!");
            }
        });
    };

    return (
        <Container>
            <Row className='mt-5'>
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <Form.Group className="d-grid justify-content-center">
                        <img
                            src={MuhendislikLogo}
                            alt="Renault Group"
                            height="50"
                            className='mb-4'
                        />
                    </Form.Group>
                    <h2 className='shadow-sm text-color: #F5B42C mb-4 p-2 text-center rounded'>Giriş Yap</h2>
                    {/* {error && (
                        <div class="alert alert-danger" role="alert">
                            Telefon no ve/veya şifre yanlış!
                        </div>
                    )} */}
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Kullanıcı Adı*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Kullanıcı Adı"
                                className={errors.username && "is-invalid"}
                                {...register("username", { required: true })}
                            />
                            {errors.username && (
                                <Form.Text className="text-muted">
                                    <span className='text-danger'>Kullanıcı adının girilmesi zorunludur!</span>
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Şifre*</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Şifre"
                                className={errors.password && "is-invalid"}
                                {...register("password", { required: true })}
                            />
                            {errors.password && (
                                <Form.Text className="text-muted">
                                    <span className='text-danger'>Şifrenin girilmesi zorunludur.</span>
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group className="d-grid gap-2 mb-2">
                            <Button className="btn-success" type="submit" color='#F5B42C'>
                                Giriş Yap
                            </Button>
                        </Form.Group>
                        <Form.Text className="text-muted">
                            Eğer üye değilseniz, üye olmak için yetkilinize başvurunuz.
                        </Form.Text>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginComponent;