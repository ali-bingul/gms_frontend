import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../../utils/AccessToken";
import { parseJwt } from "../../utils/ParseJWT";
import { Button, Card, Container, Spinner, Stack } from "react-bootstrap";
import { fetchAsyncLessonDatas } from "../../features/reducers/lessonSlice";
import { useEffect } from "react";
import '../../css/LessonList.css';

const HomeComponent = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigate = useNavigate();

    const token = getToken();
    const userPayload = parseJwt(token);

    const { loadingLessonDatas, lessonDatas } = useSelector((state: any) => state.lesson);

    const handleCardClick = (lesson: any) => {
        navigate(`/projeler/${lesson.lesson_name}/${lesson.id}`);
    };

    useEffect(() => {
        dispatch(fetchAsyncLessonDatas());
    }, []);

    return (
        <>
            {loadingLessonDatas ? (
                <div className='d-flex justify-content-center py-4'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <Stack direction="horizontal" gap={2}>
                        <div className='mx-2 my-2'>
                            {userPayload && (
                                <div>
                                    <Link to="/admin/dersler/yeni-kayit">
                                        <Button className='btn-success'>Yeni Ders Kaydı</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </Stack>
                    <Container>
                        <h1 className="lesson-list-title">Dersler</h1>
                        <div className="lesson-list">
                            {lessonDatas.data.map((lesson: any) => (
                                <Card key={lesson.id} className="lesson-card" onClick={() => handleCardClick(lesson)}>
                                    <Card.Body>
                                        <Card.Title>{lesson.lesson_name}</Card.Title>
                                        <Card.Text className="lesson-details">
                                            <strong>Ders Kodu:</strong> {lesson.lesson_code}
                                        </Card.Text>
                                        <Card.Text className="lesson-details">
                                            <strong>Dönem:</strong> {lesson.lesson_term}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Container>
                </>
            )
            }
        </>
    )
}

export default HomeComponent