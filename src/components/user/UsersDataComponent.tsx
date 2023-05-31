import { ThunkDispatch } from "@reduxjs/toolkit";
import { Breadcrumb, Spinner, Stack, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUsersDataWithProjectCount } from "../../features/reducers/userSlice";

const UsersDataComponent = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigate = useNavigate();

    const { usersDataWithProjectCount, loadingUsersDataWithProjectCount } = useSelector((state: any) => state.user);

    useEffect(() => {
        dispatch(getUsersDataWithProjectCount());
    }, [dispatch]);

    const handleRowClick = (userId: number) => {
        navigate(`/kullanicilar/${userId}`, { replace: false });
    }

    return (
        <>
            <Breadcrumb className="m-4 position-absolute end-0">
                <Breadcrumb.Item href="/">Ana Sayfa</Breadcrumb.Item>
                <Breadcrumb.Item active>Kullanıcılar</Breadcrumb.Item>
            </Breadcrumb>
            <Stack direction="horizontal" gap={2}>
                <div className='mx-2 my-3'>
                    <h4>Kullanıcılar (Öğretim Elemanları)</h4>
                </div>
            </Stack>
            {loadingUsersDataWithProjectCount ? (
                <div className='d-flex justify-content-center py-4'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <div className='m-3'>
                        <Table striped bordered hover size="sm" className=''>
                            <thead>
                                <tr>
                                    <th>Ad Soyad</th>
                                    <th>Kullanıcı Adı</th>
                                    <th>Email</th>
                                    <th>Bu Dönem Proje Sayısı</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersDataWithProjectCount.data.map((data: any) => {
                                    return (
                                        <tr onClick={() => handleRowClick(data.user.id)} key={data.user.id}>
                                            <td>{data.user.name_surname}</td>
                                            <td>{data.user.username}</td>
                                            <td>{data.user.email}</td>
                                            <td>{data.projectCount}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                </>
            )}
        </>
    )
}

export default UsersDataComponent