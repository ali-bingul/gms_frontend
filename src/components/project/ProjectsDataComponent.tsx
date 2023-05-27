import { ThunkDispatch } from "@reduxjs/toolkit";
import { FormEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { Breadcrumb, Button, Form, InputGroup, Spinner, Stack, Table } from "react-bootstrap";
import { fetchAsyncProjectsData } from "../../features/reducers/projectSlice";
import { getCurrentTerm } from "../../helpers/getCurrentTerm";
import { getCurrentYear } from "../../helpers/getCurrentYear";
import Select from 'react-select';
import { getTermOptions } from "../../helpers/getTermOptions";

const ProjectsDataComponent = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigate = useNavigate();

    const { register, control, setValue, handleSubmit, formState: { errors } } = useForm();

    const [term, setTerm] = useState(getCurrentTerm());
    const [year, setYear] = useState(getCurrentYear());
    const [where, setWhere] = useState("");
    const [limit] = useState(50);
    const [offset, setOffset] = useState(0);

    const { loadingProjectsData, projectsData } = useSelector((state: any) => state.project);

    const handlePageClick = (data: any) => {
        setOffset((limit * data.selected));
        dispatch(fetchAsyncProjectsData({
            where: where,
            limit: limit,
            offset: (limit * data.selected),
            year: year,
            term: term
        }));
    }

    useEffect(() => {
        dispatch(fetchAsyncProjectsData({
            where: where,
            limit: limit,
            offset: offset,
            year: year,
            term: term
        }));
    }, []);

    const submitHandler = (e: any) => {
        e.preventDefault();
    }

    const handleRowClick = (projectId: number) => {
        navigate(`/projeler/${projectId}`, { replace: false });
    }

    return (
        <>
            <Stack direction="horizontal" gap={2}>
                <div className='mx-2 my-3'>
                    <h4>Projeler</h4>
                    <div>
                        <Link to="/projeler/yeni-kayit">
                            <Button className='btn-success'>Yeni Proje Kaydı</Button>
                        </Link>
                    </div>
                </div>
                <div className='ms-auto'>
                    <p>Ara: </p>
                </div>
                <div className='m-2'>
                    <Form onSubmit={submitHandler}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Ara"
                                onChange={(e) => {
                                    setWhere(e.target.value);
                                }
                                }
                            />
                            <Button onClick={() => {
                                dispatch(fetchAsyncProjectsData({
                                    where: where,
                                    limit: limit,
                                    offset: offset,
                                    year: year,
                                    term: term
                                }));
                            }}>Ara</Button>
                        </InputGroup>
                    </Form>
                </div>
            </Stack>
            {(loadingProjectsData) ? (
                <div className='d-flex justify-content-center py-4'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <div className='d-flex justify-content-between'>
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
                                                    dispatch(fetchAsyncProjectsData({
                                                        where: where,
                                                        limit: limit,
                                                        offset: offset,
                                                        year: e.value,
                                                        term: term
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
                                                    dispatch(fetchAsyncProjectsData({
                                                        where: where,
                                                        limit: limit,
                                                        offset: offset,
                                                        year: year,
                                                        term: e.value
                                                    }));
                                                }}
                                            />}
                                        />
                                    </div>
                                </div>
                            </Form.Group>
                        </div>
                        <div className=''></div>
                        <div className='mx-2'>
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">Ana Sayfa</Breadcrumb.Item>
                                <Breadcrumb.Item active>Projeler</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div className='m-3'>
                        <Table striped bordered hover size="sm" className=''>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Proje Adı</th>
                                    <th>Yıl</th>
                                    <th>Dönem</th>
                                    <th>Öğretim Üyesi</th>
                                    <th>Takım Üyeleri</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectsData.data.map((data: any, index: number) => {
                                    return (
                                        <tr onClick={() => handleRowClick(data.id)} key={data.id}>
                                            <td>{index + 1 + offset}</td>
                                            <td>{data.project_name}</td>
                                            <td>{data.year}</td>
                                            <td>{data.term}</td>
                                            <td>{data.user_id && data.user.name_surname}</td>
                                            <td>{data.team_members}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                </>
            )}
            <ReactPaginate
                previousLabel={'önceki'}
                nextLabel={'sonraki'}
                breakLabel={'...'}
                pageCount={2}
                marginPagesDisplayed={4}
                pageRangeDisplayed={6}
                onPageChange={handlePageClick}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </>
    )
}

export default ProjectsDataComponent;