import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAsyncProjectsDataWithUserId } from "../../features/reducers/projectSlice";
import { getCurrentYear } from "../../helpers/getCurrentYear";
import { getCurrentTerm } from "../../helpers/getCurrentTerm";
import { Breadcrumb, Card, Col, Container, Form, Row, Spinner, Stack } from "react-bootstrap";
import { fetchAsyncSingleUserData } from "../../features/reducers/userSlice";
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';
import { getTermOptions } from "../../helpers/getTermOptions";

const UserDataDetailComponent = () => {
    const { userId } = useParams();

    const { control, setValue } = useForm();

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const [year, setYear] = useState(getCurrentYear());
    const [term, setTerm] = useState(getCurrentTerm());

    const { projectsDataWithUserId, loadingProjectsDataWithUserId } = useSelector((state: any) => state.project);
    const { singleUserData, loadingSingleUserData } = useSelector((state: any) => state.user);

    useEffect(() => {
        dispatch(fetchAsyncProjectsDataWithUserId({
            userId: userId,
            term: term,
            year: year
        }));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAsyncSingleUserData({
            userId: userId
        }));
    }, [dispatch]);

    return (
        (loadingSingleUserData) ? (
            <div className='d-flex justify-content-center py-4'>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        ) : (
            <>
                <Breadcrumb className="m-4 position-absolute end-0">
                    <Breadcrumb.Item href="/">Ana Sayfa</Breadcrumb.Item>
                    <Breadcrumb.Item href="/#/kullanicilar">Kullanıcılar</Breadcrumb.Item>
                    <Breadcrumb.Item active>{singleUserData.data.name_surname}</Breadcrumb.Item>
                </Breadcrumb>
                <Stack direction="horizontal" gap={2}>
                    <div className='mx-2 my-3'>
                        <h4>Kullanıcı Ayrıntısı</h4>
                    </div>
                </Stack>
                <div>
                    <Form.Group className='mb-2'>
                        <div className='col d-flex align-items-center mx-2'>
                            <div className='row'>
                                <Controller
                                    name='year'
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={{
                                        label: getCurrentYear().toString(), value: getCurrentYear()
                                    }}
                                    render={({ field }) => <Select
                                        {...field}
                                        options={[
                                            { label: "2019", value: 2019 },
                                            { label: "2020", value: 2020 },
                                            { label: "2021", value: 2021 },
                                            { label: "2022", value: 2022 },
                                            { label: "2023", value: 2023 },
                                        ]}
                                        placeholder="Yıl"
                                        onChange={(e) => {
                                            setValue("year", e);
                                            setYear(e.value);
                                            dispatch(fetchAsyncProjectsDataWithUserId({
                                                userId: userId,
                                                term: term,
                                                year: e.value
                                            }));
                                        }}
                                    />}
                                />
                            </div>
                            <div className="mx-2"></div>
                            <div className='row'>
                                <Controller
                                    name='term'
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={{
                                        label: getCurrentTerm(), value: getCurrentTerm()
                                    }}
                                    render={({ field }) => <Select
                                        {...field}
                                        options={getTermOptions()}
                                        placeholder="Dönem"
                                        onChange={(e) => {
                                            setValue("term", e);
                                            setTerm(e.value);
                                            dispatch(fetchAsyncProjectsDataWithUserId({
                                                userId: userId,
                                                term: e.value,
                                                year: year
                                            }));
                                        }}
                                    />}
                                />
                            </div>
                        </div>
                    </Form.Group>
                </div>
                <Container>
                    <Row>
                        <Col>
                            <h2>{singleUserData.data.name_surname}</h2>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{singleUserData.data.username}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{singleUserData.data.email}</Card.Subtitle>
                                    <Card.Text>Projeler ({year}, {term}):</Card.Text>
                                    {loadingProjectsDataWithUserId ? (
                                        <div className='d-flex justify-content-center py-4'>
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        </div>
                                    ) : (
                                        <ul>
                                            {projectsDataWithUserId.data.map((project: any) => (
                                                <li key={project.id}><a href={`/#/proje-detay/${project.id}`} target="_blank">{project.project_name}</a></li>
                                            ))}
                                        </ul>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    )
}

export default UserDataDetailComponent