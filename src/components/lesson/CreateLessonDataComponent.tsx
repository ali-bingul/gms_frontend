import { Breadcrumb, Button, Form } from "react-bootstrap"
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';
import { getTermOptions } from "../../helpers/getTermOptions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { createLessonData } from "../../features/reducers/lessonSlice";

const CreateLessonDataComponent = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigate = useNavigate();

    const { register, control, setValue, handleSubmit, formState: { errors } } = useForm();

    const submitForm = (data: any) => {
        data.lesson_term = data.lesson_term.value;
        dispatch(createLessonData({
            data: data
        })).then((response) => {
            if (response.meta.requestStatus === "fulfilled" && response.payload.success) {
                alert("Ders kaydı başarıyla oluşturuldu!");
                navigate(`/`);
            }
        });
    }

    return (
        <div>
            <div className='d-flex justify-content-between mx-2 my-3'>
                <div>
                    <h4>Yeni Ders Kaydı</h4>
                </div>
                <div></div>
                <div className='mx-2'>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Ana Sayfa</Breadcrumb.Item>
                        <Breadcrumb.Item active>Yeni Ders Kaydı</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            <div className="mx-2 w-50">
                <Form onSubmit={handleSubmit(submitForm)}>
                    <Form.Group className='mb-2'>
                        <div className='row d-flex align-items-center'>
                            <div className='col-4'>
                                <Form.Label><strong>Ders Adı*:</strong></Form.Label>
                            </div>
                            <div className='col-8'>
                                <Form.Control
                                    type="text"
                                    placeholder='Ders Adı'
                                    {...register("lesson_name", { required: true })}
                                    className={errors.lesson_name && "is-invalid"}
                                />
                                {errors.lesson_name && (
                                    <Form.Text className="text-muted">
                                        <span className='text-danger'>Bu alanın girilmesi zorunludur!</span>
                                    </Form.Text>
                                )}
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group className='mb-2'>
                        <div className='row d-flex align-items-center'>
                            <div className='col-4'>
                                <Form.Label><strong>Dersin Kodu*:</strong></Form.Label>
                            </div>
                            <div className='col-8'>
                                <Form.Control
                                    type="text"
                                    placeholder='Dersin Kodu'
                                    {...register("lesson_code", { required: true })}
                                    className={errors.lesson_code && "is-invalid"}
                                />
                                {errors.lesson_code && (
                                    <Form.Text className="text-muted">
                                        <span className='text-danger'>Bu alanın girilmesi zorunludur!</span>
                                    </Form.Text>
                                )}
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group className='mb-2'>
                        <div className='row d-flex align-items-center'>
                            <div className='col-4'>
                                <Form.Label><strong>Dönem*:</strong></Form.Label>
                            </div>
                            <div className='col-8'>
                                <Controller
                                    name='lesson_term'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <Select
                                        {...field}
                                        options={getTermOptions()}
                                        placeholder="Dönem"
                                        onChange={(e) => {
                                            setValue("lesson_term", e);
                                        }}
                                    />}
                                />
                                {errors.lesson_term && (
                                    <Form.Text className="text-muted">
                                        <span className='text-danger'>Bu alanın girilmesi zorunludur!</span>
                                    </Form.Text>
                                )}
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group className='mb-1 d-grid'>
                        <Button variant='success' type="submit" id='save_button'>
                            Kaydet
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default CreateLessonDataComponent