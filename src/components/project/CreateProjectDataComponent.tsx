import { ThunkDispatch } from "@reduxjs/toolkit";
import { Breadcrumb, Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/AccessToken";
import { parseJwt } from "../../utils/ParseJWT";
import { useEffect, useState } from "react";
import { createProjectData } from "../../features/reducers/projectSlice";
import { getCurrentYear } from "../../helpers/getCurrentYear";
import { getCurrentTerm } from "../../helpers/getCurrentTerm";
import { fetchAsyncLessonDatas } from "../../features/reducers/lessonSlice";
import Select from 'react-select';

const CreateProjectDataComponent = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigate = useNavigate();
    const { register, control, setValue, handleSubmit, formState: { errors } } = useForm();

    const [videoSizeExceed, setVideoSizeExceed] = useState(false);
    const [documentSizeExceed, setDocumentSizeExceed] = useState(false);
    const [fileTypeError, setFileTypeError] = useState(false);

    const { lessonDatas, loadingLessonDatas } = useSelector((state: any) => state.lesson);

    const token = getToken();
    const userPayload = parseJwt(token);

    const lessonOptions = !loadingLessonDatas && lessonDatas.data.map((lesson: any) => {
        return {
            label: lesson.lesson_name,
            value: lesson.id
        }
    });

    const submitForm = (data: any) => {
        if (videoSizeExceed || documentSizeExceed) {
            alert("Lütfen dosya boyutlarını kontrol ediniz!");
            return;
        }
        if (fileTypeError) {
            alert("Lütfen yüklediğiniz dosya tiplerini kontrol ediniz!");
            return;
        }
        data.lesson_id = data.lesson_id.value;
        const formData = new FormData();
        formData.append("project_name", data.project_name);
        formData.append("team_members", data.team_members);
        formData.append("year", getCurrentYear().toString());
        formData.append("term", getCurrentTerm());
        formData.append("user_id", userPayload.id);
        formData.append("lesson_id", data.lesson_id);
        formData.append("final_paper_filename", data.final_paper_filename[0]);
        formData.append("presentation_filename", data.presentation_filename[0]);
        formData.append("video_filename", data.video_filename[0]);
        dispatch(createProjectData({
            formData: formData
        })).then((response) => {
            if (response.meta.requestStatus === "fulfilled" && response.payload.success) {
                alert("Proje başarıyla kaydedildi!");
                navigate(`/`);
            }
        });
    }

    useEffect(() => {
        dispatch(fetchAsyncLessonDatas());
    }, [dispatch]);

    useEffect(() => {
        if (!userPayload) {
            navigate(`/`);
        }
    }, []);

    return (
        <div>
            <div className='d-flex justify-content-between mx-2 my-3'>
                <div>
                    <h4>Yeni Proje Kaydı</h4>
                </div>
                <div></div>
                <div className='mx-2'>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Ana Sayfa</Breadcrumb.Item>
                        <Breadcrumb.Item href="/">Projeler</Breadcrumb.Item>
                        <Breadcrumb.Item active>Yeni Proje Kaydı</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            <div className="mx-2">
                <Form onSubmit={handleSubmit(submitForm)} encType="multipart/form-data">
                    <div className="row">
                        <div className="col">
                            <Form.Group className='mb-2'>
                                <div className='row d-flex align-items-center'>
                                    <div className='col-4 p-0 ps-2'>
                                        <Form.Label><strong>Ders*:</strong></Form.Label>
                                    </div>
                                    <div className='col-8 p-0'>
                                        <Controller
                                            name='lesson_id'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => <Select
                                                {...field}
                                                options={lessonOptions}
                                                placeholder="Ders"
                                                onChange={(e) => {
                                                    setValue("lesson_id", e);
                                                }}
                                            />}
                                        />
                                        {errors.lesson_id && (
                                            <Form.Text className="text-muted">
                                                <span className='text-danger'>Bu alanın girilmesi zorunludur!</span>
                                            </Form.Text>
                                        )}
                                    </div>
                                </div>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <div className='row d-flex align-items-center'>
                                    <div className='col-4 p-0 ps-2'>
                                        <Form.Label><strong>Proje Adı*:</strong></Form.Label>
                                    </div>
                                    <div className='col-8 p-0'>
                                        <Form.Control
                                            type="text"
                                            placeholder='Proje Adı'
                                            {...register("project_name", { required: true })}
                                            className={errors.project_name && "is-invalid"}
                                        />
                                        {errors.project_name && (
                                            <Form.Text className="text-muted">
                                                <span className='text-danger'>Bu alanın girilmesi zorunludur!</span>
                                            </Form.Text>
                                        )}
                                    </div>
                                </div>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <div className='row d-flex align-items-center'>
                                    <div className='col-4 p-0 ps-2'>
                                        <Form.Label><strong>Proje Üyeleri*:</strong></Form.Label>
                                    </div>
                                    <div className='col-8 p-0'>
                                        <Form.Control
                                            type="text"
                                            placeholder='Proje Üyeleri'
                                            {...register("team_members", { required: true })}
                                            className={errors.team_members && "is-invalid"}
                                        />
                                        {errors.team_members && (
                                            <Form.Text className="text-muted">
                                                <span className='text-danger'>Bu alanın girilmesi zorunludur!</span>
                                            </Form.Text>
                                        )}
                                    </div>
                                </div>
                            </Form.Group>
                        </div>
                        <div className="col">
                            <Form.Group className="">
                                <div className='row d-flex align-items-center'>
                                    <div className='col-4 p-0 ps-2'>
                                        <Form.Label><strong>Final Tezi*:</strong></Form.Label>
                                    </div>
                                    <div className='col-8'>
                                        <Form.Control
                                            type="file"
                                            placeholder="Final Tezi"
                                            {...register("final_paper_filename", { required: true })}
                                            accept='.pdf'
                                            onInput={(e: any) => {
                                                if (e.target.files[0].type === "application/pdf") {
                                                    setFileTypeError(false);
                                                    if (e.target.files[0]) {
                                                        if (e.target.files[0].size > (1048576 * 5)) {
                                                            alert("Maksimum belge boyutu 5MB olmalıdır!");
                                                            setDocumentSizeExceed(true);
                                                        }
                                                    } else {
                                                        setDocumentSizeExceed(false);
                                                    }
                                                } else {
                                                    alert("Sadece .pdf formatında belge yüklenmelidir!");
                                                    setFileTypeError(true);
                                                }
                                            }}
                                        />
                                        <Form.Text className="text-muted">
                                            <span className='text-secondary'>Maksimum dosya boyutu: 5MB</span>
                                        </Form.Text>
                                    </div>
                                </div>
                            </Form.Group>
                            <Form.Group className="">
                                <div className='row d-flex align-items-center'>
                                    <div className='col-4 p-0 ps-2'>
                                        <Form.Label><strong>Sunum*:</strong></Form.Label>
                                    </div>
                                    <div className='col-8'>
                                        <Form.Control
                                            type="file"
                                            placeholder="Sunum"
                                            {...register("presentation_filename", { required: true })}
                                            accept='.pptx'
                                            onInput={(e: any) => {
                                                if (e.target.files[0].type === "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
                                                    setFileTypeError(false);
                                                    if (e.target.files[0]) {
                                                        if (e.target.files[0].size > (1048576 * 5)) {
                                                            alert("Maksimum belge boyutu 5MB olmalıdır!");
                                                            setDocumentSizeExceed(true);
                                                        }
                                                    } else {
                                                        setDocumentSizeExceed(false);
                                                    }
                                                } else {
                                                    alert("Sadece .pptx formatında belge yüklenmelidir!");
                                                    setFileTypeError(true);
                                                }
                                            }}
                                        />
                                        <Form.Text className="text-muted">
                                            <span className='text-secondary'>Maksimum dosya boyutu: 5MB</span>
                                        </Form.Text>
                                    </div>
                                </div>
                            </Form.Group>
                            <Form.Group className="">
                                <div className='row d-flex align-items-center'>
                                    <div className='col-4 p-0 ps-2'>
                                        <Form.Label><strong>Video:</strong></Form.Label>
                                    </div>
                                    <div className='col-8'>
                                        <Form.Control
                                            type="file"
                                            {...register("video_filename")}
                                            accept='.mp4,.mov,.avi,.mkv,.wmv'
                                            onInput={(e: any) => {
                                                if (e.target.files[0]) {
                                                    if (e.target.files[0].size > (1048576 * 15)) {
                                                        alert("Maksimum video boyutu 15MB olmalıdır!");
                                                        setVideoSizeExceed(true);
                                                    }
                                                } else {
                                                    setVideoSizeExceed(false);
                                                }
                                            }}
                                        />
                                        <Form.Text className="text-muted">
                                            <span className='text-secondary'>Maksimum dosya boyutu: 15MB</span>
                                        </Form.Text>
                                    </div>
                                </div>
                            </Form.Group>
                        </div>
                        <div className="col">
                            <Form.Group className='mb-1 d-grid'>
                                <Button variant='success' type="submit" id='save_button'>
                                    Kaydet
                                </Button>
                            </Form.Group>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default CreateProjectDataComponent;