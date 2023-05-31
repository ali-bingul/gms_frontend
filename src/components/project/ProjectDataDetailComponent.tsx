import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getToken } from "../../utils/AccessToken";
import { parseJwt } from "../../utils/ParseJWT";
import { useEffect } from "react";
import { fetchAsyncSingleProjectData } from "../../features/reducers/projectSlice";
import { Breadcrumb, Button, Col, Container, Form, InputGroup, Row, Spinner, Stack } from "react-bootstrap";
import '../../css/ProjectDetail.css';

const ProjectDataDetailComponent = () => {
    const { projectId } = useParams();

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigate = useNavigate();

    const token = getToken();
    const userPayload = parseJwt(token);

    const { singleProjectData, loadingSingleProjectData } = useSelector((state: any) => state.project);

    useEffect(() => {
        dispatch(fetchAsyncSingleProjectData({
            projectId: projectId
        }));
    }, [dispatch]);

    return (
        <>
            {loadingSingleProjectData ? (
                <div className='d-flex justify-content-center py-4'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <Breadcrumb className="m-4 position-absolute end-0">
                        <Breadcrumb.Item href="/">Ana Sayfa</Breadcrumb.Item>
                        <Breadcrumb.Item active>Projeler</Breadcrumb.Item>
                        <Breadcrumb.Item href={`/#/projeler/${singleProjectData.data.lesson_id && singleProjectData.data.lesson.lesson_name}/${singleProjectData.data.lesson_id}`}>{singleProjectData.data.lesson_id && singleProjectData.data.lesson.lesson_name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Container>
                        <h1 className="project_title">{singleProjectData.data.project_name}</h1>
                        <hr />
                        <Row>
                            <Col>
                                <strong>Ders:</strong>
                            </Col>
                            <Col>{singleProjectData.data.lesson_id && singleProjectData.data.lesson.lesson_name}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <strong>Takım Üyeleri:</strong>
                            </Col>
                            <Col>{singleProjectData.data.team_members}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <strong>Yıl:</strong>
                            </Col>
                            <Col>{singleProjectData.data.year}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <strong>Dönem:</strong>
                            </Col>
                            <Col>{singleProjectData.data.term}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <strong>Öğretim Elemanı:</strong>
                            </Col>
                            <Col>{singleProjectData.data.user_id && singleProjectData.data.user.name_surname}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <strong>Final Tezi:</strong>
                            </Col>
                            <Col><a href={`http://localhost:3030/uploads/${singleProjectData.data.final_paper_filename}`}>Final Tezi</a></Col>
                        </Row>
                        <Row>
                            <Col>
                                <strong>Sunum:</strong>
                            </Col>
                            <Col><a href={`http://localhost:3030/uploads/${singleProjectData.data.presentation_filename}`}>Sunum</a></Col>
                        </Row>
                        {singleProjectData.data.video && (
                            <Row>
                                <Col>
                                    <strong>Sunum:</strong>
                                </Col>
                                <Col><a href={`http://localhost:3030/uploads/${singleProjectData.data.video_filename}`}>Video</a></Col>
                            </Row>
                        )}
                    </Container>
                </>
            )}
        </>
    )
}

export default ProjectDataDetailComponent